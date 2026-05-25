import { ReactNode } from "react";

import { ConfigProvider } from "antd";
import { Locale } from "antd/lib/locale";
import enUS from "antd/locale/en_US";
import esES from "antd/locale/es_ES";
import frFR from "antd/locale/fr_FR";
import { useTranslation } from "react-i18next";

const locales: Record<string, Locale> = {
  en: enUS,
  es: esES,
  fr: frFR,
};

const AntdProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const locale = locales[i18n.language] || enUS;
  return <ConfigProvider locale={locale}>{children}</ConfigProvider>;
};

export default AntdProvider;
