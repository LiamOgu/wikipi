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
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            <label className="flex justify-between w-9/10 rounded-box border border-gray-300">
              <div className="flex items-center gap-2 mx-2">
                <Loupe strokeColor="black" />
              </div>
              <input className="appearance-none pl-2" type="" required placeholder="Search" />
              <button className="btn btn-square join-item bg-red-primary hover:bg-red-secondary rounded-e-box">
                <Loupe strokeColor="white" />
              </button>
            </label>
            <ul className="menu bg-base-200 rounded-box w-9/10">
              <li>
                <label htmlFor="projet-modal" className="btn flex justify-start w-full mb-4">
                  <MdAdd /> Nouveau Projet
                </label>
              </li>
              <li>
                <details>
                  <summary>
                    <FaRegFolderClosed /> Projet Labo 1
                  </summary>
                  <ul>
                    <li>
                      <label htmlFor="doc-modal" className="btn">
                        <MdAdd /> Nouvelle Documentation
                      </label>
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
                      <label htmlFor="doc-modal" className="btn">
                        <MdAdd /> Nouvelle Documentation
                      </label>
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
                      <label htmlFor="doc-modal" className="btn">
                        <MdAdd /> Nouvelle Documentation
                      </label>
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
                      <label htmlFor="doc-modal" className="btn">
                        <MdAdd /> Nouvelle Documentation
                      </label>
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
