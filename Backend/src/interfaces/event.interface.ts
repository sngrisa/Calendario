import { IUser } from "./user.interface";

export interface IEvent extends Document{
    _id?: string | number;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    user?: IUser | null;
}
