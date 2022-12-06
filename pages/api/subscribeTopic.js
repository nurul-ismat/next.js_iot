import dbConnect from "../../utils/dbConnect";
import User from "../../models/user";
import Client from "../../models/client";
import ClientData from "../../models/clientData";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        var { client, topic } = req.body;

        if (client) {
          await Client.findOneAndUpdate(
            { _id: client._id },
            { $addToSet: { subscription: topic } }
          );

          client = await Client.findOne({ _id: client._id });
          console.log(client);

          req.body._id = uuidv4().toString();
          req.body.action = "subscribeTopic";

          var result = await fetch("http://localhost:3000/api/mqttHandler", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(req.body),
          });
          if (result.status == 201) {
            console.log(client.subscription);
            res
              .status(201)
              .json({ success: true, subscriptions: client.subscription });
          } else {
            console.log("what?", result.status);
            res.status(400).json({ success: false });
          }
        } else {
          console.log("this", client);
          res.status(400).json({ success: false });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      console.log("aa");
      res.status(400).json({ success: false });
      break;
  }
}
