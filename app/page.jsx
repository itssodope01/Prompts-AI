"use client";

import Feed from "@/components/Feed";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();

    return () => {
      setPosts([]);
      setFilteredPosts([]);
      setLoading(true);
    };
  }, []);

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

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="md:hidden" />
        <span className="orange_gradient text-center"> AI Powered Prompts</span>
      </h1>

      <p className="desc text-center">
        Prompts AI is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed
        posts={posts}
        setPosts={setPosts}
        filteredPosts={filteredPosts}
        setFilteredPosts={setFilteredPosts}
        searchText={searchText}
        setSearchText={setSearchText}
        loading={loading}
        setLoading={setLoading}
      />
    </section>
  );
};

export default Home;
