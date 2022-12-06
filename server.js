const mongoose = require("mongoose");
const express = require("express");
const next = require("next");
const http = require("http");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
var mqtt = require("mqtt");
const { CLIENT_PUBLIC_FILES_PATH } = require("next/dist/shared/lib/constants");
// const { Server } = require("socket.io");
// const ioserver = http.createServer(express);
// const io = new Server(ioserver);
var listClient = [];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded());
    server.post("/test", (req, res) => {
      console.log(req.body);

      // console.log("Connecting");
      // client.on("connect", function () {
      //   console.log("Connected");
      //   client.subscribe("testtopic/#", function (err) {
      //     if (!err) {
      //       client.publish("mytopic3", "Hello mqtt");
      //       client.publish("mytopic3", "Hello mqtt");
      //       client.publish("mytopic3", "Hello mqtt");
      //       client.publish("mytopic3", "Hello mqtt");
      //       client.publish("mytopic3", "Hello mqtt");
      //       client.publish("mytopic3", "Hello mqtt");
      //       client.publish("mytopic3", "Hello mqtt");
      //       client.publish("mytopic3", "Hello mqtt");
      //     }
      //   });
      // });
      // client.on("message", function (topic, message) {
      //   // message is Buffer
      //   console.log(message.toString());
      //   // client.end();
      // });
      res.status(200).send(req.body);
    });

    server.post("/api/server/connectClient", async (req, res) => {
      const { method } = req;
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
        const client = mqtt.connect(host, options);
        client.stream.on("error", (err) => {
          console.log("error", err);
          client.end();
          hasError = true;
        });
        client.on("connect", function () {
          //TODO:Connected
        });
        client.on("reconnect", function () {
          //TODO:Reconnect
        });
        client.on("close", function () {
          //TODO:Disconnect
        });

        while (!client.connected && !hasError) {
          await delay(3000);
        }
        if (hasError) {
          res.status(400).json({ success: false });
        } else {
          var { _id } = req.body;
          listClient.push({
            clientId: _id,
            client: client,
          });
          res.status(201).json({ success: true, status: client.connected });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
    });

    server.post("/api/server/validateClient", async (req, res) => {
      const { method } = req;
      try {
        const { clientData } = req.body;
        console.log("clientData", clientData);
        var exist = false;
        var client;
        listClient.forEach((element) => {
          if (clientData._id == element._id) {
            client = element.client;
          }
        });
        if (!exist) {
          const _id = clientData._id;
          const host = clientData.host;
          const options = {
            username: clientData.username,
            password: clientData.password,
            clientId: clientData.clientId,
            reconnectPeriod: clientData.reconnectPeriod,
            connectTimeout: clientData.connectTimeout,
            port: clientData.port,
            path: clientData.path,
          };
          var hasError = false;
          console.log("Host : ", host);
          console.log("Options : ", options);
          const client = mqtt.connect(host, options);
          client.stream.on("error", (err) => {
            console.log("error", err);
            client.end();
            hasError = true;
          });
          client.on("connect", function () {
            //TODO:Connected
          });
          client.on("reconnect", function () {
            //TODO:Reconnect
          });
          client.on("close", function () {
            //TODO:Disconnect
          });

          while (!client.connected && !hasError) {
            await delay(3000);
          }
          if (hasError) {
            res.status(400).json({ success: false });
          } else {
            listClient.push({
              clientId: _id,
              client: client,
            });

            res.status(201).json({ success: true, status: client.connected });
          }
        } else {
          res.status(201).json({ success: true, status: client.connected });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
    });

    server.post("/api/server/subscribeTopic", async (req, res) => {
      const { method } = req;
      try {
        const { clientData, subscriptions } = req.body;
        console.log("clientData", clientData);
        var exist = false;
        var client;
        listClient.forEach((element) => {
          if (clientData._id == element._id) {
            client = element.client;
          }
        });
        if (!exist) {
          const _id = clientData._id;
          const host = clientData.host;
          const options = {
            username: clientData.username,
            password: clientData.password,
            clientId: clientData.clientId,
            reconnectPeriod: clientData.reconnectPeriod,
            connectTimeout: clientData.connectTimeout,
            port: clientData.port,
            path: clientData.path,
          };
          var hasError = false;
          console.log("Host : ", host);
          console.log("Options : ", options);
          const client = mqtt.connect(host, options);
          client.stream.on("error", (err) => {
            console.log("error", err);
            client.end();
            hasError = true;
          });
          client.on("connect", function () {
            //TODO:Connected
          });
          client.on("reconnect", function () {
            //TODO:Reconnect
          });
          client.on("close", function () {
            //TODO:Disconnect
          });

          while (!client.connected && !hasError) {
            await delay(3000);
          }
          if (hasError) {
            res.status(400).json({ success: false });
          } else {
            listClient.push({
              clientId: _id,
              client: client,
            });
            res.status(201).json({ success: true, status: client.connected });
          }
        } else {
          res.status(201).json({ success: true, status: client.connected });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
    });

    server.post("*", (req, res) => {
      return handle(req, res);
    });
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
