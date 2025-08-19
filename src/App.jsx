import Navbar from "./components/Navbar";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Footer from "./components/Footer";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          {/* shows on every page */}
          <Navbar />
          <Outlet />
          <Footer/>
        </>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/coin/:coinId",
          element: <Coin />,
        },
      ],
    },
  ]);

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#0b004e] via-[#1d152f] to-[#002834]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
