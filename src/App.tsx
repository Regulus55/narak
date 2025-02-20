import { Outlet } from "react-router-dom";
import {
  BottomNavbar,
  Footer,
  Navbar,
  SideNavbar,
  TopNavbar,
} from "./components/Layout";
import OutletWrapper from "./components/wrapper/OutletWrapper";

const App = () => {
  return (
    <>
      <TopNavbar />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
      <Footer />
      <BottomNavbar />
    </>
  );
};

export default App;
