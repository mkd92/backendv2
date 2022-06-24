import jwt from "jwt-simple";
import config from "../config";
import User from "../models/User";

export default async (bearerToken) => {
  const token = bearerToken.split(" ")[1];
  let decoded = null;
  let user = null;
  try {
    decoded = jwt.decode(token, config.jwtSecret);
    user = await User.findById({ _id: decoded.id });
    return { _id: user._id, name: user.name, username: user.username };
  } catch (e) {
    return false;
  }
};
