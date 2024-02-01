"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const Nav = () => {
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
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden gap-4">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
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
                  Sign In
                </button>
              ))}
          </>
        )}
        <div className="flex justify-center">
          {currentTheme === "dark" ? (
            <button
              className="flex items-center justify-center bg-black-700 hover:bg-black rounded-full border-[#FF5722] border-2 w-[37px] h-[37px]"
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
              className="flex items-center justify-center bg-gray-100 rounded-full border-[#FF5722] border-2 hover:bg-gray-300 w-[37px] h-[37px]"
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
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex gap-4 relative cursor-pointer">
        <div className="flex justify-center">
          {currentTheme === "dark" ? (
            <button
              className="flex items-center justify-center bg-black-700 hover:bg-black rounded-full border-purple-400 border-2 w-[37px] h-[37px]"
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
              className="flex items-center justify-center bg-gray-100 rounded-full border-purple-400 border-2 hover:bg-gray-300 w-[37px] h-[37px]"
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
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown-link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
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
                  Sign Out
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
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
