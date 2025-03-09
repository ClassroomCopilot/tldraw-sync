// External imports
import { TLSocketRoom } from '@tldraw/sync-core'
import { IRequest, Router, RouterType, cors, json } from 'itty-router'
import { Readable } from 'stream'
import { 
  createTLStore,
} from 'tldraw'
// Internal imports
import { loadAsset, storeAsset } from './assets'
import { makeOrLoadRoom } from './rooms'
import { unfurl } from './unfurl'
import { server_schema_default } from './schema'
import { logger } from './../logger'

// Add debug logging for environment variables
logger.info('Environment variables:', {
  PORT: process.env.PORT,
  PORT_TLDRAW_SYNC: process.env.PORT_TLDRAW_SYNC,
  NODE_ENV: process.env.NODE_ENV
});

// Be explicit about port precedence
const PORT = process.env.PORT_TLDRAW_SYNC || 5002

// Log the port being used
logger.info(`Using port: ${PORT}`)

const { corsify, preflight } = cors({ origin: '*' })

const router: RouterType<IRequest, any, any> = Router()
  .all('*', preflight)

  .get(`/connect/:roomId`, async (req) => {
    const {roomId} = req.params
    const {sessionId} = req.query
    logger.info(`Connecting to room: ${roomId}, session: ${sessionId}`)
    server.upgrade(req, { data: { roomId, sessionId } })
    return new Response(null, { status: 101 })
  })

  .put(`/uploads/:id`, async (req) => {
    const {id} = req.params;
    logger.info(`Received upload request for ID: ${id}`);

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
      logger.info(`Upload successful for ID: ${id}`);
      return response;
    } catch (error) {
      logger.error(`Error storing asset with ID: ${id}`, error);
      return new Response('Internal Server Error', { status: 500 });
    }
  })

  .get(`/uploads/:id`, async (req) => {
    const id = (req.params as any).id as string
    logger.info(`Received request to load asset with ID: ${id}`)
    try {
      const asset = await loadAsset(id)
      const response = new Response(asset)
      response.headers.set('Access-Control-Allow-Origin', '*') // TODO: Unsafe, change
      logger.info(`Asset loaded successfully for ID: ${id}`)
      return response
    } catch (error) {
      logger.error(`Error loading asset with ID: ${id}`, error)
      return new Response('Internal Server Error', { status: 500 })
    }
  })

  .get(`/unfurl`, async (req) => {
    const url = (req.query as any).url as string
    logger.info(`Received unfurl request for URL: ${url}`)
    try {
      const data = await unfurl(url)
      const response = json(data)
      response.headers.set('Access-Control-Allow-Origin', '*') // TODO: Unsafe, change
      logger.info(`Unfurling successful for URL: ${url}`)
      return response
    } catch (error) {
      logger.error(`Error unfurling URL: ${url}`, error)
      return new Response('Internal Server Error', { status: 500 })
    }
  })

  .all('*', (req) => {
    logger.info(`Received request for unknown route: ${req.url}`);
    const response = new Response('Not found', { status: 404 });
    response.headers.set('Access-Control-Allow-Origin', '*'); // TODO: Unsafe, change
    return response;
  })

const server = Bun.serve<{ room?: TLSocketRoom<any, void>; sessionId: string; roomId: string }>({
  port: parseInt(PORT as string),  // Ensure it's parsed as a number
  fetch(req) {
    try {
      logger.info(`Server started on port: ${PORT}`)  // Add explicit port logging
      logger.info('Received request: ', req.url)
      return router.fetch(req).then(corsify)
    } catch (e) {
      logger.error('Error handling request: ', e)
      return new Response('Something went wrong', {
        status: 500,
      })
    }
  },
  websocket: {
    async open(socket) {
      logger.debug(`WebSocket connection attempt for room: ${socket.data.roomId}`, {
        sessionId: socket.data.sessionId
      });
      try {
        const { sessionId, roomId } = socket.data;
        if (!sessionId || !roomId) {
          logger.error('Missing sessionId or roomId in WebSocket connection data', {
            sessionId,
            roomId
          });
          socket.close(4000, 'Missing data');
          return;
        }
        logger.info(`WebSocket opened for room: ${roomId}, session: ${sessionId}`);
        const room = await makeOrLoadRoom(roomId, server_schema_default);
        if (!room) {
          logger.error('Failed to create or load room', {
            roomId,
            sessionId
          });
          socket.close(4001, 'Failed to load room');
          return;
        }
        room.handleSocketConnect({ sessionId, socket });
        socket.data.room = room;
        logger.info(`Successfully connected to room: ${roomId}`, {
          sessionId,
          roomId
        });
      } catch (error) {
        logger.error('Error during WebSocket open:', error);
        socket.close(1011, 'Internal error');
      }
    },
    async message(ws, message) {
      try {
        logger.debug(`WebSocket message for session: ${ws.data.sessionId}`, {
          message,
          roomId: ws.data.roomId
        });
        if (!ws.data.room) {
          logger.error('No room found for WebSocket message', {
            sessionId: ws.data.sessionId,
            roomId: ws.data.roomId
          });
          ws.close(4002, 'No room found');
          return;
        }
        ws.data.room.handleSocketMessage(ws.data.sessionId, message);
      } catch (error) {
        logger.error('Error handling WebSocket message:', error);
        ws.close(1011, 'Message handling error');
      }
    },
    drain(ws) {
      logger.info(`WebSocket drain for session: ${ws.data.sessionId}`, {
        roomId: ws.data.roomId
      });
      ws.close();
    },
    close(ws) {
      logger.info(`WebSocket closed for session: ${ws.data.sessionId}`, {
        roomId: ws.data.roomId
      });
      if (ws.data.room) {
        ws.data.room.handleSocketClose(ws.data.sessionId);
      }
    },
  },
})

// Add explicit logging of the server configuration
logger.info('Server configuration:', {
  port: server.port,
  hostname: server.hostname
})

logger.info(`Listening for connections on URL: ${server.url}`)

logger.info(`Listening on localhost:${PORT}`)

logger.info(`Server: ${server}`)