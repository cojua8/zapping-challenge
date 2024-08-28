import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Player from "./pages/Player";
import Signup from "./pages/Signup";

const MainRouter = () => {
  return <RouterProvider router={router} />;
};

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/player", element: <Player /> },
]);

export default MainRouter;
