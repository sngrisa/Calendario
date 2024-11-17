"use client"
// @ts-ignore
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import "./modalEvent.scss";
import { FaDownload } from "react-icons/fa";
import { useStore } from '../../../store/useStore';
import { Button } from '../../../components/ui/button';


Modal.setAppElement('#root');
const ModalEvent = ({ cardInfo }: { cardInfo: any }) => {
    const subtitleRef = useRef<any>();
    const { isModalOpen, closeModal, openModal } = useStore();

    const afterOpenModal = (): void => {
        if (subtitleRef.current) {
            subtitleRef.current.style.color = '#f00';
        }
    };

    const customStyles = {
        content: {
            width: '100%',
            maxWidth: '1400px',
            borderRadius: '10px',
            height: 'auto',
            padding: '20px',
            overflow: 'auto',
            maxHeight: '80vh',
        },
    };


    return (
        <>
            <div className='flex justify-center'>
                <Button onClick={openModal} className='flex items-center button-download-modal shadow-lg text-white cursor-pointer w-1/2 bg-purple-600 hover:bg-purple-800 px-6 py-4'>
                    <span className='mr-2'><FaDownload /></span> Ver documentacion
                </Button>
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
                    <section>{cardInfo.component}</section>
                </Modal>
            </div>
        </>
    )
}

export default ModalEvent;