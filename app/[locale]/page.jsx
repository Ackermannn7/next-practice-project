import Feed from "@components/Feed";
import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("homepage");
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        {t("title")}
        <br className="max-md:hidden" />
        <p className="green_gradient text-center">{t("subtitle")}</p>
      </h1>
      <p className="desc text-center">{t("description")}</p>
      <Feed />
    </section>
  );
};

export default Home;
