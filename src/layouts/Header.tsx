import {BiWorld} from "react-icons/bi";

export const Header = () => {
  return (
    <header className="flex justify-center items-center py-4">
      <h1 className="text-[26px] font-bold text-gray-800">
        ExploreNati
        <BiWorld className="inline-block text-center" />n
      </h1>
    </header>
  );
};
