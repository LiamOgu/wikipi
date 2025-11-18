import user from '../assets/default-user-icon.webp'
import docData from '../data/documentationsData.js'
import projetData from '../data/projetsData.js'

const ActualityCard = ({ id }) => {
    const documentation = docData.documentation.find(doc => doc.id === id)
    if (!documentation) {
        return <div>Documentation introuvable (id: {id})</div>
    }
    const projet = projetData.projet.find(proj => proj.documentations.some(doc => doc.id === id));
    return (
        <div className="card w-full bg-white card-sm shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200 hover:cursor-pointer">
            <div className="card-body text-black">
                <h3>{projet ? projet.title : "Projet inconnu"}</h3>
                <h2 className="card-title">{documentation.title}</h2>
                <p>{documentation.content}</p>
                <div className='flex flex-row gap-4'>
                    <img src={user} className='rounded-full w-[50px]'></img>
                    <div>
                        <p>{documentation.author}</p>
                        <p>{documentation.date}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActualityCard