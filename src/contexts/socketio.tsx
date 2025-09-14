"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { generateRandomCursor } from "../lib/generate-random-cursor"

export type User = {
  socketId: string;
  name: string;
  color: string;
  pos: {
    x: number;
    y: number;
  };
  location: string;
  flag: string;
};
export type Message = {
  socketId: string;
  content: string;
  time: Date;
  username: string;
};

export type UserMap = Map<string, User>;

type SocketContextType = {
  socket: Socket | null;
  users: UserMap;
  setUsers: Dispatch<SetStateAction<UserMap>>;
  msgs: Message[];
};

const INITIAL_STATE: SocketContextType = {
  socket: null,
  users: new Map(),
  setUsers: () => {},
  msgs: [],
};

export const SocketContext = createContext<SocketContextType>(INITIAL_STATE);

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [users, setUsers] = useState<UserMap>(new Map());
  const [msgs, setMsgs] = useState<Message[]>([]);

  // SETUP SOCKET.IO
  useEffect(() => {
    const username = localStorage.getItem("username") || generateRandomCursor().name;

    // Force fallback to local socket server if env var missing
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3001";
    console.log("Socket.IO connecting to:", wsUrl);

    const socket = io(wsUrl, {
      query: { username },
      // try websocket only (avoid polling requests hitting wrong server)
      transports: ["websocket"],
      // if your server uses a custom path, set it here:
      // path: "/socket.io",
      autoConnect: true,
    });

    setSocket(socket);
    socket.on("connect", () => {
      console.log("socket connected", socket.id);
    });
    socket.on("msgs-receive-init", (msgs) => {
      setMsgs(msgs);
    });
    socket.on("msg-receive", (msg) => {
      setMsgs((p) => [...p, msg]);
    });
    socket.on("connect_error", (err: any) => {
      console.warn("socket connect_error", err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket, users, setUsers, msgs }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;

// NOTE: server code removed — run a separate server file instead of embedding it here.
