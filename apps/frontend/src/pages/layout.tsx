import { AvatarIcon } from "@radix-ui/react-icons";
import { Outlet } from "react-router-dom";

export default function Layout() {
  console.log("dasoidudadsssssssssssssssiasbhdui8");

  return (
    <div className="bg-background h-[100vh]">
      <nav className="p-2 mb-2">
        <div className="flex justify-between items-center">
          <img src="./Frame.svg" className="text-center flex-1 max-h-[36px]" />
          {/* <h1 className="text-xl font-bold text-center flex-1">PetCare</h1> */}
          <div className="flex items-center">
            {/* Ícone de usuário */}
            <button className="focus:outline-none">
              <AvatarIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
