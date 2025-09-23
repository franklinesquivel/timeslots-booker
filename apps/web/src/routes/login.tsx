import { createFileRoute } from '@tanstack/react-router';
import { AlertTriangle, X } from 'react-feather';
import GoogleIcon from '@web/assets/google-icon.svg?react';
import { Alert, AlertDescription, AlertTitle } from '@web/components/ui/alert.tsx';
import { Button } from '@web/components/ui/button.tsx';
import { authStore } from '@web/stores/auth.store.ts';

export const Route = createFileRoute('/login')({
    component: Login
});

function Login() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { error, clearError } = authStore();

    return (
        <div
            className={`
                min-h-60 w-4/5 rounded-2xl bg-white p-5 shadow-2xl
                md:w-1/2 md:p-10
            `}
        >
            <h1
                className={`
                    text-center text-xl leading-tight font-bold
                    md:text-4xl
                `}
            >
                Welcome to Timeslots Booker
            </h1>

            {error && (
                <Alert
                    variant="destructive"
                    className={`
                        mx-auto mt-10 flex items-center justify-between
                        md:w-4/5
                    `}
                >
                    <div className="flex items-center">
                        <AlertTriangle
                            className={`
                                mr-2 hidden
                                md:block
                            `}
                        />
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

            <div className="my-5 flex items-center justify-center">
                <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className={`
                        my-5 gap-4
                        md:!p-10 md:text-2xl
                    `}
                >
                    <a href={`${apiUrl}/auth/google`}>
                        <GoogleIcon
                            className={`
                                size-5
                                md:size-10
                            `}
                        />
                        Login with Google
                    </a>
                </Button>
            </div>
        </div>
    );
}
