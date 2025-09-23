import { Avatar, AvatarFallback, AvatarImage } from '@web/components/ui/avatar.tsx';
import type { User } from '@web/types/user.ts';

export const UserCard = ({ user }: { readonly user: User }) => {
    return (
        <div
            className={`
                flex items-center justify-start gap-4
                md:justify-center
            `}
        >
            <Avatar
                className={`
                    hidden
                    md:block
                `}
            >
                <AvatarImage src={user.picture} />
                <AvatarFallback>
                    {user.name
                        .split(' ')
                        .map(w => w[0])
                        .join('')}
                </AvatarFallback>
            </Avatar>

            <div>
                <p
                    className={`
                        font-bold
                        dark:text-primary
                    `}
                >
                    {user.name}
                </p>
                <span
                    className={`
                        line-clamp-1 text-xs font-extralight text-muted
                        dark:text-muted-foreground
                    `}
                >
                    {user.email}
                </span>
            </div>
        </div>
    );
};
