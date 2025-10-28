import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import MainWelcomeCard from "../components/MainWelcomeCard"

const Home = () => {
  return (
    <Sidebar>
      <header >
        <Navbar />
      </header>
      <main>
        <MainWelcomeCard />
      </main>
    </Sidebar >
  )
}

export default Home