import { Outlet } from "react-router-dom";
import "./App.css";

// Components
import Footer from "./components/footer/footer";

function App() {
  return (
    <>
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
