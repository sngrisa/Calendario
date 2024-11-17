import { FaCalendarCheck } from "react-icons/fa6";
import "./features.scss";
import { BsFillCalendar3RangeFill } from "react-icons/bs";
import Feature from "./feature/feature";

export interface IFeatures {
    id: string | number;
    title: string;
    desc: string;
    footerDesc: string;
    imageUrl: any | string;
    items: string[];
}

let features: IFeatures[] = [
    {
        id: 1,
        title: "Organiza tu tiempo de manera eficiente",
        desc: "Gestiona tus compromisos y tareas fácilmente con nuestra aplicación de calendarios. Simplifica tu planificación y mantén el control de tu agenda sin complicaciones",
        footerDesc: "Planifica y organiza tus actividades de manera simple y efectiva, sin complicaciones innecesarias",
        imageUrl: <FaCalendarCheck />,
        items: [
            "Integración con herramientas existentes",
            "Notificaciones y recordatorios",
            "Visualización de agendas",
        ]
    },
    {
        id: 2,
        title: "Potencia tu productividad",
        desc: "Maximiza tu tiempo con nuestras herramientas avanzadas para la gestión de calendarios. Organiza reuniones, planifica tareas y visualiza tu semana de un vistazo",
        footerDesc: "Transforma tu forma de trabajar y aprovecha al máximo cada día con nuestra aplicación de calendarios",
        imageUrl: <BsFillCalendar3RangeFill />,
        items: [
            "Informes y análisis dinámicos",
            "Plantillas para todos",
            "Automatización de tareas",
        ],
    }
];


const Features = () => {
    return (
        <>
            <section className="bg-slate-200 text-black">
                <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
                    <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                        {
                            features.map((feature: IFeatures, idx: string | number) => {
                                return (<Feature key={idx} feature={feature} />)
                            })
                        }
                    </div>
                </div>
            </section>

        </>
    )
}

export default Features;