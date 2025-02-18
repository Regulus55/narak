import { Outlet } from "react-router-dom";
import { Footer, Navbar, SideNavbar, TopNavbar } from "./components/Layout";
import OutletWrapper from "./components/wrapper/OutletWrapper";

const App = () => {
  return (
    <>
      <TopNavbar />
      <SideNavbar />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
      <Footer />
    </>
  );
};

export default App;
