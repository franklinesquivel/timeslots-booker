import { Avatar, AvatarFallback, AvatarImage } from '@web/components/ui/avatar.tsx';
import type { User } from '@web/types/user.ts';

export const UserCard = ({ user }: { readonly user: User }) => {
    return (
        <div>
            <div>{user.name}</div>

            <Avatar>
                <AvatarImage src={user.picture} />
                <AvatarFallback>
                    {user.name
                        .split(' ')
                        .map(w => w[0])
                        .join('')}
                </AvatarFallback>
            </Avatar>
        </div>
    );
};
