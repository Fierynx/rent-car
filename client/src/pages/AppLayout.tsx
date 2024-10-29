import { Outlet } from "react-router-dom";
import Footer from "../components/general/Footer";
import Navbar from "../components/general/Navbar";

export default function AppLayout() {
  return (
    <div className="bg-primary-pink text-primary">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
}