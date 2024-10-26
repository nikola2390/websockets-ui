import { WebSocketServer } from "ws";

const WS_PORT = 3000;

export const wsServer = new WebSocketServer({ port: WS_PORT });
console.log(`Start websocket server on the ${WS_PORT} port!`);

wsServer.on("connection", (ws: WebSocketServer) => {
  ws.on("message", (message) => {
    console.log(JSON.parse(message));
    console.log(JSON.parse(JSON.parse(message).data));
  });
});
