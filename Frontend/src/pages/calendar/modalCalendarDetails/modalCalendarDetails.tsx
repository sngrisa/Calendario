// @ts-ignore
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { MdError } from "react-icons/md";
import { useStore } from '../../../store/useStore'; // Ajusta la ruta
import { MdEventRepeat, MdOutlineEvent, MdEvent, MdOutlineSubtitles } from "react-icons/md";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import moment from 'moment';
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";
import "./modalCalendarDetails.scss";
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";
import { Button } from '../../../components/ui/button';
import { io } from 'socket.io-client';
import { useUserLoginStore } from '../../../store/userLoginStore';
import { getUsersByEmail } from '../../../services/users.service';


type ValuePiece = Date | any;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';

export interface IEventCalendarModal {
    _id: string | number;
    title: string;
    notes: string;
    start: Date;
    user: string | number;
    end: Date;
}

const customStyles = {
    content: {
        width: '100%',
        maxWidth: '500px',
        borderRadius: '10px',
        height: 'auto',
        padding: '20px',
        overflow: 'auto'
    }
};


Modal.setAppElement('#root');
const socketIo = io("http://localhost:7000");

const ModalCalendarDetails = () => {
    const {user} = useUserLoginStore();
    const subtitleRef = useRef<any>();
    const { isModalOpenDetails, closeModalDetails, selectedEvent, updateEvent, removeEvent, setEvents } = useStore();
    const now = moment().minute(0).seconds(0).add(1, 'hours');
    const nowPlus = now.clone().add(1, 'hours');
    
    const findUsernameByEmail = async() =>{
        return await getUsersByEmail(String(user?.email));
    }

    const [date, setDate] = useState<Value>(now.toDate());
    const [dateEnd, setDateEnd] = useState<Value>(nowPlus.toDate());
    const [titleError, setTitleError] = useState<string | null>(null);
    const [notesError, setNotesError] = useState<string | null>(null);

    const [formValues, setFormValues] = useState<any>({
        title: selectedEvent?.title || '',
        notes: selectedEvent?.notes || '',
        start: selectedEvent?.start || new Date(),
        end: selectedEvent?.end || new Date(),
    });

    const { title, notes, start, end } = formValues;

    useEffect(() => {
        if (selectedEvent) {
            setFormValues({
                _id: selectedEvent._id,
                title: selectedEvent.title,
                notes: selectedEvent.notes,
                start: selectedEvent.start,
                end: selectedEvent.end,
                user: {
                    _id: selectedEvent.user,
                    email: selectedEvent.email,
                    username: user?.username
                }
            });
        }
    }, [selectedEvent]);

/*     useEffect(() => {
        socketIo.on('eventUpdated', (updatedEvent: ICalendarEvent) => {
          // Actualizar los eventos en el estado del store
          setEvents((prevEvents) => 
            prevEvents.map((event) =>
              event._id === updatedEvent._id ? updatedEvent : event
            )
          );
        });
    
        // Limpiar el evento cuando el componente se desmonte
        return () => {
          socketIo.off('eventUpdated');
        };
      }, [setEvents]); */

    useEffect(() => {
        socketIo.on("removeEvent", (_id: number | string) => {
            removeEvent(_id);
        });

        return () => {
            socketIo.off("removeEvent");
        };
    }, [removeEvent]);

    const afterOpenModal = (): void => {
        if (subtitleRef.current) {
            subtitleRef.current.style.color = '#f00';
        }
    };

    const InputChange = ({ target }: { target: any }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })

    }

    const startHandledDate = (event: any) => {
        setDate(event);
        setFormValues({
            ...formValues,
            start: event
        })
    }

    const startHandledEndDate = (event: any) => {
        setDateEnd(event);
        setFormValues({
            ...formValues,
            end: event
        })
    }


    const handleUpdateEvent = async (event: any) => {
        event.preventDefault();

        const memoStart = moment(start);
        const memoEnd = moment(end);

        if (memoStart.isSameOrAfter(memoEnd)) {
            alertInfo("La fecha de inicio debe ser anterior a la fecha de fin", "Verifique las fechas ingresadas", "error");
            return;
        }

        if (title.trim().length < 2) {
            alertInfo("El campo de título no puede estar vacío", "El título debe tener al menos 2 caracteres", "error");
            return;
        }
        if (selectedEvent) {
            const updatedEvent = {
                ...selectedEvent,
                title,
                notes,
                start: date,
                end: dateEnd,
                user: user
            };
            socketIo.emit('updateEvent', updatedEvent);
            await updateEvent(updatedEvent)
            closeModalDetails();
        }
    };

    const handleDeleteEvent = async () => {
        if (selectedEvent) {
            try {
                useStore.getState().removeEvent(selectedEvent._id);
                socketIo.emit('removeEvent', selectedEvent._id);
                closeModalDetails();
            } catch (error) {
                console.error("Error deleting event:", error);
            }
        }
    };


    const alertInfo = (msg: string, msg2: string, iconFile: SweetAlertIcon): void => {
        Swal.fire({
            icon: iconFile,
            title: msg,
            text: msg2,
            confirmButtonText: "Aceptar",
        });
    };

    return (
        <>
            <div className='flex items-center justify-center mx-auto mb-10'>
                <Modal
                    isOpen={isModalOpenDetails}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModalDetails}
                    style={customStyles}
                    contentLabel="Example Modal"
                    className="modal cursor-pointer"
                    overlayClassName="modal-fondo"
                    closeTimeoutMS={200}
                    id='modal'
                >
                    <h1 className="text-2xl font-bold mb-4 flex items-center justify-center cursor-pointer">
                        <span className='mr-2 text-green-700'><MdEventRepeat /></span>
                        {selectedEvent?.title.toUpperCase()}
                    </h1>
                    <hr className="mb-4" />
                    <form className="container mx-auto" autoComplete='off'>
                        <div className="mb-4">
                            <label className="text-sm mb-1 font-bold flex items-center justify-center">
                                <span className='mr-2 text-2xl text-green-800'><MdOutlineEvent /></span>
                                Fecha y hora inicio
                            </label>
                            <div className="flex justify-center mb-2">
                                <DateTimePicker
                                    onChange={startHandledDate}
                                    value={date}
                                    className="border border-gray-300 rounded-lg w-full px-3 py-2 cursor-pointer font-bold date-time-picker_wrapper"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="flex items-center text-sm mb-1 font-bold justify-center">
                                <span className='mr-2 text-orange-500 text-2xl'><MdEvent /></span>
                                Fecha y hora fin
                            </label>
                            <div className="flex justify-center mb-2">
                                <DateTimePicker
                                    onChange={startHandledEndDate}
                                    value={dateEnd}
                                    minDate={date}
                                    className="border border-gray-300 rounded-lg w-full px-3 py-2 cursor-pointer font-bold date-time-picker_wrapper"
                                />
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <div className="mb-4">
                            <label className="flex items-center text-sm font-bold mb-1 justify-center">
                                <span className='mr-2 text-2xl text-slate-400'><MdOutlineSubtitles /></span>
                                Título y notas
                            </label>
                            <input
                                type="text"
                                className="block w-full border border-gray-300 rounded-lg px-3 py-2"
                                placeholder="Título del evento"
                                name="title"
                                autoComplete="off"
                                value={title}
                                onChange={InputChange}
                            />
                            {
                                titleError &&
                                <Alert className="bg-red-700 text-white mt-2">
                                    <AlertTitle className="font-bold flex items-center"><span className='mr-2 font-bold text-3xl'><MdError /></span>Atención</AlertTitle>
                                    <AlertDescription>
                                        El campo de titulo tiene menos de 2 caracteres
                                    </AlertDescription>
                                </Alert>
                            }

                        </div>
                        <div className="mb-4">
                            <textarea
                                className="block w-full border border-gray-300 notes rounded-lg px-3 py-2"
                                placeholder="Notas"
                                rows="3"
                                name="notes"
                                value={notes}
                                onChange={InputChange}
                            ></textarea>
                            {
                                notesError &&
                                <Alert className="bg-red-700 text-white mt-2">
                                    <AlertTitle className="font-bold flex items-center"><span className='mr-2 font-bold text-3xl'><MdError /></span>Atención</AlertTitle>
                                    <AlertDescription>
                                        El campo de notas tiene menos de 2 caracteres
                                    </AlertDescription>
                                </Alert>
                            }
                        </div>
                        <div className='grid grid-cols-2'>
                            <Button onClick={handleUpdateEvent}
                                style={{ borderRadius: '5px' }}
                                className="w-full bg-green-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-green-800 transition duration-200"
                            >
                                <span className='mr-2 font-bold text-lg'><GrUpdate /></span>Actualizar Evento
                            </Button>
                            <Button
                                type='button' onClick={handleDeleteEvent}
                                style={{ borderRadius: '5px' }}
                                className="w-full bg-red-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-red-800 transition duration-200"
                            >
                                <span className='mr-2 font-bold text-lg' style={{ borderRadius: '5px' }}><GrUpdate /></span>Eliminar Evento
                            </Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    );
};

export default ModalCalendarDetails;