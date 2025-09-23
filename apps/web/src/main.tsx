import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@web/components/ui/theme-provider';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();
const router = createRouter({ routeTree, context: { queryClient } });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const rootElement = document.getElementById('root');

if (rootElement && !rootElement.innerHTML) {
    createRoot(rootElement).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    defaultTheme="dark"
                    storageKey="vite-ui-theme"
                >
                    <RouterProvider router={router} />
                </ThemeProvider>
            </QueryClientProvider>
        </StrictMode>
    );
}
