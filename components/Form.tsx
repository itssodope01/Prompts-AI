import React from "react";
import Link from "next/link";

interface FormProps {
  type: string;
  post: {
    prompt: string;
    tag: string;
  };
  setPost: React.Dispatch<
    React.SetStateAction<{
      prompt: string;
      tag: string;
    }>
  >;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  const MAX_WORDS = 100;
  const MAX_TAGS = 4;

  const handleTagChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let tags = e.target.value.trim();
    let tagsArray = tags.split(" ").filter((tag) => tag.trim().length > 0);

    tagsArray = tagsArray.map((tag) => {
      if (!tag.startsWith("#")) {
        return `#${tag}`;
      }
      return tag;
    });

    tagsArray = tagsArray.filter((tag) => tag.length > 1);

    tags = tagsArray.join(" ");

    setPost({ ...post, tag: tags });
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key, currentTarget } = e;

    if (key === " " || key === "Enter" || key === "Tab" || key === ",") {
      e.preventDefault();

      let tags = currentTarget.value.trim();
      let tagArray = tags.split(" ");

      if (tagArray.length >= MAX_TAGS) {
        return;
      }

      setPost({ ...post, tag: `${tags} #` });
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value.split(/\s+/).filter((word) => word.length > 0);
    if (words.length <= MAX_WORDS) {
      setPost({ ...post, prompt: e.target.value });
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tagsArray = post.tag.split(" ");

    const cleanedTags = tagsArray.filter((tag) => tag.length > 1);

    const cleanedTagsString = cleanedTags.map((tag) => `${tag}`).join(" ");

    setPost({ ...post, tag: cleanedTagsString });

    handleSubmit(e);
  };

  return (
    <section className="w-full max-w-full flex-start flex-col mb-10 sm:mb-0">
      <h1 className="head_text text-left orange_gradient">{type} Post</h1>
      <p className="desc text-left max-w-md">
        Share amazing Prompts with the world, and let your imagination run wild
        with any AI-Powered platform.
      </p>

      <form
        onSubmit={handleSubmitForm}
        className="w-full max-w-2xl mt-6 sm:mt-10 flex flex-col gap-8 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base">
            Your AI Prompt
          </span>
          <textarea
            className="form_textarea"
            value={post.prompt}
            onChange={handlePromptChange}
            placeholder="Write your prompt here..."
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base">Tags</span>
          <textarea
            className="form_input"
            value={post.tag}
            onChange={handleTagChange}
            onKeyDown={handleTagKeyPress}
            placeholder="#product #design #ai"
            required
          />
        </label>
        <div className="flex mx-3 mb-2 gap-4 items-center w-auto self-end">
          <Link href="/" className="text-gray-200 text-base">
            Back
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary-orange rounded-full text-white text-center px-4 py-1.5"
          >
            {submitting
              ? `${type === "edit" ? "edit" : "create"}ing`
              : `${type}`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
