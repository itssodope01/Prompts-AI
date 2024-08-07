"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Copy from "@/public/assets/icons/copy.svg";
import Tick from "@/public/assets/icons/tick.svg";

interface PromptCardProps {
  post: {
    _id: string;
    prompt: string;
    tag: string;
    creator: {
      _id: string;
      username: string;
      email: string;
      image: string;
    };
  };
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: Object) => void;
  handleDelete?: (post: Object) => void;
}

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) => {
  const [copied, setCopied] = useState(false);

  const { data: session } = useSession();
  const pathname = usePathname();

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 900);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-4">
        <div className="flex justify-start items-center flex-1 gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
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
      <p
        className="text-sm font-inter orange_gradient cursor-pointer"
        onClick={() => {
          handleTagClick && handleTagClick(post.tag);
        }}
      >
        {post.tag}
      </p>
      {session?.user?.id === post.creator._id && pathname === "/profile" && (
        <div className="flex gap-2 mt-2">
          <p
            className="font-inter text-sm cursor-pointer"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm cursor-pointer"
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
