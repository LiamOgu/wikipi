import user from '../assets/default-user-icon.webp'

const ActualityCard = () => {
    return (
        <div className="card w-96 bg-white card-sm shadow-sm">
            <div className="card-body text-black">
                <h3>projet wikipi</h3>
                <h2 className="card-title">Nom du projet</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit, libero ut sagittis imperdiet,
                    arcu sapien molestie diam, non gravida odio ante vitae lacus. Nunc sagittis mauris at sapien pretium ultricies.</p>
                <div className='flex flex-row gap-4'>
                    <img src={user} className='rounded-full w-[50px]'></img>
                    <div>
                        <p>Username</p>
                        <p>06/03/2024</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActualityCard