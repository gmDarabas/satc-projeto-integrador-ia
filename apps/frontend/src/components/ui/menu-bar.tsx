import { useNavigate } from "react-router-dom";

export type MenuItem = {
  key: string;
  icon: JSX.Element;
  label: string;
};

type Props = {
  menuItems: MenuItem[];
};

export const Menu = ({ menuItems }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 w-full md:top-10 md:w-auto md:h-full md:flex md:flex-col mt-3 z-50 pointer-events-none bg-white">
      <div className="flex flex-row md:flex-col h-full py-2 md:py-0 md:ml-3 justify-between md:justify-start items-center md:items-start pointer-events-auto">
        {menuItems.map((item) => (
          <div
            key={item.key}
            className="flex flex-col items-center flex-1 md:flex-none py-2 md:py-4 md:px-6 hover:bg-card text-xs cursor-pointer"
            onClick={() => navigate(item.key)}
          >
            <div>{item.icon}</div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
