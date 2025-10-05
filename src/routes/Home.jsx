import Navbar from "../components/Navbar"
import Sidebar from "./components/Sidebar"

const Home = () => {
  return (
    <div>
      <header className="flex justify-between">
        <Navbar/>
      </header>
      <Sidebar/>
       
    </div>
  )
}

export default Home