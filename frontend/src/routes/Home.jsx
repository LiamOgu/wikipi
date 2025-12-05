import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import MainWelcomeCard from "../components/MainWelcomeCard"
import ActualitySection from "../components/ActualitySection"
import DocumentCreation from "../components/DocumentCreation"
import ProjetCreation from "../components/ProjetCreation"
import { useAuthProtection } from "../hooks/useAuth"

const Home = () => {
  const { loading } = useAuthProtection()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  return (
    <Sidebar>
      <header >
        <Navbar />
      </header>
      <main>
        <div className="border m-6 mt-26 rounded-xl border-dashed border-gray-300 bg-white">
          <MainWelcomeCard />
          <ActualitySection />
        </div>
        <DocumentCreation />
        <ProjetCreation />
      </main>
    </Sidebar >
  )
}

export default Home