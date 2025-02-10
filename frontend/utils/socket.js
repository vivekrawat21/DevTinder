import {io} from "socket.io-client";
import { BACKEND_URL } from "../src/constants/constants";

const createSocketConnection = () => {
    const socket = io(BACKEND_URL);
    return socket;
}

export default createSocketConnection;