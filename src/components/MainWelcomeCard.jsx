const MainWelcomeCard = () => {
    return (
        <div className="w-full flex justify-center mt-30">
            <div className="hero bg-[#C81E1E] rounded-md w-9/10 h-[230px]">
                <div className="hero-content flex-col justify-between lg:flex-row w-10/10">
                    <div>
                        <p>La base documentaire pour le Labo</p>
                        <h1 className="text-5xl font-bold">WikIpi</h1>
                    </div>
                    <div className="flex gap-2">
                        <button className="btn bg-white text-[#C81E1E] hover:bg-black hover:text-white">Créer un nouveau projet</button>
                        <button className="btn bg-white text-[#C81E1E] hover:bg-black hover:text-white">Devenir Modérateur</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainWelcomeCard