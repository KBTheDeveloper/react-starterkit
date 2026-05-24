import { Select } from "antd";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English" },
  { code: "ru", label: " Русский" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      defaultValue={i18n.language}
      onChange={handleChange}
      style={{ width: 120 }}
      options={languages.map((lang) => ({
        value: lang.code,
        label: lang.label,
      }))}
    />
  );
};

export default LanguageSwitcher;
