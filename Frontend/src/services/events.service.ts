import { IEventCalendar } from "../pages/calendar/calendar";

const url: string = "http://localhost:7000/events";

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }
    return await response.json();
}

const postEvent = async (event: IEventCalendar) => {
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

const putEvent = async (event: IEventCalendar, idEvent: string | number) => {
    try {
        const response: Response = await fetch(`${url}/${idEvent}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });
        return handleResponse(response);
    } catch (err: any) {
        console.error('Error updating event:', err);
        throw err;
    }
}

const deleteEvent = async (idEvent: string | number) => {
    try {
        const response: Response = await fetch(`${url}/${idEvent}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return handleResponse(response);
    } catch (err: any) {
        console.error('Error deleting event:', err);
        throw err;
    }
}

const getEvents = async () => {
    try {
        const response: Response = await fetch(`${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return handleResponse(response);
    } catch (err: any) {
        console.error('Error fetching events:', err);
        throw err;
    }
}

const getEventsById = async (idEvent: string | number) => {
    try {
        const response: Response = await fetch(`${url}/${idEvent}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return handleResponse(response);
    } catch (err: any) {
        console.error('Error fetching event by ID:', err);
        throw err;
    }
}

export { getEvents, postEvent, putEvent, deleteEvent, getEventsById };