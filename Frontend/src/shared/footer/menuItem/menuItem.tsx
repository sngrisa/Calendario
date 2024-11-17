import "./menuItem.scss";

const MenuItem = ({ itemMenu }: { itemMenu: any }) => {
  return (
    <>
      <li className="mb-4 text-black">
        <a href={itemMenu.url} className="hover:underline flex items-center itemFooter hover:text-purple-400" >
          <span className='text-purple-950 font-bold text-3xl mr-3'>{itemMenu.icon}</span>{itemMenu.title}</a>
      </li>
    </>
  )
}

export default MenuItem;