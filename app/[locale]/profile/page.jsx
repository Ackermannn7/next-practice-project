"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "@navigation";

import Profile from "@components/Profile";
import { useTranslations } from "next-intl";

const MyProfile = () => {
  const t = useTranslations("profilepage");
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={t("name")}
      desc={
        t("description_1_start") +
        t("description_my_profile") +
        t("description_1_end") +
        t("description_2_start_my") +
        t("description_2_end")
      }
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
