import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {
  NotFound,
  QuotesList,
  Home,
  TotalAssets,
  MyStocks,
  MyBalance,
  Datas,
  Register,
  Login,
  Profile,
  EditProfile,
  Settings,
  News,
  Ranking,
  Chat,
  StockTest,
  SearchingPage,
  StockDetail,
  Alert,
} from "./pages";
import { PublicRoute, ProtectedRoute } from "./components/routes";
import TwelveData from "./pages/Stock/TwelveData";

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
            path: "/edit-profile",
            element: <EditProfile />,
          },
          {
            path: "/total-assets",
            element: <TotalAssets />,
          },
          {
            path: "/my-stocks",
            element: <MyStocks />,
          },
          {
            path: "/my-balance",
            element: <MyBalance />,
          },
          {
            path: "/chat",
            element: <Chat />,
          },
          {
            path: "/alert",
            element: <Alert />,
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
        path: "/stock/:id",
        element: <StockDetail />,
      },
      {
        path: "/datas",
        element: <Datas />,
      },
      {
        path: "/searching/page",
        element: <SearchingPage />,
      },
      {
        path: "/stock/test",
        element: <StockTest />,
      },
      {
        path: "/twelvedata",
        element: <TwelveData />,
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
