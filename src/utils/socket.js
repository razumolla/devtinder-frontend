import { io } from "socket.io-client";
import { BASE_URL } from "./constant";

export const CreateSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL)
  }
  return io("/", { path: "/api/socket.io" });
}