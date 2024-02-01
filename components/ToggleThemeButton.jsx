import React from "react";
import Image from "next/image";
const ToggleThemeButton = ({ currentTheme, setTheme }) => {
  return (
    <div className="flex justify-center">
      {currentTheme === "dark" ? (
        <button
          className="flex items-center justify-center bg-black-700 hover:bg-black rounded-full border-[#eaeaea] border-[3px] w-[37px] h-[37px]"
          onClick={() => setTheme("light")}
        >
          <Image
            src="/assets/images/sun.svg"
            alt="logo"
            height={25}
            width={25}
          />
        </button>
      ) : (
        <button
          className="flex items-center justify-center bg-gray-100 rounded-full border-[#121212] border-[3px] hover:bg-gray-300 w-[37px] h-[37px]"
          onClick={() => setTheme("dark")}
        >
          <Image
            src="/assets/images/moon.svg"
            alt="logo"
            height={25}
            width={25}
          />
        </button>
      )}
    </div>
  );
};

export default ToggleThemeButton;
