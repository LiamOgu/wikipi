import logoWikipi from '../assets/Logo_wikiPi.png'
import user from '../assets/default-user-icon.webp'
import { NavLink } from "react-router-dom"


const Navbar = () => {
  return (
    <div className="navbar fixed top-0 left-0 w-full z-50 bg-base-100 px-6 py-4 flex justify-between border-b-1 border-gray-200">
      <div className="flex items-center gap-1"> {/* Left side of the navbar (logo and menu icon) */}
        <label htmlFor="my-drawer" tabIndex={0} role="button" className="btn btn-ghost lg:hidden"> {/* Menu icon for small screens */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <div> {/* Logo */}
          <img src={logoWikipi} className="h-12" alt="Wikipi Logo"></img>
        </div>
      </div>
      <div className="flex items-center"> {/* Right side of the navbar (user avatar with dropdown menu) */}
        <div className="avatar dropdown dropdown-end">
          <div tabIndex={0} role="button" className="w-[42px] rounded-full m-1"><img src={user} alt="User Avatar" /></div> {/* User avatar */}
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 mt-12 shadow-lg"> {/* Dropdown menu */}
            <li className="menu-title border-b-1 border-gray-200">User</li>
            <li><a>Menu</a></li>
            <li><a>Settings</a></li>
            <li><NavLink to="/login"><a>Log out</a></NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar