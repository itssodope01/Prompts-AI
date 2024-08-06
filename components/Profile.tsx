"use client";

import React from "react";
import Image from "next/image";
import PromptCard from "@/components/PromptCard";

interface ProfileProps {
  name: string;
  email: string;
  userImage: string;
  data: any[];
  handleEdit: (post: Object) => void;
  handleDelete: (post: Object) => void;
}

const Profile = ({
  name,
  email,
  userImage,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-full p-4">
      <h1 className="head_text text-left mb-4">
        <span className="orange_gradient">Profile</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-0 lg:gap-20 items-start lg:mt-10">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <Image
            src={userImage || "/assets/images/logo.svg"}
            alt="user"
            width={100}
            height={100}
            className="object-cover rounded-md self-start"
          />
          <h3 className="mt-4 text-2xl">{name}</h3>
          <p className="text-gray-500 text-lg">{email}</p>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4 lg:mt-0 w-full">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
