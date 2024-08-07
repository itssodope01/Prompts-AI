"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const searchParams = useSearchParams();
  const promptID = searchParams.get("id");

  const router = useRouter();

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch(`/api/prompt/${promptID}`);
        const data = await res.json();
        setPost({ prompt: data.prompt, tag: data.tag });
      } catch (error) {
        console.error(error);
      }
    };

    if (promptID) {
      fetchPrompt();
    }
  }, [promptID]);

  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!promptID) return alert("Prompt ID is missing");

    setSubmitting(true);

    try {
      const res = await fetch(`/api/prompt/${promptID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        setPost({
          prompt: "",
          tag: "",
        });
        router.push("/profile");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
