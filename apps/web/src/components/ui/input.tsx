import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@web/lib/utils';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                className={cn(
                    `
                        flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground
                        ring-offset-background
                        file:border-0 file:bg-transparent file:text-sm file:font-medium
                        placeholder:text-muted-foreground
                        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                        focus-visible:outline-none
                        disabled:cursor-not-allowed disabled:opacity-50
                    `,
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

export { Input };
