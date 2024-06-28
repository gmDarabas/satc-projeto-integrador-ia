import { Outlet } from "react-router-dom";
import { Menu, MenuItem } from "@/components/ui/menu-bar";
import { NavBar } from "@/components/ui/nav-bar";
import { useEffect, useState } from "react";

type Props = {
  menuItems: MenuItem[];
};

export default function Layout({ menuItems }: Props) {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-[#f7f7f7] min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-grow">
        <Menu menuItems={menuItems} bottom={isMobileView} />
        <div className="flex-grow px-12 py-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
