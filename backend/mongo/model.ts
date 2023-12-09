import mongoose from "mongoose";
import UserSchema from "./userSchema";

const model = mongoose.model("users", UserSchema);
export default model;