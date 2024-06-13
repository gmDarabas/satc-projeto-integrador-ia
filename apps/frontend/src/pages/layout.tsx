import { Outlet } from "react-router-dom";
import { Menu } from "@/components/ui/menu-bar";
import { NavBar } from "@/components/ui/nav-bar";

export default function Layout() {
  return (
    <div className="bg-[#f7f7f7] min-h-screen">
      <NavBar />

      <br />
      <br />

      <div className="px-8 py-4">
        <Outlet />
      </div>

      <br />
      <br />
      <br />

      <Menu />
    </div>
  );
}
