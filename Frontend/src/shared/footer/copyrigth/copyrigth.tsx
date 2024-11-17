import { useState } from 'react';
import { RiCalendarEventFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export interface IRedSocialItem{
    id: string | number;
    icon: string | any;
    url: string;
}

let redSocialItems: IRedSocialItem[] = [
    {
        id: 1,
        icon: <FaLinkedin />,
        url: "https://ar.linkedin.com/in/santiago-grisafi"
    },
    {
        id: 2,
        icon: <FaGithub />,
        url: "https://github.com/sngrisa/",
    }
]

const Copyrigth = () => {

    let [date, setDate] = useState(new Date().getFullYear());

    return (
        <>
            <a href="/" className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
                <span className='mr-2 text-purple-800'><RiCalendarEventFill /></span>
                CALENDAR
            </a>
            <span className="block text-sm text-center text-black font-bold cursor-pointer">© {date.toString()} Santiago Grisafi. Todos los derechos reservados
            </span>
            <ul className="flex justify-center mt-5 space-x-5">
                {
                    redSocialItems.map((redSocialItem: any, idx: string | number) => {
                        return (<li key={idx}>
                            <a href={redSocialItem.url} className="text-purple-800 hover:text-purple-400 ">
                                <span className='text-2xl'>{redSocialItem.icon}</span>
                            </a>
                        </li>)
                    })
                }
            </ul>
        </>
    )
}

export default Copyrigth;