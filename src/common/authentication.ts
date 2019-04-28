import { MongooseDocument } from "mongoose";
import { User } from "../server/infrastructure/model/User";

export interface JWTPayload {
  id: MongooseDocument["_id"];
  email: User["email"];
  avatar: User["avatar"];
}
