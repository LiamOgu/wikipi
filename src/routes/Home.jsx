import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import MainWelcomeCard from "../components/MainWelcomeCard"
import ActualitySection from "../components/ActualitySection"
import DocumentCreation from '../components/DocumentCreation';

const Home = () => {
  return (
    <Sidebar>
      <header >
        <Navbar />
      </header>
      <main>
        <DocumentCreation />
      </main>
    </Sidebar >
  )
}

export default Home