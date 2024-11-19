import { create } from 'zustand';
import { deleteEvent, getUserEvents, postEvent, putEvent } from '../services/events.service';
import { useUserLoginStore } from './userLoginStore';
import { ICalendarEvent } from '../pages/calendar/calendar';


interface StoreState {
    isModalOpen: boolean;
    isModalOpenDetails: boolean;
    events: ICalendarEvent[];
    selectedEvent: ICalendarEvent | any;
    openModal: () => void;
    closeModal: () => void;
    addEvent: (event: ICalendarEvent) => void;
    removeEvent: (_id: number) => void;
    updateEvent: (updatedEvent: ICalendarEvent) => void;
    fetchEvents: (_id: string | number | undefined) => void,
    getEventsById: (_id: string | number) => ICalendarEvent[] | undefined[];
    openModalDetails: () => void;
    closeModalDetails: () => void;
    setSelectedEvent: (event: ICalendarEvent) => void;
}

const useStore = create<StoreState>((set, get) => ({
    isModalOpen: false,
    isModalOpenDetails: false,
    events: [],
    selectedEvent: null,
    openModal: () => set({ isModalOpen: true }),
    openModalDetails: () => set({ isModalOpenDetails: true }),
    closeModal: () => set({ isModalOpen: false }),
    closeModalDetails: () => set({ isModalOpenDetails: false }),
    addEvent: async (event: ICalendarEvent) => {
        const user = useUserLoginStore.getState().user;
        if (!user || !user._id) {
            console.error("User ID is missing!");
            return;
        }

        try {
            const eventWithUser = {
                ...event,
                user: { _id: user._id, name: user.username, email: user.email },
            };

            const response = await postEvent(eventWithUser);
            set((state) => ({ events: [...state.events, response.event] }));
        } catch (err) {
            console.error("Error adding event:", err);
        }
    },
    removeEvent: async (_id: string | number) => {
        try {
            await deleteEvent(_id);
            set((state) => ({
                events: state.events.filter((event: ICalendarEvent) => event._id !== _id)
            }));
        } catch (err) {
            console.error("Error removing event:", err);
        }
    },
    updateEvent: async (updatedEvent: ICalendarEvent) => {
        try {
            const response = await putEvent(updatedEvent);
            set((state) => ({
                events: state.events.map((event: ICalendarEvent) =>
                    event._id === updatedEvent._id ? response.event : event
                )
            }));
        } catch (err) {
            console.error("Error updating event:", err);
        }
    },
    fetchEvents: async(_id: string | number | undefined) => {
        const user = useUserLoginStore.getState().user;
        if (!user || !user._id) {
            console.error("User ID is missing!");
            return;
        }

        try {
            const events = await getUserEvents(user._id);
            set({ events });
        } catch (err) {
            console.error("Error fetching events:", err);
        }
    },
    getEventsById: (_id: string | number) => {
        const state = get();
        return state.events.filter(event => event.user._id === _id);
    },
    setSelectedEvent: (event: ICalendarEvent) => set({ selectedEvent: event })
}));

export { useStore };


