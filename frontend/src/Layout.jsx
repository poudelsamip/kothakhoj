import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="sm:px-8 md:px-24 lg:px-40 xl:px-52 2xl:px-64 py-4 flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
