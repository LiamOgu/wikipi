const MainWelcomeCard = () => {
    return (
        <div className="w-full flex justify-center mt-30">
            <div className="hero bg-red-secondary rounded-md w-9/10 h-[230px]">
                <div className="hero-content flex-col justify-between lg:flex-row w-10/10">
                    <div className="text-start">
                        <p className="text-white">La base documentaire pour le Labo</p>
                        <h1 className="text-5xl font-bold text-white">WikIpi</h1>
                    </div>
                    <div className="flex md:flex-row flex-col gap-2">
                        <label htmlFor="projet-modal" className="btn bg-white text-red-secondary hover:bg-black hover:text-white">
                            Créer un nouveau projet
                        </label>
                        <button className="btn bg-white text-red-secondary hover:bg-black hover:text-white">Devenir Modérateur</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainWelcomeCard