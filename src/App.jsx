import "./App.css";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="">
        <Outlet />
      </div>
    </>
  );
}

export default App;
