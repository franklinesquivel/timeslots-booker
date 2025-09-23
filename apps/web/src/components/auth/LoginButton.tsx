import GoogleIcon from '@web/assets/google-icon.svg?react';
import { Button } from '@web/components/ui/button.tsx';

export const LoginButton = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    return (
        <Button
            asChild
            size="lg"
            variant="secondary"
        >
            <a href={`${apiUrl}/auth/google`}>
                <GoogleIcon />
                Login with Google
            </a>
        </Button>
    );
};
