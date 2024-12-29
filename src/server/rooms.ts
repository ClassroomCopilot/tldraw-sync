import { RoomSnapshot, TLSocketRoom } from '@tldraw/sync-core'
import { TLStoreSchema } from '@tldraw/tlschema'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { TLSchema, TLStore, TLStoreOptions } from 'tldraw'
import { logger } from './../logger'

// For this example we're just saving data to the local filesystem
const DIR = './.rooms'
async function readSnapshotIfExists(roomId: string) {
	try {
		const data = await readFile(join(DIR, roomId))
		const snapshot = JSON.parse(data.toString()) ?? undefined;
		logger.info(`📥 Loaded snapshot for room: ${roomId}`);
		return snapshot;
	} catch (e) {
		logger.warn(`⚠️ No existing snapshot found for room: ${roomId}`);
		return undefined;
	}
}

async function saveSnapshot(roomId: string, snapshot: RoomSnapshot) {
	try {
		await mkdir(DIR, { recursive: true });
		await writeFile(join(DIR, roomId), JSON.stringify(snapshot));
		logger.info(`💾 Saved snapshot for room: ${roomId}`);
	} catch (error) {
		logger.error(`❌ Failed to save snapshot for room: ${roomId}`);
	}
}

// We'll keep an in-memory map of rooms and their data
interface RoomState {
	room: TLSocketRoom<any, void>
	id: string
	needsPersist: boolean
	lastActivity: number
	connectedSessions: Set<string>
}

const rooms = new Map<string, RoomState>()

// Very simple mutex using promise chaining, to avoid race conditions
// when loading rooms. In production you probably want one mutex per room
// to avoid unnecessary blocking!
let mutex = Promise.resolve<null | Error>(null)

export async function makeOrLoadRoom(
	roomId: string,
	schema: TLSchema,
	options?: Partial<TLStoreOptions>
): Promise<TLSocketRoom<any, void>> {
	mutex = mutex
		.then(async () => {
			if (rooms.has(roomId)) {
				const roomState = await rooms.get(roomId)!
				if (!roomState.room.isClosed()) {
					logger.info(`🔄 Using existing room: ${roomId}`);
					return null // all good
				}
			}
			logger.info(`🔄 Loading room: ${roomId}`);
			const initialSnapshot = await readSnapshotIfExists(roomId)

			const roomState: RoomState = {
				needsPersist: false,
				id: roomId,
				lastActivity: Date.now(),
				connectedSessions: new Set(),
				room: new TLSocketRoom({
					initialSnapshot,
					schema: schema,
					onSessionRemoved(room, args) {
						logger.info(`👋 Client disconnected from room: ${roomId}`);
						roomState.connectedSessions.delete(args.sessionId);
						roomState.lastActivity = Date.now();
						if (args.numSessionsRemaining === 0) {
							logger.info(`🔒 Closing empty room: ${roomId}`);
							room.close();
						}
					},
					onDataChange() {
						roomState.needsPersist = true;
						roomState.lastActivity = Date.now();
					}
				}),
			}
			rooms.set(roomId, roomState)
			return null // all good
		})
		.catch((error) => {
			logger.error(`❌ Error making/loading room: ${roomId}`);
			// return errors as normal values to avoid stopping the mutex chain
			return error
		})

	const err = await mutex
	if (err) throw err
	return rooms.get(roomId)!.room
}

// Do persistence on a regular interval.
// In production you probably want a smarter system with throttling.
setInterval(() => {
	const now = Date.now();
	for (const roomState of rooms.values()) {
		if (roomState.needsPersist) {
			// persist room
			roomState.needsPersist = false;
			logger.info(`💾 Saving snapshot for room: ${roomState.id}`);
			saveSnapshot(roomState.id, roomState.room.getCurrentSnapshot());
		}
		if (roomState.room.isClosed()) {
			logger.info(`🗑️ Deleting closed room: ${roomState.id}`);
			rooms.delete(roomState.id);
		} else if (now - roomState.lastActivity > 30 * 60 * 1000) { // 30 minutes inactivity
			logger.info(`⏰ Closing inactive room: ${roomState.id}`);
			roomState.room.close();
		}
	}
}, 2000)
