import { useState } from 'react';
import { AlertTriangle, PlusCircle } from 'react-feather';
import { Alert, AlertDescription, AlertTitle } from '@web/components/ui/alert';
import { Button } from '@web/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@web/components/ui/dialog';
import { authStore } from '@web/stores/auth.store';
import { CreateBookingForm } from './CreateBookingForm';

export const CreateBookingDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = authStore();

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger asChild>
                <Button size="lg">
                    <PlusCircle />
                    Create Booking
                </Button>
            </DialogTrigger>
            <DialogContent size="xl">
                <DialogHeader className="mb-10 h-fit">
                    <DialogTitle>Create a New Booking</DialogTitle>
                    <DialogDescription>Fill out the form below to create a new booking.</DialogDescription>
                </DialogHeader>

                {!user?.allowedGoogleCalendarAccess && (
                    <Alert
                        className="mb-10"
                        variant="warning"
                    >
                        <AlertTriangle />
                        <AlertTitle className="text-lg">Google Calendar validation will be skipped</AlertTitle>
                        <AlertDescription className="inline">
                            {`We don't have the necessary permissions to check for conflicts in your Google Calendar. To
                            enable this, please remove the app's access from your `}
                            <a
                                className="underline"
                                href="https://myaccount.google.com/connections"
                                rel="noreferrer"
                                target="_blank"
                            >
                                Google account
                            </a>{' '}
                            {'and log in again.'}
                        </AlertDescription>
                    </Alert>
                )}

                <CreateBookingForm
                    onSuccess={() => {
                        setIsOpen(false);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};
