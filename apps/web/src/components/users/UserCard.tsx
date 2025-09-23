import { Avatar, AvatarFallback, AvatarImage } from '@web/components/ui/avatar.tsx';
import type { User } from '@web/types/user.ts';

export const UserCard = ({ user }: { readonly user: User }) => {
    return (
        <div className="flex items-center justify-center gap-4">
            <Avatar>
                <AvatarImage src={user.picture} />
                <AvatarFallback>
                    {user.name
                        .split(' ')
                        .map(w => w[0])
                        .join('')}
                </AvatarFallback>
            </Avatar>

            <div>
                <p className="font-bold">{user.name}</p>
                <span className="line-clamp-1 text-xs font-extralight text-gray-600">{user.email}</span>
            </div>
        </div>
    );
};
