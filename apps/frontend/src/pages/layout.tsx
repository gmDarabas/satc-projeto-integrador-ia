import { AvatarIcon } from "@radix-ui/react-icons";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-[#f7f7f7] h-[100vh]">
      <nav className="p-2 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center pl-4">
            <img src="./Frame.svg" className="max-h-[36px]" />
          </div>
          <div className="flex items-center">
            <button className="focus:outline-none">
              <AvatarIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </nav>
      <div className="px-8 py-4">
        <Outlet />
      </div>
    </div>
  );
}
