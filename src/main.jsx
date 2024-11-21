
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StartNewGamePage from "./pages/StartNewGamePage.jsx";
import GamePage from "./pages/GamePage.jsx";
import { GameProvider } from "./components/GameContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartNewGamePage />,
  },

  {
    path: "game",
    element: <GamePage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <GameProvider>
    <RouterProvider router={router} />
  </GameProvider>
);
