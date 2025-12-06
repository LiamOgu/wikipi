// src/routes/Home.jsx
import AppLayout from "../components/Layout/AppLayout"
import WelcomeHero from "../components/Layout/WelcomeHero"
import DocumentListSection from "../components/Documents/DocumentListSection"
import DocumentCreationModal from "../components/Documents/DocumentCreationModal"
import ProjectCreationModal from "../components/Projects/ProjectCreationModal"
import { useAuthProtection } from "../hooks/useAuthProtection"

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
    <AppLayout>
      <main>
        <div className="border m-6 mt-26 rounded-xl border-dashed border-gray-300 bg-white">
          <WelcomeHero />
          <DocumentListSection />
        </div>
        <DocumentCreationModal />
        <ProjectCreationModal />
      </main>
    </AppLayout>
  )
}

export default Home