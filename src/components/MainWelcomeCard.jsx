const MainWelcomeCard = () => {
    return (
        <div className="hero bg-[#C81E1E] ">
            <div className="hero-content flex-col justify-between lg:flex-row w-[100vh]">
                <div>
                    <p>La base documentaire pour le Labo</p>
                    <h1 className="text-5xl font-bold">WikIpi</h1>
                </div>
                <div>
                    <button className="btn bg-white text-[#C81E1E] hover:bg-black hover:text-white">Créer un nouveau projet</button>
                    <button className="btn bg-white text-[#C81E1E] hover:bg-black hover:text-white">Devenir Modérateur</button>
                </div>
            </div>
        </div>
    )
}

export default MainWelcomeCard