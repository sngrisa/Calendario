import { Link } from 'react-router-dom';
import { ISidebarItem } from '../sidebarhelp';

const SidebarItem = ({ itemSideBar }: { itemSideBar: ISidebarItem }) => {
    return (
        <Link 
            to={itemSideBar.url} 
            className="font-bold flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-400 hover:text-white hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 focus:text-blue-900 active:text-blue-900 outline-none"
        >
            <span className="grid place-items-center mr-4 text-2xl text-purple-950">
                {itemSideBar.icon}
            </span>
            {itemSideBar.title}
        </Link>
    );
}

export default SidebarItem;