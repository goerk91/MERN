import { model, Schema, Model, Document } from 'mongoose';

interface IUser extends Document{
    email: string;
    passwordHash: string;
}

const UserSchema:Schema = new Schema({
    email:{type:String, required:true},
    passwordHash:{type:String, required:true}
})

export const User:Model<IUser> = model('User', UserSchema);