const Dashboard = ({ usersList, stats }) => {
  console.log("stats : ", stats);
  console.log("users : ", usersList);


  return (
    <div>
      <h1>
        Dashboard
      </h1>
      <div>
        Statistiques:
        <ul>
          <li>Nombre d'utilisateurs: {stats.stats.users}</li>
          <li>Nombre de projets: {stats.stats.projects}</li>
          <li>Nombre de documents: {stats.stats.documents}</li>
        </ul>
        <button>Voir les utilisateurs</button>
        <button>Voir les projets/documents</button>
      </div>
    </div>
  )
}

export default Dashboard