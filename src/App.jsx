import Navbar from "./components/Navbar"
import Profile from "./components/Profile"
import Sidebar from "./components/Sidebar"
import MainWelcomeCard from "./components/MainWelcomeCard"
function App() {
  return (
    <div>
      <header className="flex justify-between">
        <Navbar/>
        <Profile/>
        <MainWelcomeCard/>
      </header>
      <Sidebar/>
       
    </div>
  )
}

export default App
