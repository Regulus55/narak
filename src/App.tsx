import { Outlet } from "react-router-dom";
import { Footer, TopNavbar } from "./components/Layout";

const App = () => {
  return (
    <>
      <TopNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
