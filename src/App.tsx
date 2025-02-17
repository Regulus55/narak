import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components/Layout";
import OutletWrapper from "./components/wrapper/OutletWrapper";

const App = () => {
  return (
    <>
      <Navbar />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
      <Footer />
    </>
  );
};

export default App;
