const Sidebar = () => {
  return (
    <>
      <div className="drawer z-40">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex items-center justify-center min-h-screen">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            Open Sidebar
          </label>
        </div>
        <div className="drawer-side mt-20">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <label className="input">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  trokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" required placeholder="Search" />
            </label>
            <div
              tabIndex={0}
              className="collapse collapse-arrow bg-base-100 border-base-300 border"
            >
              <div className="collapse-title font-semibold">
                Projet Labo 1
              </div>
              <div className="collapse-content text-sm">
                <button className="btn btn-wide">Wide</button>
              </div>
            </div>
            <div
              tabIndex={0}
              className="collapse collapse-arrow bg-base-100 border-base-300 border"
            >
              <div className="collapse-title font-semibold">
                Projet Labo 1
              </div>
              <div className="collapse-content text-sm">
                <button className="btn btn-wide">Wide</button>
              </div>
            </div>
<div
              tabIndex={0}
              className="collapse collapse-arrow bg-base-100 border-base-300 border">
              <div className="collapse-title font-semibold">
                Projet Labo 1
              </div>
              <div className="collapse-content text-sm">
                <button className="btn btn-wide">Wide</button>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
