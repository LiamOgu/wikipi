import logoWikipi from '../assets/Logo_wikiPi.png'
import defaultUser from '../assets/default-user-icon.wepb'

const Navbar = () => {
  return (
    <div>
      <div>
        <img src={logoWikipi} class="h-12 me-3" alt="Wikipi Logo"></img>
      </div>
      <div>
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={defaultUser} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar