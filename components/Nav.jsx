"use client";
import { Link } from "@navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "@navigation";
import { useTheme } from "next-themes";
import ToggleThemeButton from "./ToggleThemeButton";
import ToggleLangButton from "./ToggleLangButton";
import { useTranslations } from "next-intl";

const Nav = () => {
  const t = useTranslations("nav");
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center rounded-full">
        <Image
          src={
            currentTheme === "dark"
              ? "/assets/images/logo-dark.svg"
              : "/assets/images/logo.svg"
          }
          alt="Prompts for All Logo"
          width={37}
          height={37}
          className="object-contain"
        />
        <p className="logo_text">Prompts for All</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden gap-4">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              {t("create_btn")}
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              {t("logout_btn")}
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  {t("signin_btn")}
                </button>
              ))}
          </>
        )}
        <ToggleThemeButton currentTheme={currentTheme} setTheme={setTheme} />
        <ToggleLangButton />
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex gap-4 relative cursor-pointer">
        <ToggleLangButton />
        <ToggleThemeButton currentTheme={currentTheme} setTheme={setTheme} />

        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="Profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown-link"
                  onClick={() => setToggleDropdown(false)}
                >
                  {t("profile_btn")}
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown-link"
                  onClick={() => setToggleDropdown(false)}
                >
                  {t("create_btn")}
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                    router.push("/");
                  }}
                >
                  {t("logout_btn")}
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  {t("signin_btn")}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
