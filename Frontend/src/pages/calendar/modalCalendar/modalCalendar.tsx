"use client"
// @ts-ignore
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { MdError } from "react-icons/md";
import { useStore } from './../../../store/useStore';
import { MdEventRepeat, MdOutlineEvent, MdEvent, MdOutlineSubtitles } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import moment from 'moment';
import { Alert, AlertDescription, AlertTitle } from "./../../../components/ui/alert";
import { Button } from './../../../components/ui/button';
import "./modalCalendar.scss";
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { RiLogoutCircleFill } from "react-icons/ri";
import { BiCalendarEvent } from "react-icons/bi";
import { useUserLoginStore } from '../../../store/userLoginStore';
import { useNavigate } from 'react-router';
import { ICalendarEvent } from '../calendar';


type ValuePiece = Date | any;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const customStyles = {
    content: {
        width: '100%',
        maxWidth: '500px',
        borderRadius: '10px',
        height: 'auto',
        padding: '20px',
        overflow: 'auto',
    }
};

Modal.setAppElement('#root');

const ModalCalendar = () => {
    const subtitleRef = useRef<any>();
    const { isModalOpen, closeModal, openModal, addEvent } = useStore();
    const now = moment().minute(0).seconds(0).add(1, 'hours');
    const nowPlus = now.clone().add(1, 'hours');

    const [date, setDate] = useState<Value>(now.toDate());
    const [dateEnd, setDateEnd] = useState<Value>(nowPlus.toDate());
    const [titleError, setTitleError] = useState<string | null>(null);
    const [notesError, setNotesError] = useState<string | null>(null);
    const [id, setId] = useState<number>(0);
    const { logout, user } = useUserLoginStore();
    const navigate = useNavigate();


    const [formValues, setFormValues] = useState<any>({
        title: "",
        notes: "",
        start: now.toDate(),
        end: nowPlus.toDate()
    });

    const { title, notes } = formValues;


    const afterOpenModal = (): void => {
        if (subtitleRef.current) {
            subtitleRef.current.style.color = '#f00';
        }
    };

    const InputChange = ({ target }: { target: any }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });

        if (target.name === "title") {
            if (target.value.trim().length < 2) {
                setTitleError("El título debe tener al menos 2 caracteres.");
            } else {
                setTitleError(null);
            }
        }

        if (target.name === "notes") {
            if (target.value.trim().length < 5) {
                setNotesError("Las notas deben tener al menos 5 caracteres.");
            } else {
                setNotesError(null);
            }
        }
    };

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

    const handleSubmitForm = (event: any) => {
        event.preventDefault();

        const memoStart = moment(formValues.start);
        const memoEnd = moment(formValues.end);

        if (memoStart.isSameOrAfter(memoEnd)) {
            alertInfo("La fecha de inicio debe ser anterior a la fecha de fin", "Verifique las fechas ingresadas", "error");
            return;
        }

        if (title.trim().length < 2) {
            alertInfo("El campo de título no puede estar vacío", "El título debe tener al menos 2 caracteres", "error");
            return;
        }

        const newEvent: ICalendarEvent = {
            _id: id,
            title: formValues.title,
            start: memoStart.toDate(),
            end: memoEnd.toDate(),
            notes: formValues.notes,
            user: {
                _id: user?._id,
                username: user?.username,
                email: user?.email,
            }
        };

        addEvent(newEvent);
        closeModal();
        setId(id + 1);
    };

    const alertInfo = (msg: string, msg2: string, iconFile: SweetAlertIcon): void => {
        Swal.fire({
            icon: iconFile,
            title: msg,
            text: msg2,
            confirmButtonText: "Aceptar",
        });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <>
            <div className="lg:flex lg:h-full lg:flex-col">
                <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
                    <h1 className="font-bold leading-6 text-white uppercase flex items-center text-2xl">
                        <span className='mr-2 text-4xl text-slate-100'><BiCalendarEvent /></span>Calendar
                    </h1>
                    <div className="flex items-center">
                        <div className='flex'>
                            <h3 className='text-white font-bold'>{user?.email}</h3>
                        </div>
                        <div className="hidden md:ml-4 md:flex md:items-center">

                            <div className="relative">
                                <Button type="button" style={{ height: '38px', borderRadius: '5px' }} onClick={handleLogout} className="flex text-white bg-red-700 items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm  hover:bg-red-500" id="menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span><RiLogoutCircleFill /></span>Cerrar Sesión
                                </Button>

                            </div>
                            <div className="ml-6 h-6 w-px bg-gray-300"></div>
                            <Button type="button" className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 flex items-center" style={{ borderRadius: '5px' }} onClick={openModal}><span className='w-auto flex items-center mr-2'><IoAddCircle /></span> Añadir Evento</Button>
                        </div>
                        <div className="relative ml-6 md:hidden">
                            <button type="button" className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500" id="menu-0-button" aria-expanded="false" aria-haspopup="true">
                                <span className="sr-only">Open menu</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                                </svg>
                            </button>
                            <div className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-0-button" tabIndex={-1}>
                                <div className="py-1" role="none">
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-0-item-0">Create event</a>
                                </div>
                                <div className="py-1" role="none">
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-0-item-1">Go to today</a>
                                </div>
                                <div className="py-1" role="none">
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-0-item-2">Day view</a>
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-0-item-3">Week view</a>
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-0-item-4">Month view</a>
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-0-item-5">Year view</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            <div className='container mx-auto mb-10'>
                <Modal
                    isOpen={isModalOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    className="modal-addevent cursor-pointer"
                    overlayClassName="modal-fondo"
                    closeTimeoutMS={200}
                    id='modal'
                >
                    <h1 className="text-2xl font-bold mb-4 flex items-center justify-center cursor-pointer">
                        <span className='mr-2 text-red-700'><MdEventRepeat /></span>
                        {title}
                    </h1>
                    <hr className="mb-4" />
                    <form className="container mx-auto" onSubmit={handleSubmitForm} autoComplete='off'>
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
                                className="block w-full border border-gray-300 rounded-lg px-3 py-2 notes"
                                placeholder="Notas"
                                rows={4}
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
                        <Button
                            type="submit" style={{ borderRadius: '7px' }}
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-200"
                        >
                            <span className='mr-2 font-bold text-lg'><FaSave /></span>Guardar
                        </Button>
                    </form>
                </Modal>
            </div>
        </>
    );
};

export default ModalCalendar;
