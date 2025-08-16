import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Socket connected");
  socket.emit("clientConnected"); // Let server know client is ready
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});

socket.on("connectionAccepted", (data) => {
  console.log("Connection accepted:", data);
});

socket.on("connectionRequested", (data) => {
  console.log("Connection requested:", data);
});

export default socket;
