import axios from 'axios';
import { ICalendarEvent } from '../pages/calendar/calendar';

const url: string = 'http://localhost:7000/api/events';

const request = async (method: 'post' | 'put' | 'delete' | 'get', endpoint: string, data: any = null) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const response = await axios({ method, url: `${url}${endpoint}`, data, ...config });

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Invalid response from server');
        }
    } catch (err: any) {
        console.error(`Error with ${method} request to ${endpoint}:`, err.message || err);
        throw new Error(`Failed to perform ${method} request`);
    }
};

const postEvent = async (event: ICalendarEvent) => {
    return await request('post', '/', event) || null;
};

const putEvent = async (event: ICalendarEvent) => {
    return await request('put', `/${event._id}`, event);
};

const deleteEvent = async (_id: string | number | undefined) => {
    if (!_id) throw new Error('The _id of the event is required');
    try{await axios.delete(`${url}/${_id}`);
    }catch(err: any){
        console.error(err);
        throw err;
    }
};

const getUserEventsById = async (_id: string | number | undefined) => {
    if (!_id) throw new Error('The _id of the user is required');
    return await request('get', `/user/${_id}`);
};

export { postEvent, putEvent, deleteEvent, getUserEventsById };

