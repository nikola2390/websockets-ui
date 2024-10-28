import { CustomWebSocket, Database, Room } from "./constants";

export const createRoom = (ws: CustomWebSocket, base: Database) => {
  const userConnection = base.connections.find(
    (connection) => connection.connectionId === ws.connectionId
  );
  const userIndex = userConnection!.playerIndex;
  const user = base.players.find((player) => player.index === userIndex);
  const newRoom: Room = {
    roomId: crypto.randomUUID(),
    roomUsers: [user!],
  };

  base.rooms.push(newRoom);
};
