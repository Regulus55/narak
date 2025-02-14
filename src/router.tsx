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
  EditProfile,
  Settings,
  News,
  Ranking,
  Chat,
} from "./pages";
import { PublicRoute, ProtectedRoute } from "./components/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // 비로그인 시 가능
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },

      // 로그인 이후 가능
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/profile/edit",
            element: <EditProfile />,
          },
          {
            path: "/chat",
            element: <Chat />,
          },
        ],
      },

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
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/ranking",
        element: <Ranking />,
      },
      {
        path: "/quotes",
        element: <QuotesList />,
      },
    ],
  },
]);

export default router;
