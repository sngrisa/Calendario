import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";


const UsersSchema = new Schema<IUser>({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        required: true
    },
});

const UsersModel = model<IUser>('Users', UsersSchema);

export default UsersModel;
