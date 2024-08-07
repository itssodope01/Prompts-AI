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
import { useEffect, useState, useRef } from "react";
import { BuiltInProviderType } from "next-auth/providers/index";
import MobileNavigation from "./MobileNavigation";

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
    <nav className="w-[100vw] sticky-nav py-4 mt-8 flex justify-center">
      <div className="flex-between md:w-8/12 w-10/12 self-center">
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
        <div className="md:flex hidden">
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
                      Sign In
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* mobile-navigation */}
        <MobileNavigation
          isUserLoggedIn={isUserLoggedIn}
          userImage={userImage}
          providers={providers}
        />
      </div>
    </nav>
  );
};

export default Nav;
