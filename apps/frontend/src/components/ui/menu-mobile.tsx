import { PersonIcon, HomeIcon, InfoCircledIcon } from "@radix-ui/react-icons";

export const Menu = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full md:w-auto md:h-full md:flex md:flex-col mt-3 bg-gray-800 text-white">
      <div className="flex h-full justify-between justify-items-stretch md:flex-col">
        <PersonIcon className="flex-1 size-12 py-2 md:py-4 md:px-6 hover:bg-gray-700" />

        <HomeIcon className="flex-1 size-12 py-2 md:py-4 md:px-6 hover:bg-gray-700" />

        <InfoCircledIcon className="flex-1 size-12 py-2 md:py-4 md:px-6 hover:bg-gray-700" />
      </div>
    </div>
  );
};
