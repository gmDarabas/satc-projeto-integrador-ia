import { PersonIcon, HomeIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../auth-context";
import { useQueryClient } from "react-query";

export const Menu = () => {
  const navigate = useNavigate();

  const { setAuthContext } = useAuthContext();
  const queryClient = useQueryClient();

  const logout = () => {
    setAuthContext(undefined);
    queryClient.clear();
  };

  return (
    <div className="fixed bottom-0 left-0 w-full md:top-10 md:w-auto md:h-full md:flex md:flex-col mt-3 z-50 pointer-events-none bg-white">
      <div className="flex flex-row md:flex-col h-full py-2 md:py-0 md:ml-3 justify-between md:justify-start items-center md:items-start pointer-events-auto">
        <div className="flex flex-col items-center flex-1 md:flex-none py-2 md:py-4 md:px-6 hover:bg-card text-xs cursor-pointer">
          <HomeIcon onClick={() => navigate("/")} className="h-8 w-8 mb-2" />
          <span>Inicial</span>
        </div>

        <div className="flex flex-col items-center flex-1 md:flex-none py-2 md:py-4 md:px-6 hover:bg-card text-xs cursor-pointer">
          <PersonIcon onClick={logout} className="h-8 w-8 mb-2" />
          <span>Perfil</span>
        </div>
        <div className="flex flex-col items-center flex-1 md:flex-none py-2 md:py-4 md:px-6 hover:bg-card text-xs cursor-pointer">
          <InfoCircledIcon onClick={() => navigate("/")} className="h-8 w-8 mb-2" />
          <span>Info</span>
        </div>
      </div>
    </div>
  );
};
