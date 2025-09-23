import { Moon, Sun } from 'react-feather';
import { Button } from '@web/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@web/components/ui/dropdown-menu';
import { useTheme } from '@web/components/ui/theme-provider';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                >
                    {theme === 'dark' ? (
                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                    ) : (
                        <Sun className="h-[1.2rem] w-[1.2rem]" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => {
                        setTheme('light');
                    }}
                >
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        setTheme('dark');
                    }}
                >
                    Dark
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
