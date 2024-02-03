"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@navigation";
import Form from "@components/Form";
import { useTranslations } from "next-intl";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const t = useTranslations("form");
  const [post, setPost] = useState({ prompt: "", tag: [] });
  const [submitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      const existingTags = data.tag.join(" ");
      setPost({
        prompt: data.prompt,
        tag: existingTags,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");
    const tagsWithHash = post.tag
      .split(" ")
      .filter(Boolean)
      .map((tag) => (tag.includes("#") ? tag : `#${tag}`));
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: tagsWithHash,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type={t("edit_type")}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
