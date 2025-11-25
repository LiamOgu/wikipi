import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import MainWelcomeCard from "../components/MainWelcomeCard"
import ActualitySection from "../components/ActualitySection"
import DocumentCreation from "../components/DocumentCreation"
import ProjetCreation from "../components/ProjetCreation"

const Home = () => {
  return (
    <Sidebar>
      <header >
        <Navbar />
      </header>
      <main>
        <MainWelcomeCard />
        <ActualitySection />
        <DocumentCreation />
        <ProjetCreation />
      </main>
    </Sidebar >
  )
}

export default Home