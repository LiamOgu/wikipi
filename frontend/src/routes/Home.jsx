import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import MainWelcomeCard from "../components/MainWelcomeCard"
import ActualitySection from "../components/ActualitySection"
import DocumentCreation from "../components/DocumentCreation"
import ProjetCreation from "../components/ProjetCreation"
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const fetchUser = async () => {
    let response;

    try {
      const token = localStorage.getItem('token')

      response = await axios.get('http://localhost:3000/auth/home', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (response.status !== 201) {
        navigate("/login")
        return
      }

    } catch (err) {
      navigate("/login")
      console.log(err)
      return
    }

    console.log(response.data)
  }

  useEffect(() => {
    fetchUser()
  },)

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