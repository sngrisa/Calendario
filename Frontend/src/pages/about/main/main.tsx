import image from "./../../../assets/feature-1.png";
import { RiCalendarEventFill } from "react-icons/ri";
import { Button } from "../../../components/ui/button";
import { IoLogIn } from "react-icons/io5";
import "./main.scss";

const Main = () => {
    return (
        <>
            <section className="pt-24">
                <div className='container mx-auto pt-24 text-black bg-white card-item '>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='main-container flex flex-col items-center'>
                            <h1 className="font-bold text-2xl flex items-center justify-center">
                                <span className='mr-2 text-purple-800 text-5xl'><RiCalendarEventFill /></span>
                                CALENDAR
                            </h1>
                            <h3 className="font-bold text-4xl flex items-center justify-center mt-6 text-center md:text-5xl">Organiza Tu Tiempo</h3>
                            <p className="font-bold flex items-center mt-4 justify-center text-center px-4">
                                Maximiza tu tiempo y organiza tus actividades de manera efectiva con nuestro calendario compartido, creado para integrarse a la perfección.
                            </p>
                            <a href="/auth/login" className="w-full">
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full mt-4" style={{ height: "52px" }}>
                                    <span className="mr-1 text-4xl"><IoLogIn /></span>Iniciar Sesión
                                </Button>
                            </a>
                        </div>
                        <div className='flex items-center justify-center'>
                            <img src={image} alt="Calendar illustration" className="w-full h-auto max-w-sm md:max-w-full" />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Main;