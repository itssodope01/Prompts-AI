import React, { useState, useRef, useEffect } from "react";
import { Menu, X, User, PlusCircle, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

const MobileNavigation = ({ isUserLoggedIn, userImage, providers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="md:hidden relative" id="mobileNAV">
      {isUserLoggedIn ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-52 bg-zinc-800 rounded-md shadow-lg py-1 z-10"
        >
          {isUserLoggedIn ? (
            <>
              <div className="px-4 py-2 border-b border-gray-500">
                <Link href="/profile" onClick={() => setIsOpen(false)}>
                  <Image
                    src={userImage || "/assets/images/logo.svg"}
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-full mx-auto"
                  />
                </Link>
              </div>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <User className="inline-block mr-2" size={16} /> My Profile
              </Link>
              <Link
                href="/create-prompt"
                className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <PlusCircle className="inline-block mr-2" size={16} /> Create
                Prompt
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                <LogOut className="inline-block mr-2" size={16} /> Sign Out
              </button>
            </>
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
      )}
    </div>
  );
};

export default MobileNavigation;
