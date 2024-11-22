import { Request, Response } from "express";
import Events from "./../models/event.model";
import Users from "./../models/user.model";
import mongoose from "mongoose";

const getEventById = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
        const event = await Events.findById(_id);
        if (!event) {
            if (!res.headersSent) {
                return res.status(404).json({ ok: false, msg: "Event not found!!!" });
            }
        }
        if (!res.headersSent) {
            return res.status(200).json({ event });
        }
    } catch (err) {
        if (!res.headersSent) {
            return res.status(500).json({ ok: false, msg: err.message });
        }
    }
};

const getEventsByIdUser = async (_req: Request, _res: Response): Promise<Response> => {
    const { _id } = _req.params;
    if (!_id) {
        if (!_res.headersSent) {
            return _res.status(400).json({ ok: false, msg: "ID of user not found" });
        }
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        if (!_res.headersSent) {
            return _res.status(400).json({ ok: false, msg: "Invalid user ID" });
        }
    }
    try {
        const events = await Events.find({ user: _id });

        if (!events || events.length === 0) {
            if (!_res.headersSent) {
                return _res.status(404).json({ ok: false, msg: "No events found for this user" });
            }
        }

        if (!_res.headersSent) {
            return _res.status(200).json({ ok: true, events });
        }
    } catch (e: any) {
        console.error(e);
        if (!_res.headersSent) {
            return _res.status(500).json({ ok: false, msg: "Server error" });
        }
    }
};

const saveEvent = async (_req: Request, _res: Response): Promise<Response> => {
    const { title, notes, start, end, user } = _req.body;
    const { _id } = user;

    if (!_id) {
        if (!_res.headersSent) {
            return _res.status(400).json({
                ok: false,
                msg: "User ID is required"
            });
        }
    }

    try {
        const user = await Users.findById(_id);
        if (!user) {
            if (!_res.headersSent) {
                return _res.status(404).json({
                    ok: false,
                    msg: "User not found"
                });
            }
        }

        const eventDB = new Events({
            title,
            start,
            end,
            notes,
            user: user
        });

        await eventDB.save();

        if (!_res.headersSent) {
            return _res.status(201).json({
                ok: true,
                msg: "Event added to database",
                event: eventDB
            });
        }
    } catch (err: any) {
        if (!_res.headersSent) {
            return _res.status(500).json({
                ok: false,
                msg: "An error occurred while saving the event",
                error: err.message
            });
        }
    }
};

const updateEvent = async (_req: Request, _res: Response): Promise<Response> => {
    const { _id } = _req.params;
    const { title, notes, start, end, user } = _req.body;

    if (!_id) {
        if (!_res.headersSent) {
            return _res.status(400).json({
                ok: false,
                msg: "Id of Event is required"
            });
        }
    }

    try {
        const event = await Events.findById(_id);
        if (!event) {
            if (!_res.headersSent) {
                return _res.status(404).json({
                    ok: false,
                    msg: "Event not found"
                });
            }
        }

        event.title = title || event.title;
        event.notes = notes || event.notes;
        event.start = start || event.start;
        event.end = end || event.end;
        event.user = user || event.user;
        
        await event.save();

        if (!_res.headersSent) {
            return _res.status(200).json({
                ok: true,
                msg: "Event updated successfully",
                event
            });
        }
    } catch (err: any) {
        if (!_res.headersSent) {
            return _res.status(500).json({
                ok: false,
                msg: "An error occurred while updating the event",
                error: err.message
            });
        }
    }
};

const deleteEvent = async (_req: Request, _res: Response): Promise<Response> => {
    const { _id } = _req.params;

    if (!_id) {
        if (!_res.headersSent) {
            return _res.status(400).json({ ok: false, msg: "ID of event not found" });
        }
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        if (!_res.headersSent) {
            return _res.status(400).json({ ok: false, msg: "Invalid event ID" });
        }
    }

    try {
        const events = await Events.findByIdAndDelete(_id);
        
        if (!events) {
            if (!_res.headersSent) {
                return _res.status(404).json({ ok: false, msg: "Event not found" });
            }
        }

        if (!_res.headersSent) {
            return _res.status(200).json({ ok: true, msg: "Event deleted successfully", events });
        }
    } catch (e: any) {
        if (!_res.headersSent) {
            console.error(e);
            return _res.status(500).json({ ok: false, msg: "Server error" });
        }
    }
};


export { getEventById, saveEvent, updateEvent, deleteEvent, getEventsByIdUser };
