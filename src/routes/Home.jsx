import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import MainWelcomeCard from "../components/MainWelcomeCard"
import ActualitySection from "../components/ActualitySection"

const Home = () => {
  return (
    <Sidebar>
      <header >
        <Navbar />
      </header>
      <main>
        <MainWelcomeCard />
        <ActualitySection />
      </main>
    </Sidebar >
  )
}

export default Home