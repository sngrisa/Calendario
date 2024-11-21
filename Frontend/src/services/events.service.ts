import axios from "axios";
import { ICalendarEvent } from "../pages/calendar/calendar";

const url: string = "http://localhost:7000/api/events";

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Unknown error');
    }

    return await response.json();
};

const postEvent = async (event: any) => {
    try {
        const response: Response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });
        return handleResponse(response);
    } catch (err: any) {
        console.error('Error creating event:', err);
        throw err;
    }
}

const putEvent = async (event: ICalendarEvent) => {
    try {
        const { _id, ...eventData } = event;
        const response: Response = await fetch(`${url}/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        return handleResponse(response);
    } catch (err: any) {
        console.error('Error updating event:', err);
        throw err;
    }
}


const deleteEvent = async (_id: string | number | undefined): Promise<any> => {
    try {
        const response: Response = await axios.delete(`${url}/${_id}`);
        return handleResponse(response);
    } catch (err: any) {
        console.error('Error deleting event:', err);
        throw err;
    }
};

const getUserEventsById = async(_id: string | number | undefined): Promise<any> =>{
    if(!_id){
        console.error('The _id of user is required');
        return;
    }
    try{
        const response = await axios.get(`${url}/user/${_id}`);
        return await response.data.events;
    }catch(err: any){
        console.error("Not events found by id User o other error found!!")
    }
}


export { postEvent, putEvent, deleteEvent, getUserEventsById };