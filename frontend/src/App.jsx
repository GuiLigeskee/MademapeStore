import { Outlet } from "react-router-dom";
import "./App.css";

// Components
import Footer from "./components/Footer/Footer";
import Navbar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
