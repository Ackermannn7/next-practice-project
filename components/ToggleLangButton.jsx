import Image from "next/image";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
const ToggleLangButton = () => {
  const pathname = usePathname();
  const redirectedPathName = (locale) => {
    if (!pathname) {
      return "/";
    }
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };
  const currentLocale = useLocale();
  const router = useRouter();

  const toggleLanguage = (newLocale) => {
    router.replace(redirectedPathName(newLocale), { locale: newLocale });
  };
  return (
    <div className="flex justify-center">
      {currentLocale === "ua" ? (
        <button
          className="flex items-center justify-center bg-black-700 hover:bg-black rounded-full border-[#eaeaea] border-[3px] w-[37px] h-[37px]"
          onClick={() => toggleLanguage("en")}
        >
          <Image
            src="/assets/images/lang/UA.png"
            alt="lang"
            height={28}
            width={28}
          />
        </button>
      ) : (
        <button
          value={"en"}
          className="flex items-center justify-center bg-gray-100 rounded-full border-[#121212] border-[3px] hover:bg-gray-300 w-[37px] h-[37px]"
          onClick={() => toggleLanguage("ua")}
        >
          <Image
            src="/assets/images/lang/ENG.png"
            alt="lang"
            height={28}
            width={28}
          />
        </button>
      )}
    </div>
  );
};

export default ToggleLangButton;
