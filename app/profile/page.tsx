"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(`/api/users/${session.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [session?.user?.id]);

  const handleDelete = async (post) => {
    const confirmed = confirm("Are you sure you want to delete this prompt?");
    if (!confirmed) return;
    try {
      const response = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
        router.push("/profile");
      } else {
        const data = await response.json();
        console.error("Failed to delete post:", data.message);
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  return (
    <Profile
      name={session?.user?.name || ""}
      email={session?.user?.email || ""}
      userImage={session?.user?.image || ""}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
