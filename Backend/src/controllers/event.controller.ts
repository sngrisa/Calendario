import { Request, Response } from "express";
import Events from "./../models/event.model";
import Users from "./../models/user.model";

const getEventById = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
        const event = await Events.findById(_id);
        if (!event) {
            return res.status(404).json({ ok: false, msg: "Event not found!!!" });
        }
        return res.status(200).json({ event });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err.message });
    }
};



const getEvents = async (_req: Request, res: Response): Promise<Response> => {
    const { _id } = _req.body;
    try {
        const events = await Events.find({ user: _id }); 
        if (events.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "No events found for this user",
            });
        }
        return res.status(200).json({ events });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err.message });
    }
};


const saveEvent = async (_req: Request, _res: Response): Promise<Response> => {
    const { title, notes, start, end, user } = _req.body;
    const { _id } = user;

    if (!_id) {
        return _res.status(400).json({
            ok: false,
            msg: "User ID is required"
        });
    }

    try {
        const user = await Users.findById(_id);
        if (!user) {
            return _res.status(404).json({
                ok: false,
                msg: "User not found"
            });
        }

        const eventDB = new Events({
            title,
            start,
            end,
            notes,
            user: user
        });

        await eventDB.save();
        return _res.status(201).json({
            ok: true,
            msg: "Event added to database",
            event: eventDB
        });
    } catch (err: any) {
        return _res.status(500).json({
            ok: false,
            msg: "An error occurred while saving the event",
            error: err.message
        });
    }
}



const updateEvent = async (_req: Request, _res: Response): Promise<Response> => {
    const { _id } = _req.params;
    const { title, notes, start, end, userId } = _req.body;

    try {
        const event = await Events.findById(_id);
        if (!event) {
            return _res.status(404).json({
                ok: false,
                msg: "Event not found",
            });
        }

        event.title = title ?? event.title;
        event.notes = notes ?? event.notes;
        event.start = start ?? event.start;
        event.end = end ?? event.end;
        event.user = userId ?? event.user;

        await event.save();

        return _res.status(200).json({
            ok: true,
            msg: "Event updated successfully",
            event,
        });
    } catch (err) {
        console.error(err);
        return _res.status(500).json({
            ok: false,
            msg: "An error occurred while updating the event",
            error: err.message,
        });
    }
}

const deleteEvent = async (_req: Request, _res: Response): Promise<Response> => {
    const { eventId } = _req.params;
    try {
        const event = await Events.findByIdAndDelete(eventId);
        if (!event) {
            return _res.status(404).json({
                ok: false,
                msg: "Event not found",
            });
        }
        return _res.status(200).json({
            ok: true,
            msg: "Event deleted from database",
        });
    } catch (err: any) {
        return _res.status(500).json({
            ok: false,
            msg: "An error occurred while deleting the event",
            error: err.message,
        });
    }
};

export { getEventById, getEvents, saveEvent, updateEvent, deleteEvent };