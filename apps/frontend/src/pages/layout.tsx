import { Outlet } from "react-router-dom";
import { Menu, MenuItem } from "@/components/ui/menu-bar";
import { NavBar } from "@/components/ui/nav-bar";

type Props = {
  menuItems: MenuItem[];
};

export default function Layout({ menuItems }: Props) {
  return (
    <div className="bg-[#f7f7f7] min-h-screen">
      <NavBar />

      <div className="px-8 py-4">
        <Outlet />
      </div>

      <Menu menuItems={menuItems} />
    </div>
  );
}
