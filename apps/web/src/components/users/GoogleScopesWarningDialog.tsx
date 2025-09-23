import { useNavigate } from '@tanstack/react-router';
import { AlertTriangle } from 'react-feather';
import { ConfirmDialogContent } from '@web/components/ui/ConfirmDialogContent';
import { AlertDialog, AlertDialogTrigger } from '@web/components/ui/alert-dialog';
import { Button } from '@web/components/ui/button';
import { authStore } from '@web/stores/auth.store';

export const GoogleScopesWarningDialog = () => {
    const { logout } = authStore();
    const nav = useNavigate();

    const handleConfirm = () => {
        window.open('https://myaccount.google.com/connections', '_blank');
        logout();
        void nav({ to: '/login' });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className="rounded-full"
                    size="icon"
                    variant="warning"
                >
                    <AlertTriangle />
                </Button>
            </AlertDialogTrigger>
            <ConfirmDialogContent
                description="Our application requires full access to your Google Calendar to check for conflicts and schedule bookings. To fix this, please remove the app's access from your Google account, then log in again to grant the correct permissions."
                isPending={false}
                title="Google Calendar Permissions Needed"
                onConfirm={handleConfirm}
            />
        </AlertDialog>
    );
};
