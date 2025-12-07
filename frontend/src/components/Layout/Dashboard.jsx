const Dashboard = ({ data }) => {
  console.log(data.stats);
  console.log(data.users);

  return (
    <div>
      <h1>
        Dashboard
      </h1>
      <div>
        Statistiques:
        <ul>
          <li>Nombre d'utilisateurs: {data.stats.users}</li>
          <li>Nombre de projets: {data.stats.projects}</li>
          <li>Nombre de documents: {data.stats.documents}</li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard