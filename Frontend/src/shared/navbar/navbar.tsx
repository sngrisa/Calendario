import { FaHome } from "react-icons/fa";
import "./navbar.scss";
import { IoMdCalendar } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { RiCalendarEventFill } from "react-icons/ri";


export interface IMenuItem {
    id: string | number;
    title: string;
    url: string;
    icon: string | any;
}

const Navbar = () => {

    let menuItems: IMenuItem[] = [
        {
            id: 1,
            title: "Home",
            url: "/",
            icon: <FaHome />
        }
    ]

    return (
        <>
            <header className="w-full">
                <nav className="bg-slate-50 border-gray-200 py-2.5">
                    <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                        <a href="/" className="flex items-center">
                            <span className="text-5xl mr-2 text-purple-800"><RiCalendarEventFill  /></span>
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">CALENDAR</span>
                        </a>
                        <div className="flex items-center lg:order-2">
                            <a href="/auth/login" className="flex items-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"><span className="mr-2 text-2xl"><IoLogIn /> </span>Iniciar Sesion </a>
                            <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

        </>
    )
}

export default Navbar;