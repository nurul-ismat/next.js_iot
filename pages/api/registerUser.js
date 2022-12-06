import dbConnect from "../../utils/dbConnect";
import User from "../../models/user";
import { v4 as uuidv4 } from "uuid";
dbConnect();

export default async function handler(req, res) {
  console.log("done");
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        req.body._id = uuidv4().toString();
        const user =
          (await User.findOne({ username: req.body.username })) ||
          (await User.create(req.body));
        // const user = await User.create(req.body);
        console.log(user);
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
