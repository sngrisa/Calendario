import { IoCalendarNumber } from "react-icons/io5";
import { MdSupervisorAccount } from "react-icons/md";
import "./main.scss";
import HomeCalendar from "./../../../assets/calendar.png";

const Main = () => {
    return (
        <>
            <div className="bg-white">
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                        <div className="relative left-[calc(50%+3rem)] clip-path aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
                    </div>
                <div className="absolute relative isolate px-4 lg:px-4">
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="text-center">
                            <h1 className="text-balance text-4xl font-bold tracking-tight text-black sm:text-7xl">¡Bienvenido a tu <div className="text-purple-950">nuevo calendario!</div></h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">Organiza tu vida de manera fácil y efectiva. Regístrate para empezar a gestionar tus eventos, recordatorios y tareas en un solo lugar.</p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a href="/auth/register" className="flex items-center button-home rounded-md bg-purple-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><span className="mr-2 text-3xl"><MdSupervisorAccount /></span>Regístrate ahora</a>
                                <a href="/about" className="text-sm font-semibold leading-6 text-gray-900">Descubre cómo funciona <span aria-hidden="true">→</span></a>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-16">
                            <img src={HomeCalendar} className="imageMain" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Main;
