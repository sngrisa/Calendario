import { model, Schema } from "mongoose";
import { IEvent } from "../interfaces/event.interface";

const EventsSchema = new Schema<IEvent>({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    notes: { type: String, required: false },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'Users',
        required: true
    },
}, { timestamps: true });

const Event = model('Event', EventsSchema);

export default Event;
