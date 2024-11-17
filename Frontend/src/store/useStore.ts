import { create } from 'zustand';

export interface IUserEvent {
    _id: string;
    name: string;
}

export interface ICalendarEvent {
    _id: number;
    notes: string;
    start: Date;
    end: Date;
}

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
    getEvent: (_id: string | number) => ICalendarEvent | undefined;
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
    addEvent: (event: ICalendarEvent) => set((state) => ({ events: [...state.events, event] })),
    removeEvent: (_id: string | number) => set((state) => ({
        events: state.events.filter((event: ICalendarEvent) => event._id !== _id)
    })),
    updateEvent: (updatedEvent: ICalendarEvent) => set((state) => ({
        events: state.events.map((event: ICalendarEvent) =>
            event._id === updatedEvent._id ? updatedEvent : event
        )
    })),
    getEvent: (_id: string | number) => {
        const state = get();
        return state.events.find(event => event._id === _id);
    },
    setSelectedEvent: (event: ICalendarEvent) => set({ selectedEvent: event })
}));

export { useStore };


