import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { BrowserRouter } from 'react-router-dom';
import AppRoute from "./utils/AppRoute";

function App() {
  return (
    <BrowserRouter>
      <main className="w-screen min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow p-4">
          <AppRoute />
          <Footer />
        </div>
      </main>
    </BrowserRouter>
  )
}

export default App;