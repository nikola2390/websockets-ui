import { WebSocketServer } from "ws";
import { messageHandler } from "../controller/messageHandler";

import { Database, CustomWebSocket } from "../utils/constants";
import { httpServer } from "../http_server";

const WS_PORT = 3000;
const base: Database = {
  players: [],
  rooms: [],
  winners: [],
  connections: [],
  games: [],
};

export const wsServer = new WebSocketServer({ port: WS_PORT });
console.log(`Start websocket server on the ${WS_PORT} port!`);

wsServer.on("connection", (ws: CustomWebSocket) => {
  ws.connectionId = crypto.randomUUID();
  console.log(`Connected ${ws.connectionId}`);

  ws.on("message", (message: string) => {
    messageHandler(message, ws, base);
  });

  ws.on("error", console.error);

  ws.on("close", () => {
    base.connections = base.connections.filter(
      (connection) => connection.connectionId === ws.connectionId
    );
    console.log(`Disconnected ${ws.connectionId}`);
  });
});

process.on("SIGINT", () => {
  wsServer.close();
  httpServer.close();
});

wsServer.on("close", () => {
  console.log("WebSocketServer closed");
});
