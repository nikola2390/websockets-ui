import {
  Connection,
  CustomWebSocket,
  MessageType,
  Player,
  PlayerData,
  Room,
  Winner,
} from "./constants";

export const sendReg = (ws: CustomWebSocket, player: Player) => {
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

export const sendWrongPassword = (ws: CustomWebSocket, player: PlayerData) => {
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

export const sendUpdateRoom = (ws: CustomWebSocket, roomsBase: Room[]) => {
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

export const sendUpdateWinners = (
  ws: CustomWebSocket,
  winnersBase: Winner[]
) => {
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

export const sendUpdateRoomToAll = (
  wsConnections: Connection[],
  roomsBase: Room[]
) => {
  wsConnections.forEach(({ wsConnection }) => {
    sendUpdateRoom(wsConnection, roomsBase);
  });
};

export const sendPlayerOnline = (ws: CustomWebSocket, player: PlayerData) => {
  const message = {
    type: MessageType.Registration,
    data: {
      name: player.name,
      index: undefined,
      error: true,
      errorText: "Player is online",
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
