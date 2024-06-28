import ArrowReturn from "./layout-return";

export function NavBar() {
  return (
    <nav className="top-0 left-0 w-full p-2 bg-white">
      <div className="flex px-2 md:px-6 justify-between items-center">
        <div className="flex items-center">
          <ArrowReturn />
        </div>

        <div className="flex items-center pl-4">
          <img src="./Frame.svg" className="max-h-[36px]" />
        </div>

        <div className="px-7"></div>
      </div>
    </nav>
  );
}
