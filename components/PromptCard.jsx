"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Copy from "@/public/assets/icons/copy.svg";
import Tick from "@/public/assets/icons/tick.svg";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState(false);

  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 900);
  };

  const handleUserProfileClick = () => {
    if (post?.creator?._id) {
      if (session?.user?.id === post.creator._id) {
        router.push("/profile");
        return;
      }
      router.push(`/user/${post.creator._id}`);
    }
  };

  if (!post || !post.creator) {
    return null;
  }

  const tagsArray = post.tag.split(" ");
  const clearedTagsArray = tagsArray.filter(
    (tag) => tag.startsWith("#") && tag.length > 1
  );

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-4">
        <div
          className="flex justify-start items-center flex-1 gap-3 cursor-pointer"
          onClick={handleUserProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold">
              {post.creator.name ? post.creator.name : post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.name
                ? `@${post.creator.username}`
                : post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          {copied ? (
            <Image src={Tick} alt="Checkmark" width={25} height={25} />
          ) : (
            <Image src={Copy} alt="Checkmark" width={25} height={25} />
          )}
        </div>
      </div>
      <p className="my-4 font-satoshi text-gray-100">{post.prompt}</p>
      <p className="text-sm font-inter orange_gradient cursor-pointer">
        {clearedTagsArray.map((element) => (
          <span
            key={element}
            onClick={() => {
              if (
                pathname === "/profile" ||
                pathname === `/user/${post.creator._id}`
              ) {
                sessionStorage.setItem("profTagRef", element);
                router.push(`/`);
                return;
              }
              handleTagClick && handleTagClick(element);
            }}
          >
            {element}{" "}
          </span>
        ))}
      </p>
      {session?.user?.id === post.creator._id && pathname === "/profile" && (
        <div className="flex gap-4 mt-2">
          <p
            className="font-inter text-sm cursor-pointer hover:text-blue-500"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm cursor-pointer hover:text-red-500"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
