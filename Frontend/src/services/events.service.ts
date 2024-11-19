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
    console.log(event);
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
};

const getUserEvents = async (_id: string | number | undefined) => {
    try {
        const response = await fetch(`${url}/user/${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching events');
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error fetching events:', err);
        throw err;
    }
};

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
};

export { getUserEvents, postEvent, putEvent, deleteEvent, getEventsById };