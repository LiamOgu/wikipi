import Navbar from "./components/Navbar"
import Profile from "./components/Profile"

function App() {
  return (
    <div>
      <header className="flex justify-between">
        <Navbar/>
        <Profile/>
      </header>
      
    </div>
  )
}

export default App
