import { QueryProvider } from '@providers/QueryProvider';
import { I18nProvider } from '@app/providers/i18nProvider';
import { AntdProvider } from '@providers/AntdProvider';
import { RouterProvider } from '@providers/RouterProvider';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { checkAuthFx } from '@shared/lib/effector/auth';
import * as Sentry from '@sentry/react'

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
