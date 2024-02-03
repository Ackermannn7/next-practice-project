"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "@navigation";
import Form from "@components/Form";
import { useTranslations } from "next-intl";
const CreatePrompt = () => {
  const t = useTranslations("form");
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  // Используем map для добавления # в начало каждой строки
  const tagsWithHash = post.tag
    .split(" ")
    .filter(Boolean)
    .map((tag) => (tag.includes("#") ? tag : `#${tag}`));

  const createPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: tagsWithHash,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type={t("create_type")}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
