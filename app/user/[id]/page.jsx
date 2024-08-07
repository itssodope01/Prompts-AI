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
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col gap-2 sm:gap-3 max-w-[400px] mx-auto w-full">
        {[0, 1, 2].map((val) => {
          return (
            <div
              key={val}
              className={
                "rounded-full h-2 sm:h-3 orange_gradient loading " +
                `loading${val}`
              }
            ></div>
          );
        })}
      </div>
    );
  }

  if (!posts.length) {
    return <div>No posts found.</div>;
  }

  const post = posts[0];

  return (
    <Profile
      name={post.creator.name || ""}
      username={post.creator.username || ""}
      email={post.creator.email || ""}
      userImage={post.creator.image || ""}
      data={posts}
    />
  );
};

export default UserProfile;
