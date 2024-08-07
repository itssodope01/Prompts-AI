"use client";

import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers/index";

const Nav = () => {
  const { data: session } = useSession();
  const isUserLoggedIn = !!session;
  let userImage = session?.user?.image;

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-2 pb-4 mt-8">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Prompts AI</p>
      </Link>

      {/* desktop-navigation */}

      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>
            <button
              type="button"
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile" className="rounded-full">
              <Image
                src={userImage || "/assets/images/logo.svg"}
                alt="user"
                width={40}
                height={40}
                className="object-contain rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && (
              <div className="flex gap-3 md:gap-5">
                {Object.values(providers).map((provider) => (
                  <button
                    key={provider.id}
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    SignIn
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* mobile-navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src={userImage || "/assets/images/logo.svg"}
              alt="user"
              width={40}
              height={40}
              className="object-contain rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                  className="dropdown_link mt-5 outline_btn w-full hover:text-gray-700"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && (
              <div className="flex gap-3 md:gap-5">
                {Object.values(providers).map((provider) => (
                  <button
                    key={provider.id}
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
