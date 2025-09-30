import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <div>
      <header className="flex justify-between">
        <Navbar/>
      </header>
      <Sidebar/>
       
    </div>
  )
}

export default App
