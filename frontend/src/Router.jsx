import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useUser } from "./contexts/userContext";
import Login from "./pages/Login";
import Player from "./pages/Player";
import Signup from "./pages/Signup";

const MainRouter = () => {
  const { user } = useUser();

  if (1 == 1) return <RouterProvider router={publicRouter} />;

  return <RouterProvider router={privateRouter} />;
};

const publicRouter = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/player", element: <Player /> },
]);

const privateRouter = createBrowserRouter([
  { path: "/player", element: <Player /> },
]);

export default MainRouter;
