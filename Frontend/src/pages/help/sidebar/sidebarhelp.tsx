import { IoIosHome } from "react-icons/io";
import { MdContactPhone } from "react-icons/md";
import { IoLogIn, IoHelpBuoySharp } from "react-icons/io5";
import { FaMouse } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import SidebarItem from "./sidebarItem/sidebarItem";

export interface ISidebarItem{
    id: string | number;
    title: string;
    icon: string | any;
    url: string;
}

const Sidebarhelp = () => {

    let itemSideBarHelp: ISidebarItem[] = [
        {
            id: 1,
            title: "Inicio",
            icon: <IoIosHome />,
            url: "/help/"
        },
        {
            id: 2,
            title: "Contacto",
            icon: <MdContactPhone />,
            url: "/help/contact"
        },
        {
            id: 3,
            title: "Marco Legal",
            icon: <HiDocumentText />,
            url: "/help/legal"
        },
    ]

    return (
        <>
             <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4">
            <div className="mb-2 p-4">
                <h5 className="antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-purple-950 flex items-center">
                    <span className="mr-2 text-4xl text-purple-600"><IoHelpBuoySharp /></span>
                    Centro de Ayuda
                </h5>
            </div>
            <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
                {itemSideBarHelp.map((itemSidebar: ISidebarItem) => (
                    <SidebarItem key={itemSidebar.id} itemSideBar={itemSidebar} />
                ))}
            </nav>
        </div>
        </>
    )
}

export default Sidebarhelp;