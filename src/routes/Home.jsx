import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import MainWelcomeCard from "../components/MainWelcomeCard"

const Home = () => {
  return (
    <div>
      <header className="flex justify-between">
        <Navbar />
      </header>
      <Sidebar />
      <main>
        <MainWelcomeCard />
      </main>


    </div>
  )
}

export default Home