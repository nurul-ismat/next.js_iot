import { Console } from "console";
import { Server } from "socket.io";
import dbConnect from "../../utils/dbConnect";
import User from "../../models/user";
import Client from "../../models/client";
import ClientData from "../../models/clientData";
dbConnect();

var socketList = [];

export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  // Define actions inside
  io.on("connection", (socket) => {
    socket.on("registerClient", (clientId, callback) => {
      socketList.push({ socket: socket, clientId: clientId });
    });
    socket.on("hello", (msg) => {
      console.log("world");
    });

    socket.on("disconnecting", (msg)=>{
      console.log(socket.id);
      for (var i = 0; i < socketList.length; i++) {
        if (socketList[i].socket.id == socket.id) {
          socketList.splice(i, 1);
        }
      }
    });


    socket.on("updateClientData", async (message, callback) => {
      console.log("updateClientData", message.clientId);
      for (var i = 0; i < socketList.length; i++) {
        if (socketList[i].clientId == message.clientId) {
          var data = await ClientData.find({
            clientId: message.clientId,
          }).sort({ date: -1 });
          socketList[i].socket.emit("updateClientData", data);
          break;
        }
      }
    });
  });

  console.log("Setting up socket");
  res.end();
}
