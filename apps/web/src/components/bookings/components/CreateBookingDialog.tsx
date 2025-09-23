import { useState } from 'react';
import { PlusCircle } from 'react-feather';
import { Button } from '@web/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@web/components/ui/dialog';
import { CreateBookingForm } from './CreateBookingForm';

export const CreateBookingDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                <CreateBookingForm
                    onSuccess={() => {
                        setIsOpen(false);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};
