import { useState } from 'react';
import ModalEvent from '../modalEvent/modalEvent';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { IDoEvent } from '../interfaces/IHelp.intertace';

const PanelOptions = ({ doEvents, icon, title, desc }: { doEvents: IDoEvent[], icon: any | string, title: string, desc: string }) => {


    const [selectedEvent, setSelectedEvent] = useState<IDoEvent | null>(null);


    const handleSelectionChange = (event: IDoEvent) => {
        setSelectedEvent(event);
        console.log("Evento seleccionado: ", event);
    };

    return (
        <>
            <section className="legalScreen">
                <div className="container mx-auto">
                    <h1 className="text-3xl uppercase font-bold text-center pt-12 text-purple-950 flex items-center justify-center cursor-pointer">
                        <span className="mr-2 text-5xl text-purple-700">
                            {icon}
                        </span>
                        {title}
                    </h1>
                    <p className="flex items-center justify-center font-bold pt-4">
                        {desc}
                    </p>

                    <div className="flex justify-center mt-10 cursor-pointer selectDocument">
                        <Select onValueChange={(value) => handleSelectionChange(doEvents.find(event => event.title === value)!)}>
                            <SelectTrigger className="w-1/2 bg-purple-600 text-white font-bold">
                                <SelectValue placeholder="Seleccione una opción" />
                            </SelectTrigger>
                            <SelectContent className="bg-purple-600 text-white cursor-pointer">
                                {doEvents.map((doEvent) => (
                                    <SelectItem key={doEvent.id} value={doEvent.title} className="bg-purple-950">
                                        <h3 className="flex items-center"><span className="mr-2">{doEvent.icon}</span>{doEvent.title}</h3>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedEvent && (
                        <div className="mt-10">
                            <ModalEvent cardInfo={selectedEvent} />
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default PanelOptions;