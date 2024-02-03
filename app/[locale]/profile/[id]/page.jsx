"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import { useLocale, useTranslations } from "next-intl";

const UserProfile = ({ params }) => {
  const t = useTranslations("other_profilepage");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPosts, setUserPosts] = useState([]);
  const username = userPosts.length > 0 ? userPosts[0].creator.username : null;
  console.log(username);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    username && (
      <Profile
        name={username}
        desc={
          t("description_1_start") +
          `${username}` +
          `${locale === "en" ? t("description_other_profile") : ""}` +
          `${locale === "en" ? t("description_1_end") : ". "}` +
          t("description_2_start_other") +
          `${
            locale === "en" ? username + t("description_other_profile") : ""
          }` +
          t("description_2_end")
        }
        data={userPosts}
      />
    )
  );
};

export default UserProfile;
