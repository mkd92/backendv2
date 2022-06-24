import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
});
userSchema.plugin(passportLocalMongoose);
export default mongoose.model("User", userSchema);
