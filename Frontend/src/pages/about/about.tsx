import "./About.scss";
import FeaturesAbout from "./features-about/features-about";
import Main from "./main/main";
import Questions from "./questions/questions";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import imageI from "./../../assets/eyeCalendar.png";
import imageII from "./../../assets/tickCalendar.png";
import imageIII from "./../../assets/timeCalendar.png";
import imageIV from "./../../assets/easyCalendar.png";
import imageV from "./../../assets/customCalendar.png";
import imageVI from "./../../assets/featureShared.png";

export interface IFeatureAbout{
  id: string | number;
  title: string;
  desc: string;
  img: any | string;
}


const About = () => {

  let featuresAbout: IFeatureAbout[] = [
    {
      id: 1,
      title: "Visualización clara de actividades",
      desc: "Con nuestra interfaz intuitiva, podrás ver tus actividades diarias, semanales y mensuales de un vistazo, facilitando la planificación.",
      img: imageI
    },
    {
      id: 2,
      title: "Integración automática de eventos",
      desc: "Recibe notificaciones y añade eventos automáticamente a tu calendario, desde conciertos hasta reuniones, sin esfuerzo adicional.",
      img: imageII
    },
    {
      id: 3,
      title: "Sincronización en tiempo real",
      desc: "Mantén todos tus dispositivos actualizados con sincronización en tiempo real, asegurando que tu agenda esté siempre al día.",
      img: imageIII
    },
    {
      id: 4,
      title: "Facilidad para programar citas",
      desc: "Ofrece a tus clientes una manera sencilla de reservar citas contigo, optimizando tu tiempo y mejorando la gestión de tus reuniones.",
      img: imageIV
    },
    {
      id: 5,
      title: "Personalización de recordatorios",
      desc: "Configura recordatorios personalizados para eventos importantes y nunca más olvides una fecha clave o una reunión.",
      img: imageV
    },
    {
      id: 6,
      title: "Acceso compartido",
      desc: "Comparte tu calendario con colegas o familiares para una mejor coordinación de actividades y evitar conflictos de horarios.",
      img: imageVI
    }
  ];

  return (
    <>
      <section className="bg-slate-700">
        <Main />
        <div className="text-center container mx-auto pt-2 pb-2">
          <h1 className="text-white text-4xl mt-24 uppercase font-bold flex items-center justify-center"><span className="mr-2"><MdOutlineFeaturedPlayList /></span>Principales Carácteristicas</h1>
          <div className="grid grid-cols-2">
            {
              featuresAbout.map((featureAbout: IFeatureAbout ,idx: string | number) => (<FeaturesAbout key={idx} featureAbout={featureAbout}/>))
            }
          </div>
        </div>
        <Questions />
      </section>
    </>
  )
}

export default About;