import { login } from "../utils/login";
import { MessageType, Database } from "../utils/constants";
import { WebSocketServer } from "ws";

export const messageHandler = (
  message: string,
  ws: WebSocketServer,
  base: Database
) => {
  const { type, data } = JSON.parse(message);
  switch (type) {
    case MessageType.Registration:
      const playerData = JSON.parse(data);

      console.log(type, playerData);
      login(ws, playerData, base);
      break;

    default:
      break;
  }
};
