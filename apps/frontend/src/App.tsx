import { useEffect } from "react";

import * as Sentry from "@sentry/react";
import { useUnit } from "effector-react";

import I18nProvider from "@app/providers/i18nProvider";
import AntdProvider from "@providers/AntdProvider";
import QueryProvider from "@providers/QueryProvider";
import RouterProvider from "@providers/RouterProvider";
import { checkAuthFx } from "@shared/lib/effector/auth";

function App() {
  const checkAuth = useUnit(checkAuthFx);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Sentry.ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryProvider>
        <I18nProvider>
          <AntdProvider>
            <RouterProvider />
          </AntdProvider>
        </I18nProvider>
      </QueryProvider>
    </Sentry.ErrorBoundary>
  );
}

export default App;
