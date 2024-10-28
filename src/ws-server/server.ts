import { WebSocketServer } from "ws";
import { messageHandler } from "../controller/messageHandler";

import { Database } from "../utils/constants";

const WS_PORT = 3000;
const base: Database = {
  players: [],
  rooms: [],
  winners: [],
  connections: [],
};

export const wsServer = new WebSocketServer({ port: WS_PORT });
console.log(`Start websocket server on the ${WS_PORT} port!`);

wsServer.on("connection", (ws: any) => {
  ws.connectionId = crypto.randomUUID();
  console.log(`Connected ${ws.connectionId}`);

  ws.on("message", (message: string) => {
    messageHandler(message, ws, base);
  });
});
