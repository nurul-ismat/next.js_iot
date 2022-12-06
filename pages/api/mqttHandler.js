import dbConnect from "../../utils/dbConnect";
import User from "../../models/user";
import Client from "../../models/client";
import ClientData from "../../models/clientData";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";

var mqtt = require("mqtt");

dbConnect();

var listClient = [];
var socket;
const socketInitializer = async () => {
  // We just call it because we don't need anything else out of it
  const result = await fetch("http://localhost:3000/api/socket");

  socket = io("ws://localhost:3000");
  console.log("hello", result.status);
  socket.on("connect", () => {
    console.log("connect");
    socket.emit("hello");
  });
};

socketInitializer();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  console.log("done");
  const { method } = req;
  const { action } = req.body;

  async function registerClient() {
    try {
      const {
        host,
        username,
        password,
        clientId,
        reconnectPeriod,
        connectTimeout,
        port,
        path,
      } = req.body;

      const options = {
        username: username,
        password: password,
        clientId: clientId,
        reconnectPeriod: reconnectPeriod,
        connectTimeout: connectTimeout,
        port: port,
        path: path,
      };
      var hasError = false;
      console.log("Host : ", host);
      console.log("Options : ", options);
      const mqttClient = mqtt.connect(host, options);
      mqttClient.stream.on("error", (err) => {
        console.log("error", err);
        mqttClient.end();
        hasError = true;
      });
      mqttClient.on("connect", function () {
        //TODO:Connected
      });
      mqttClient.on("reconnect", function () {
        //TODO:Reconnect
      });
      mqttClient.on("close", function () {
        //TODO:Disconnect
      });

      while (!mqttClient.connected && !hasError) {
        await delay(200);
      }
      if (hasError) {
        res.status(400).json({ success: false });
      } else {
        var { _id } = req.body;
        listClient.push({
          clientId: _id,
          client: mqttClient,
        });
        res.status(201).json({ success: true, status: mqttClient.connected });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }

  async function validateClient() {
    try {
      const { client } = req.body;
      //   console.log("client", client);
      var exist = false;
      //   console.log("list 1", listClient);
      listClient.forEach((element) => {
        if (client._id == element.clientId) {
          exist = true;
        }
      });
      if (!exist) {
        const _id = client._id;
        const host = client.host;
        const options = {
          username: client.username,
          password: client.password,
          clientId: client.clientId,
          reconnectPeriod: client.reconnectPeriod,
          connectTimeout: client.connectTimeout,
          port: client.port,
          path: client.path,
        };
        const { subscription } = client;
        var hasError = false;
        const mqttClient = mqtt.connect(host, options);
        mqttClient.stream.on("error", (err) => {
          console.log("error", err);
          mqttClient.end();
          hasError = true;
        });
        mqttClient.on("connect", function () {});
        mqttClient.on("reconnect", function () {
          //TODO:Reconnect
        });
        mqttClient.on("close", function () {
          //TODO:Disconnect
        });

        while (!mqttClient.connected && !hasError) {
          await delay(200);
        }
        if (hasError) {
          res.status(400).json({ success: false });
        } else {
          subscription.forEach((element) => {
            mqttClient.subscribe(element);
          });
          mqttClient.on("message", async function (topic, message) {
            console.log(message.toString());
            if (socket)
              socket.emit("updateClientData", {
                clientId: client._id,
                topic: topic,
              });

            console.log('socket: ', socket);
            await ClientData.create({
              _id: uuidv4().toString(),
              clientId: client._id,
              topic: topic,
              value: message.toString(),
              date: Date.now(),
            });
          });

          listClient.push({
            clientId: _id,
            client: mqttClient,
          });
          //   console.log("list 2", listClient);
          res.status(201).json({ success: true, status: mqttClient.connected });
        }
      } else {
        res.status(201).json({ success: true, status: true });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }

  async function subscribeTopicClient() {
    try {
      const { client, topic } = req.body;
      var exist = false;
      listClient.forEach((element) => {
        if (client._id == element.clientId) {
          exist = true;
        }
      });
      if (!exist) {
        console.log("teszst not exist", topic);
        const _id = client._id;
        const host = client.host;
        const options = {
          username: client.username,
          password: client.password,
          clientId: client.clientId,
          reconnectPeriod: client.reconnectPeriod,
          connectTimeout: client.connectTimeout,
          port: client.port,
          path: client.path,
        };
        var hasError = false;
        const mqttClient = mqtt.connect(host, options);
        mqttClient.stream.on("error", (err) => {
          console.log("error", err);
          mqttClient.end();
          hasError = true;
        });
        mqttClient.on("connect", function () {
          mqttClient.subscribe(topic);
        });
        mqttClient.on("message", async function (topic, message) {
          socket.emit("updateClientData", {
            clientId: _id,
            topic: topic,
          });
          await ClientData.create({
            _id: uuidv4().toString(),
            clientId: client._id,
            topic: topic,
            value: message.toString(),
            date: Date.now(),
          });
        });
        mqttClient.on("reconnect", function () {
          //TODO:Reconnect
        });
        mqttClient.on("close", function () {
          //TODO:Disconnect
        });

        while (!mqttClient.connected && !hasError) {
          await delay(200);
        }
        if (hasError) {
          res.status(400).json({ success: false });
        } else {
          listClient.push({
            clientId: _id,
            client: mqttClient,
          });
          res.status(201).json({ success: true, status: mqttClient.connected });
        }
      } else {
        console.log("teszst", topic);
        for (var i = 0; i < listClient.length; i++) {
          if (listClient[i].clientId == client._id) {
            listClient[i].subscribe(topic);
            console.log("teszst", topic);
            listClient[i].on("message", async function (topic, message) {
              socket.emit("updateClientData", {
                clientId: listClient[i]._id,
                topic: topic,
              });
              await ClientData.create({
                _id: uuidv4().toString(),
                clientId: listClient[i].clientId,
                topic: topic,
                value: message.toString(),
                date: Date.now(),
              });
            });
            break;
          }

          res.status(201).json({ success: true, status: client.connected });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }

  switch (method) {
    case "POST":
      switch (action) {
        case "register":
          registerClient();
          break;
        case "validate":
          validateClient();
          break;
        case "subscribeTopic":
          subscribeTopicClient();
          break;
        default:
          res.status(400).json({ success: false });
          break;
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
