import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import esES from 'antd/locale/es_ES';
import frFR from 'antd/locale/fr_FR';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

const locales: Record<string, any> = { en: enUS, es: esES, fr: frFR };

export const AntdProvider = ({ children }: { children: ReactNode }) => {
    const { i18n } = useTranslation();
    const locale = locales[i18n.language] || enUS;
    return <ConfigProvider locale={locale}>{children}</ConfigProvider>;
};
