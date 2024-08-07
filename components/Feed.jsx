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
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/prompt");
        const data = await res.json();
        setPosts(data);

        // Access sessionStorage only on the client side
        if (typeof window !== "undefined") {
          const storedProfTagRef = sessionStorage.getItem("profTagRef") || "";
          if (storedProfTagRef) {
            const initialFilteredPosts = data.filter((post) =>
              post.tag.toLowerCase().includes(storedProfTagRef.toLowerCase())
            );
            setFilteredPosts(initialFilteredPosts);
            setSearchText(storedProfTagRef);
            sessionStorage.removeItem("profTagRef");
          }
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    const formattedSearchText = searchText.toLowerCase();
    setSearchText(searchText);
    if (searchText === "") {
      setFilteredPosts([]);
      return;
    }
    try {
      const newFilteredPosts = posts.filter(
        (post) =>
          post.prompt.toLowerCase().includes(formattedSearchText) ||
          post.tag.toLowerCase().includes(formattedSearchText) ||
          post.creator.name.toLowerCase().includes(formattedSearchText) ||
          post.creator.username.toLowerCase().includes(formattedSearchText)
      );
      setFilteredPosts(newFilteredPosts);
    } catch (error) {
      console.error("Failed to search for posts:", error);
    }
  };

  const handleTagClick = (tag) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("profTagRef", tag);
    }
    const newFilteredPosts = posts.filter((post) =>
      post.tag.toLowerCase().includes(tag.toLowerCase())
    );
    setSearchText(tag);
    setFilteredPosts(newFilteredPosts);
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
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
