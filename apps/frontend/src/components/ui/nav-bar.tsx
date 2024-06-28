import ArrowReturn from "./layout-return";

export function NavBar() {
  return (
    <nav className="bg-white shadow-md p-4">
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
