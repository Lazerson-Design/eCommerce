import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      {/* Navbar remains at the top */}
      <Navbar />

      {/* Main content area */}
      <main className="flex justify-center items-center p-4">
        {/* Centered container */}
        <div className="w-full max-w-4xl p-6 bg-base-100">
          {/* Outlet renders the current route's component */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
