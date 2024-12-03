import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { NotFound, QuotesList, Home, Datas } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/quotes",
        element: <QuotesList />,
      },
      {
        path: "/datas",
        element: <Datas />,
      },
    ],
  },
]);

export default router;
