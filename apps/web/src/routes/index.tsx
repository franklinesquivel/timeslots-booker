import { createFileRoute } from '@tanstack/react-router';
import { AlertTriangle, X } from 'react-feather';
import { Alert, AlertDescription, AlertTitle } from '@web/components/ui/alert.tsx';
import { Button } from '@web/components/ui/button.tsx';
import { authStore } from '@web/stores/auth.store.ts';

export const Route = createFileRoute('/')({
    component: Index
});

function Index() {
    const { error, clearError } = authStore();

    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>

            {error && (
                <Alert
                    className="flex items-center justify-between"
                    variant="destructive"
                >
                    <div className="flex items-center">
                        <AlertTriangle className="mr-2" />
                        <div>
                            <AlertTitle>Authentication Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </div>
                    </div>

                    <Button
                        size="icon"
                        variant="destructive"
                        onClick={clearError}
                    >
                        <X />
                    </Button>
                </Alert>
            )}
        </div>
    );
}
