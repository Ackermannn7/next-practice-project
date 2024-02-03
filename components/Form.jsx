import { Link } from "@navigation";
import { useLocale, useTranslations } from "next-intl";
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const locale = useLocale();
  const t = useTranslations("form");
  const buttonTranslation = t("create_type");
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {type} {t("prompt")}
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        {locale === "ua"
          ? type === buttonTranslation
            ? t("create")
            : t("edit")
          : type}
        {t("description")}
      </p>

      <form
        onSubmit={handleSubmit}
        className="my-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-200">
            {t("prompt_label")}
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder={t("prompt_placeholder")}
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-200">
            {t("prompt_tag")}{" "}
            <span className="font-normal">{t("tag_examples")}</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 dark:text-gray-200 text-sm">
            {t("cancel_btn")}
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-[#2F6E4E] rounded-full text-white"
          >
            {submitting
              ? type === buttonTranslation
                ? t("created_prompt")
                : t("edited_prompt")
              : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
