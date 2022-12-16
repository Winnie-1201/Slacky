import { createContext, useContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }) {
  // const [socket, setSocket] = useState()
  const socket = io();
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
