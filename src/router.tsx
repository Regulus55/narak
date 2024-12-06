import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {
  NotFound,
  QuotesList,
  Home,
  Datas,
  Register,
  Login,
  Profile,
} from "./pages";
import PublicRoute from "./components/routes/PublicRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // 비로그인 시 가능
      // {
      //   element: <PublicRoute />,
      //   children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      //   ],
      // },

      // 로그인 이후 가능
      // {
      //   element: <ProtectedRoute />,
      //   children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      //   ],
      // },

      // 일반
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/datas",
        element: <Datas />,
      },
      {
        path: "/quotes",
        element: <QuotesList />,
      },
    ],
  },
]);

export default router;
