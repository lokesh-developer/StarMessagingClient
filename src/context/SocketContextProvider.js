import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SocketContextProvider = (props) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const Io = io("https://star-messaging-socket.herokuapp.com/");
    setSocket(Io);
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
