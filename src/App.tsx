import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components/Layout";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
