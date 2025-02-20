import { Outlet } from "react-router-dom";
import { BottomNavbar, Footer, TopNavbar } from "./components/Layout";
import { OutletWrapper } from "./components/wrapper";

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
