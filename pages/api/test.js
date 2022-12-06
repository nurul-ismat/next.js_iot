import dbConnect from "../../utils/dbConnect";
import User from "../../models/user";
import mqtt from "mqtt";

dbConnect();

export default async (req, res) => {
  console.log("done");
  const { method } = req;

  switch (method) {
    case "POST":
      try {
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
