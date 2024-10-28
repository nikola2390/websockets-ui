import { CustomWebSocket, Database, MessageType } from "./constants";
import { addToRoom } from "./room";

export const createGame = (
  indexRoom: string | number,
  base: Database,
  ws: CustomWebSocket
) => {
  addToRoom(indexRoom, base, ws);

  const idGame = crypto.randomUUID();
  const players = base.rooms.find(
    (room) => room.roomId === indexRoom
  )!.roomUsers;

  for (const player of players) {
    const message = {
      type: MessageType.Create_Game,
      data: {
        idGame: idGame,
        idPlayer: player.index,
      },
      id: 0,
    };
    const { wsConnection } = base.connections.find(
      (connection) => connection.playerIndex === player.index
    )!;
    wsConnection.send(
      JSON.stringify({
        type: message.type,
        data: JSON.stringify(message.data),
        id: message.id,
      })
    );

    console.log(message.type, message);
  }

  base.rooms = base.rooms.filter((room) => room.roomId !== indexRoom);
};
