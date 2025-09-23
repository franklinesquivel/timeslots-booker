import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@web/components/ui/alert-dialog';

interface Props {
    readonly title: string;
    readonly description: string;
    readonly onConfirm: () => void;
    readonly isPending: boolean;
}

export const ConfirmDialogContent = ({ title, description, onConfirm, isPending }: Props) => {
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    disabled={isPending}
                    onClick={onConfirm}
                >
                    {isPending ? 'Confirming...' : 'Continue'}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
};
