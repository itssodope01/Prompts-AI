"use client";

import React from "react";
import Image from "next/image";
import PromptCard from "@/components/PromptCard";

const Profile = ({
  name,
  username,
  email,
  userImage,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full p-4">
      <h1 className="head_text text-left mb-4">
        <span className="orange_gradient">Profile</span>
      </h1>

      <div className="flex flex-col md:flex-row gap-0 md:gap-20 items-start md:mt-10">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <Image
            src={userImage || "/assets/images/logo.svg"}
            alt="user"
            width={100}
            height={100}
            className="object-cover rounded-md self-start"
          />
          <h3 className="mt-4 text-2xl self-start ">{name}</h3>
          <p className="text-gray-500 text-lg flex self-start flex-col">
            <span className="flex self-start">@{username}</span>
            {email && <span>{email}</span>}
          </p>
        </div>

        <div className="prompt_layout_profile w-full">
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
