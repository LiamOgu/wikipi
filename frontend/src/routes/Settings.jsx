import NavigationBar from "../components/Layout/NavigationBar"
import SettingsPage from "../components/Settings/SettingsPage"

const Settings = () =>{
    return(
        <div>
            <NavigationBar/>
            <main className="border p-6 m-6 mt-26 rounded-xl border-dashed border-gray-300 bg-white">
                <SettingsPage/>
            </main>
        </div>
    )
}

export default Settings