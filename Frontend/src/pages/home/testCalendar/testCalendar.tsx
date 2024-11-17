import { MdOutlineRailwayAlert } from "react-icons/md";
import { IoCreate } from "react-icons/io5";

const TestCalendar = () => {
    return (
        <>
            <section className="bg-gray-200">
                <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
                    <div className="max-w-screen-sm mx-auto text-center">
                        <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-purple-950"><span className="text-purple-950 text-9xl flex items-center justify-center"><MdOutlineRailwayAlert /></span>Pruebe el calendario hoy mismo!!!</h2>
                        <p className="mb-6 font-light text-black">Cree una cuenta hoy y disfrute de su calendario online.100% gratuito y sin restricciones!!!!</p>
                        <a href="/auth/register" className="text-white text-center button-home bg-purple-700 hover:bg-purple-800 focus:ring-4 flex items-center justify-center focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800 "><span className="text-3xl"><IoCreate /></span> Crear cuenta</a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TestCalendar;