import user from '../../assets/default-user-icon.webp';
import { NavLink } from 'react-router-dom';

const DocumentCard = ({ documentation }) => {
    // Tronquer le texte pour l'affichage
    const truncateText = (text, maxLength = 100) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const {
        id,
        title,
        excerpt,
        content,
        project_title,
        author_name,
        author_avatar,
        project_id
    } = documentation;

    return (
        <div className="card bg-base-100 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 hover:cursor-pointer border border-gray-100">
            <NavLink to={`/project/${project_id}/documentation/${id}`}>
                <div className="card-body">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm">
                            {project_title}
                        </span>

                    </div>

                    <h2 className="card-title text-lg font-bold line-clamp-2">
                        {title}
                    </h2>

                    <p className="text-gray-600 text-sm line-clamp-3">
                        {excerpt || truncateText(content, 150)}
                    </p>

                    <div className="flex items-center gap-3 mt-4 pt-4">
                        <div className="avatar">
                            <div className="w-10 h-10 rounded-full">
                                <img
                                    src={author_avatar || user}
                                    alt={author_name}
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="font-medium text-sm">{author_name}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(documentation.created_at).toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    );
};

export default DocumentCard;