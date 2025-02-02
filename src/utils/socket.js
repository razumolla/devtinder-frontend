import { io } from "socket.io-client";
import { BASE_URL } from "./constant";

export const CreateSocketConnection = () => {
  return io(BASE_URL);
}