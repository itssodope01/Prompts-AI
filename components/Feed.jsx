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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/prompt");
        const data = await res.json();
        setPosts(data);

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
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setLoading(false);
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
    const newFilteredPosts = posts.filter((post) =>
      post.tag.toLowerCase().includes(tag.toLowerCase())
    );
    setSearchText(tag);
    setFilteredPosts(newFilteredPosts);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-12 h-12 border-4 border-slate-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

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
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
            handleSearchChange(e);
          }}
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
