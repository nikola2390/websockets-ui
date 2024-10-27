import { WebSocketServer } from "ws";
import { MessageType, Player, PlayerData, Room, Winner } from "./constants";

export const sendReg = (ws: any, player: Player) => {
  const message = {
    type: MessageType.Registration,
    data: {
      name: player.name,
      index: player.index,
      error: false,
      errorText: "",
    },
    id: 0,
  };
  ws.send(
    JSON.stringify({
      type: message.type,
      data: JSON.stringify(message.data),
      id: message.id,
    })
  );

  console.log(message.type, message.data);
};

export const sendWrongPassword = (ws: any, player: PlayerData) => {
  const message = {
    type: MessageType.Registration,
    data: {
      name: player.name,
      index: undefined,
      error: true,
      errorText: "Wrong password",
    },
    id: 0,
  };
  ws.send(
    JSON.stringify({
      type: message.type,
      data: JSON.stringify(message.data),
      id: message.id,
    })
  );

  console.log(message.type, message.data);
};

export const sendUpdateRoom = (ws: any, roomsBase: Room[]) => {
  const message = {
    type: MessageType.Update_Room,
    data: roomsBase,
    id: 0,
  };
  ws.send(
    JSON.stringify({
      type: message.type,
      data: JSON.stringify(message.data),
      id: message.id,
    })
  );

  console.log(message.type, message);
};

export const sendUpdateWinners = (ws: any, winnersBase: Winner[]) => {
  const message = {
    type: MessageType.Update_Winners,
    data: winnersBase,
    id: 0,
  };
  ws.send(
    JSON.stringify({
      type: message.type,
      data: JSON.stringify(message.data),
      id: message.id,
    })
  );

  console.log(message.type, message);
};
