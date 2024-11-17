import Copyrigth from './copyrigth/copyrigth';
import { IoHelpBuoySharp, IoLogInSharp } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import MenuItem from './menuItem/menuItem';
import { MdContactPhone, MdHelp } from "react-icons/md";
import { FaCloudRain, FaHome } from "react-icons/fa";
import { TiWeatherPartlySunny, TiWeatherWindyCloudy } from "react-icons/ti";
import "./footer.scss";

export interface IMenuFooterItem {
    id: string | number;
    title: string;
    url: string;
    icon: string | any;
}


let webFriends: IMenuFooterItem[] = [
    {
        id: 1,
        title: "Info Clima",
        url: "https://infoclima.com",
        icon: <FaCloudRain />
    },
    {
        id: 2,
        title: "The Weather Channel",
        url: "https://weather.com/",
        icon: <TiWeatherWindyCloudy />
    },
    {
        id: 3,
        title: "Accu Weather",
        url: "https://www.accuweather.com/",
        icon: <TiWeatherPartlySunny />
    }
]

let helpItemsFooter: IMenuFooterItem[] = [
    {
        id: 1,
        title: "Inicio",
        url: "/",
        icon: <FaHome />
    },
    {
        id: 2,
        title: "Centro de ayuda",
        url: "/help",
        icon: <MdHelp />
    },
    {
        id: 3,
        title: "Iniciar Sesión",
        url: "/login",
        icon: <IoLogInSharp />
    }
];


const Footer = () => {
    return (
        <>
            <footer className="bg-white dark:bg-gray-800">
                <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-2">
                        <div>
                            <h3 className="mb-6 font-bold text-black cursor-pointer flex items-center text-lg"><span className='mr-1 text-4xl text-purple-950'><IoHelpBuoySharp /></span>WEB AMIGAS</h3>
                            <ul className="text-gray-500 dark:text-gray-400">
                                {
                                    webFriends.map((item: IMenuFooterItem, idx: string | number) => {
                                        return (<MenuItem itemMenu={item} key={idx} />)
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-6 font-bold cursor-pointer flex items-center text-lg"><span className='mr-2 text-4xl text-purple-950'><FaMapLocationDot /></span>MAPA DEL SITIO</h3>
                            <ul className="text-gray-500 dark:text-gray-400">
                                {
                                    helpItemsFooter.map((item: IMenuFooterItem, idx: string | number) => {
                                        return (<MenuItem itemMenu={item} key={idx} />)
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <div className="text-center">
                        <Copyrigth />
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;