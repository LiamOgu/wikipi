import user from '../assets/default-user-icon.webp'
import docData from '../data/documentationsData.js'
import projetData from '../data/projetsData.js'
import { NavLink } from 'react-router-dom'

const ActualityCard = ({ id }) => {
    const documentation = docData.documentation.find(doc => doc.id === id)
    if (!documentation) {
        return <div>Documentation introuvable (id: {id})</div>
    }
    const projet = projetData.projet.find(proj => proj.documentations.some(doc => doc.id === id));
    return (
        <div className="card w-full bg-white card-sm shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200 hover:cursor-pointer">
            <NavLink to={`/Project?title=${projet ? projet.title : "Projet inconnu"}&doc=${documentation.title}`}>
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
            </NavLink >
        </div>
    )
}

export default ActualityCard