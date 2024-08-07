"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-2 sm:mt-12 prompt_layout w-full sm:w-auto">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    // Fetch
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/prompt");
        const data = await res.json();
        setPosts(data); // Ensure posts is an array
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());

    try {
      // Create a Set to ensure all posts are unique
      const filteredPostsSet = new Set();

      // Filter posts based on the search text matching prompt, tag, creator's name, or username
      posts.forEach((post) => {
        const searchText = e.target.value.toLowerCase();
        if (
          post.prompt.toLowerCase().includes(searchText) ||
          post.tag.toLowerCase().includes(searchText) ||
          post.creator.name.toLowerCase().includes(searchText) ||
          post.creator.username.toLowerCase().includes(searchText)
        ) {
          filteredPostsSet.add(post);
        }
      });

      // Convert Set back to an array and update the state
      setFilteredPosts(Array.from(filteredPostsSet));
    } catch (error) {
      console.error("Failed to search for posts:", error);
    }

    if (e.target.value === "") {
      setFilteredPosts([]);
    }
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="What's on your mind?"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PromptCardList
        data={filteredPosts.length > 0 ? filteredPosts : posts}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
