import { Suspense } from "react";

import "@shared/lib/i18n"; // initialization
import { Spin } from "antd";

export const I18nProvider = ({ children }: { children: React.ReactNode }) => (
  <Suspense
    fallback={
      <Spin
        size="large"
        percent="auto"
        style={{ display: "block", margin: "40vh auto" }}
      />
    }
  >
    {children}
  </Suspense>
);
