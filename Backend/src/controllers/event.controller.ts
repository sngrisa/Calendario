import { Request, Response } from "express";
import Events from "./../models/event.model";
import { IEvent } from "../interfaces/event.interface";


const getEventById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const resp = await Events.findById(id);
        if (!resp) {
            return res.status(404).json({ ok: false, msg: "Event not found!!!" });
        }
        return res.status(200).json({ msg: resp });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err.message });
    }
};


const getEvents = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const users = await Events.find({});
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false, msg: err.message });
    }
};


const saveEvent = async (_req: Request, _res: Response): Promise<Response> =>{
    const {title, notes, start, end} = _req.body;
    try{
        const eventDB: any = new Events();
        eventDB.title = title;
        eventDB.start = start;
        eventDB.end = end;
        eventDB.notes = notes;
        await eventDB.save();
        return _res.status(201).json({
            ok: true,
            msg: "Event added to database"
        })
    }catch(err: any){
        console.error(err);
    }
}



const updateEvent = async (_req: Request, _res: Response): Promise<Response> => {
    try {
        const Event = new Events();
        await Event.save();
        return _res.status(201).json({
            ok: true,
            msg: "Event updated succesfull!!!!"
        })
    } catch (err) {
        console.error(err);
    }
}

export { getEventById, getEvents, saveEvent, updateEvent };