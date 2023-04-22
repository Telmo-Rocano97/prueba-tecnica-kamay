import { Schema } from "mongoose";

export const UserSchema = new Schema({
    _id: Number,
    name: String,
    email: String,
    age: Number,
});
    
