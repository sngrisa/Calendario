import axios from "axios";
import { ICalendarEvent } from "../pages/calendar/calendar";

const url: string = "http://localhost:7000/api/events";

const postEvent = async (event: ICalendarEvent) => {
    try {
        const response = await axios.post(`${url}`, event, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data && response.data.event) {
            return response.data.event;  
        } else {
            throw new Error("Invalid response from server: 'event' not found");
        }
    } catch (err: any) {
        console.error('Error adding event:', err.message || err);
        throw new Error('Failed to create event');
    }
};

const putEvent = async (event: ICalendarEvent) => {
    try {
        const response = await axios.put(`${url}/${event._id}`, event, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data && response.data.event) {
            return response.data.event;  
        } else {
            throw new Error("Failed to update event");
        }
    } catch (err: any) {
        console.error('Error updating event:', err.message || err);
        throw new Error('Failed to update event');
    }
};

const deleteEvent = async (_id: string | number | undefined): Promise<any> => {
    if (!_id) {
        console.error('The _id of the event is required');
        return;  
    }
    try {
        const response = await axios.delete(`${url}/${_id}`);
        if (response.data && response.data.events) {
            return response.data.events;  
        } else {
            throw new Error('No events found or deleted');
        }
    } catch (err: any) {
        console.error("Error deleting event:", err.message || err);
        throw new Error('Failed to delete event');
    }
};

const getUserEventsById = async (_id: string | number | undefined): Promise<any> => {
    if (!_id) {
        console.error('The _id of the user is required');
        return [];  
    }
    try {
        const response = await axios.get(`${url}/user/${_id}`);
        if (response.data && response.data.events) {
            return response.data.events;  
        } else {
            throw new Error('No events found for the user');
        }
    } catch (err: any) {
        console.error("Error fetching events for user:", err.message || err);
        throw new Error('Failed to fetch user events');
    }
};

export { postEvent, putEvent, deleteEvent, getUserEventsById };
