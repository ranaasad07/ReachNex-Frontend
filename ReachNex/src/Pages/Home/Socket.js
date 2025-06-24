// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:5173"); // change if hosted

export default socket;
