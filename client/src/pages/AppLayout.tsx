import { Outlet } from "react-router-dom";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";

export default function AppLayout() {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
}