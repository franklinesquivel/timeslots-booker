import { useNavigate } from '@tanstack/react-router';
import { Lock, LogOut } from 'react-feather';
import { Button } from '@web/components/ui/button.tsx';
import { authStore } from '@web/stores/auth.store.ts';
import type { User } from '@web/types/user.ts';
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
                {!user.allowedGoogleCalendarAccess && (
                    <Button
                        className="rounded-full"
                        size="icon"
                        variant="ghost"
                    >
                        <Lock />
                    </Button>
                )}

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
