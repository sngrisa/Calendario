import { model, Schema, Document } from "mongoose";
import { IEvent } from "../interfaces/event.interface";


const EventsSchema: any = new Schema<IEvent>({
    title:{
        type: String,
        required: true
    },
    notes:{
        type: String,
        required: true
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
});

const EventModel = model<IEvent>('Events', EventsSchema);

export default EventModel;
