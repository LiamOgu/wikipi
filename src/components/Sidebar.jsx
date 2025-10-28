import { FaPlus, FaRegFolder } from "react-icons/fa";
import { MdAdd } from 'react-icons/md';
import { FaRegFolderClosed } from "react-icons/fa6";
import Loupe from "./Loupe.jsx";

const Sidebar = ({ children }) => {
  return (
    <div>
      <div className="drawer z-40 lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {children}
        </div>
        <div className="drawer-side mt-20">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <label className="input flex">
              {/*logo loupe search gauche*/}
              <Loupe strokeColor="black" />
              <input className="" type="search" required placeholder="Search" />
              <button className="btn btn-square join-item bg-red-500 hover:bg-red-700 ">
                <Loupe strokeColor="white" />
              </button>
            </label>
            <ul className="menu bg-base-200 rounded-box w-56">
              <li>
                <a>
                  <MdAdd /> Nouveau Projet
                </a>
              </li>
              <li>
                <details>
                  <summary>
                    <FaRegFolderClosed /> Projet Labo 1
                  </summary>
                  <ul>
                    <li>
                      <a>
                        <MdAdd /> Nouveau Projet
                      </a>
                    </li>
                    <li>
                      <a>Documentation</a>
                    </li>
                    <li>
                      <a>Documentation</a>
                    </li>
                    <li>
                      <a>Documentation</a>
                    </li>
                  </ul>
                </details>
                <details>
                  <summary>
                    <FaRegFolderClosed /> Projet Labo 2
                  </summary>
                  <ul>
                    <li>
                      <a>
                        <MdAdd /> Nouveau Projet
                      </a>
                    </li>
                    <li>
                      <a>Documentation</a>
                    </li>
                    <li>
                      <a>Documentation</a>
                    </li>
                    <li>
                      <a>Documentation</a>
                    </li>
                  </ul>
                </details>
                <details>
                  <summary>
                    <FaRegFolderClosed /> Projet Labo 3
                  </summary>
                  <ul>
                    <li>
                      <a>
                        <MdAdd /> Nouveau Projet
                      </a>
                    </li>
                    <li>
                      <a>Documentation</a>
                    </li>
                    <li>
                      <a>Documentation</a>
                    </li>
                    <li>
                      <a>Documentation</a>
                    </li>
                  </ul>
                </details>
                <details>
                  <summary>
                    <FaRegFolderClosed /> Projet Labo 4
                  </summary>
                  <ul>
                    <li>
                      <a>
                        <MdAdd /> Nouveau Projet
                      </a>
                    </li>
                    <li>
                      <a>Documentation</a>
                    </li>
                    <li>
                      <a>Documentation</a>
                    </li>
                    <li>
                      <a>Documentation</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
