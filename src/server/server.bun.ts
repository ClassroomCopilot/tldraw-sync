// External imports
import { TLSocketRoom, RoomStoreMethods } from '@tldraw/sync-core'
import { IRequest, Router, RouterType, cors, json } from 'itty-router'
import { Readable } from 'stream'
import { 
  DEFAULT_EMBED_DEFINITIONS,
  createTLStore,
  TLStore,
  TLStoreOptions,
} from 'tldraw'
// Internal imports
import { loadAsset, storeAsset } from './assets'
import { makeOrLoadRoom } from './rooms'
import { unfurl } from './unfurl'
import { server_schema_default, server_schema_custom } from './schema'

const PORT = process.env.VITE_TLDRAW_PORT

const { corsify, preflight } = cors({ origin: '*' })

const router: RouterType<IRequest, any, any> = Router()
  .all('*', preflight)

const includeProxyRoute = "/tldraw"

router
  .get(`${includeProxyRoute}/connect/:roomId`, async (req) => {
    const roomId = req.params.roomId
    const sessionId = req.query.sessionId
    console.log(`Connecting to room: ${roomId}, session: ${sessionId}`)
    server.upgrade(req, { data: { roomId, sessionId } })
    return new Response(null, { status: 101 })
  })

  .put(`${includeProxyRoute}/uploads/:id`, async (req) => {
    const id = req.params.id;
    console.log(`Received upload request for ID: ${id}`);

    try {
      const buffer = await req.arrayBuffer(); // Directly convert the incoming request body to an ArrayBuffer
      const stream = Readable.from(Buffer.from(buffer)); // Convert ArrayBuffer to Node.js Readable Stream

      await storeAsset(id, stream);
      const response = new Response(JSON.stringify({ ok: true }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        status: 200
      }); // TODO: Unsafe, change
      console.log(`Upload successful for ID: ${id}`);
      return response;
    } catch (error) {
      console.error(`Error storing asset with ID: ${id}`, error);
      return new Response('Internal Server Error', { status: 500 });
    }
  })

  .get(`${includeProxyRoute}/uploads/:id`, async (req) => {
    const id = (req.params as any).id as string
    console.log(`Received request to load asset with ID: ${id}`)
    try {
      const asset = await loadAsset(id)
      const response = new Response(asset)
      response.headers.set('Access-Control-Allow-Origin', '*') // TODO: Unsafe, change
      console.log(`Asset loaded successfully for ID: ${id}`)
      return response
    } catch (error) {
      console.error(`Error loading asset with ID: ${id}`, error)
      return new Response('Internal Server Error', { status: 500 })
    }
  })

  .get(`${includeProxyRoute}/unfurl`, async (req) => {
    const url = (req.query as any).url as string
    console.log(`Received unfurl request for URL: ${url}`)
    try {
      const data = await unfurl(url)
      const response = json(data)
      response.headers.set('Access-Control-Allow-Origin', '*') // TODO: Unsafe, change
      console.log(`Unfurling successful for URL: ${url}`)
      return response
    } catch (error) {
      console.error(`Error unfurling URL: ${url}`, error)
      return new Response('Internal Server Error', { status: 500 })
    }
  })

  .all('*', (req) => {
    console.log(`Received request for unknown route: ${req.url}`);
    const response = new Response('Not found', { status: 404 });
    response.headers.set('Access-Control-Allow-Origin', '*'); // TODO: Unsafe, change
    return response;
  })

const store = createTLStore({
  schema: server_schema_custom,
})

const server = Bun.serve<{ room?: TLSocketRoom<any, void>; sessionId: string; roomId: string }>({
  port: PORT,
  fetch(req) {
    try {
      console.log('Received request: ', req.url)
      return router.fetch(req).then(corsify)
    } catch (e) {
      console.error('Error handling request: ', e)
      return new Response('Something went wrong', {
        status: 500,
      })
    }
  },
  websocket: {
    async open(socket) {
      console.log(`WebSocket connection attempt for room: ${socket.data.roomId}, session: ${socket.data.sessionId}`);
      try {
        const { sessionId, roomId } = socket.data;
        if (!sessionId || !roomId) {
          console.error('Missing sessionId or roomId in WebSocket connection data');
          socket.close(4000, 'Missing data');
          return;
        }
        console.log(`WebSocket opened for room: ${roomId}, session: ${sessionId}`);
        const room = await makeOrLoadRoom(roomId, server_schema_custom);
        room.handleSocketConnect({ sessionId, socket });
        socket.data.room = room;
      } catch (error) {
        console.error('Error during WebSocket open:', error);
        socket.close(1011, 'Internal error');
      }
    },
    async message(ws, message) {
      console.log(`WebSocket message for session: ${ws.data.sessionId}`, message)
      ws.data.room?.handleSocketMessage(ws.data.sessionId, message)
    },
    drain(ws) {
      console.log(`WebSocket drain for session: ${ws.data.sessionId}`)
      ws.close()
    },
    close(ws) {
      console.log(`WebSocket closed for session: ${ws.data.sessionId}`)
      ws.data.room?.handleSocketClose(ws.data.sessionId)
    },
  },
})

console.log(`Listening for connections on URL: ${server.url}`)
