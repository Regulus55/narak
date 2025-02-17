import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components/Layout";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-[80vh] bg-gray-100">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
