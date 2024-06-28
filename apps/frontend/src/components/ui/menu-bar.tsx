import { useNavigate } from "react-router-dom";

export type MenuItem = {
  key: string;
  icon: JSX.Element;
  label: string;
};

type Props = {
  menuItems: MenuItem[];
  bottom?: boolean;
};

export const Menu = ({ menuItems, bottom }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white shadow-md ${bottom ? "fixed bottom-0 w-full flex justify-around py-2 md:hidden" : "hidden md:block p-4"}`}
    >
      <div className={`space-y-4 ${bottom ? "w-full flex space-y-0 justify-around" : ""}`}>
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
