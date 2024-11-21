import { create } from 'zustand';
import { deleteEvent, postEvent, putEvent, getUserEventsById } from '../services/events.service';
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
    removeEvent: (_id: number | string) => void;
    updateEvent: (updatedEvent: ICalendarEvent) => void;
    fetchEvents: () => void,
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
            const eventWithUser: ICalendarEvent = {
                ...event,
                user: { _id: user._id, username: user.username, email: user.email },
            };

            const response = await postEvent(eventWithUser);

            if (!response || !response.event) {return;}

            set((state) => ({ events: [...state.events, response.event] }));
        } catch (err: any) { console.error(err); }
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
    updateEvent: async (event: ICalendarEvent) => {
        const user = useUserLoginStore.getState().user;
        if (!user || !user._id) {
            console.error("User ID is missing!");
            return;
        }

        try {
            const eventWithUser: ICalendarEvent = {
                ...event,
                user: { _id: user._id, username: user.username, email: user.email },
            };

            console.log("Updating event:", eventWithUser);

            const response = await putEvent(eventWithUser);

            if (response.status === 200) {
                set((state) => ({
                    events: state.events.map(e => e._id === eventWithUser._id ? response.event : e),
                }));
            }
        } catch (err) {
            console.error("Error updating event:", err);
        }
    },
    fetchEvents: async () => {
        const user = useUserLoginStore.getState().user;
        if (!user) {
            console.error("User id not found");
            return;
        }
        try {
            const events = await getUserEventsById(user._id);
            set({ events: Array.isArray(events) ? events : [] });
        } catch (err: any) {
            console.error(err);
            set({ events: [] });
        }
    },
    getEventsById: (_id: string | number) => {
        const state = get();
        return state.events.filter(event => event.user._id === _id);
    },
    setSelectedEvent: (event: ICalendarEvent) => set({ selectedEvent: event })
}));

export { useStore };


