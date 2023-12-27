import {FaRegCopyright} from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center w-full text-center bottom-0 fixed h-10 bg-white">
      <FaRegCopyright size={12} />
      <p className="mx-2 text-[10px]">Tous droits réservés {currentYear}</p>
    </footer>
  );
};
