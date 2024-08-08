"use client";

import React, { useState, useEffect } from "react";
import Profile from "@/components/Profile";

const UserProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = params;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/users/${id}/posts`);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-12 h-12 border-4 border-slate-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  const post = posts[0];

  return (
    <Profile
      name={post.creator.name || ""}
      username={post.creator.username || ""}
      email={""}
      userImage={post.creator.image || ""}
      data={posts}
    />
  );
};

export default UserProfile;
