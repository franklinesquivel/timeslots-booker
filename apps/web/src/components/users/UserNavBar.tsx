import { useNavigate } from '@tanstack/react-router';
import { LogOut } from 'react-feather';
import { Button } from '@web/components/ui/button.tsx';
import { ThemeToggle } from '@web/components/ui/theme-toggle';
import { authStore } from '@web/stores/auth.store.ts';
import type { User } from '@web/types/user.ts';
import { GoogleScopesWarningDialog } from './GoogleScopesWarningDialog.tsx';
import { UserCard } from './UserCard.tsx';

interface Props {
    readonly user: User;
}

export const UserNavBar = ({ user }: Props) => {
    const { logout } = authStore();
    const nav = useNavigate();

    const handleLogout = () => {
        logout();
        void nav({ to: '/login' });
    };

    return (
        <div
            className={`
                flex flex-col justify-between gap-6
                md:flex-row md:gap-0
            `}
        >
            <UserCard user={user} />

            <div className={`flex items-center gap-4`}>
                <ThemeToggle />
                {!user.allowedGoogleCalendarAccess && <GoogleScopesWarningDialog />}

                <Button
                    variant="secondary"
                    onClick={handleLogout}
                >
                    <LogOut />
                    Logout
                </Button>
            </div>
        </div>
    );
};
