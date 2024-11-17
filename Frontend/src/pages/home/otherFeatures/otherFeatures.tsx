import { HiUsers } from "react-icons/hi";
import { MdDiscount } from "react-icons/md";
import { BiSolidCalendarEvent } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import OtherFeature from "./otherFeature/otherFeature";
import { FaMapLocationDot } from "react-icons/fa6";

export interface IOtherFeatures {
  id: string | number;
  name: string;
  icon: string | any;
  classColour: string;
  desc: string;
}

let otherFeatures: IOtherFeatures[] = [
  {
    id: 1,
    name: "99.99% de disponibilidad",
    desc: "Programación confiable sin tiempo de inactividad",
    icon: <MdDiscount />,
    classColour: "text-purple-800 text-5xl"
  },
  {
    id: 2,
    name: "600M+ Usuarios",
    desc: "Únete a más de 600 millones de usuarios que confían en nuestro calendario",
    icon: <HiUsers />,
    classColour: "text-purple-800 text-5xl"
  },
  {
    id: 3,
    name: "100+ Países",
    desc: "Usado por personas en más de 100 países para planificar sus eventos",
    icon: <FaMapLocationDot />,
    classColour: "text-purple-800 text-5xl"
  },
  {
    id: 4,
    name: "5+ Millones",
    desc: "Eventos programados diariamente a través de nuestra plataforma",
    icon: <FaPeopleGroup />,
    classColour: "text-purple-800 text-5xl"
  }
]


const OtherFeatures = () => {
  return (
    <>
      <section className="bg-slate-50 text-black">
        <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
          <div className="col-span-2 mb-8">
            <p className=" text-black flex items-center text-3xl font-bold"><span className="text-9xl mr-3 text-purple-800"><BiSolidCalendarEvent /></span>Planifica con Confianza</p>
            <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-black md:text-3xl ">Confiado por más de 600 millones de usuarios para la programación y organización</h2>
            <p className="font-light text-black">Nuestra plataforma de calendario segura y fácil de usar te ayuda a gestionar tu tiempo de manera efectiva, manteniendo tu vida personal y profesional organizada.</p>
          </div>
          <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
            {
              otherFeatures.map((otherFeature: IOtherFeatures, idx: string | number) => {
                return (<OtherFeature key={idx} feature={otherFeature} />)
              })
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default OtherFeatures;