import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { Button } from '@web/components/ui/button';
import { Input } from '@web/components/ui/input';
import { Label } from '@web/components/ui/label';
import { type CreateBookingSchema, createBookingSchema } from '@web/lib/validators/createBookingSchema';
import type { CreateBookingPayload } from '@web/types/bookings';

interface Props {
    readonly onSuccess: () => void;
}

export const CreateBookingForm = ({ onSuccess }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid }
    } = useForm<CreateBookingSchema>({
        resolver: zodResolver(createBookingSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            startDateTime: '',
            endDateTime: ''
        }
    });

    const onSubmit = (value: CreateBookingSchema) => {
        const payload: CreateBookingPayload = {
            name: value.name,
            startDateTime: dayjs(value.startDateTime).toISOString(),
            endDateTime: dayjs(value.endDateTime).toISOString()
        };

        console.log('Form Payload:', payload);
        onSuccess();
    };

    return (
        <form
            className="space-y-4"
            onSubmit={v => void handleSubmit(onSubmit)(v)}
        >
            <div className="space-y-2">
                <Label htmlFor="name">Booking Name</Label>
                <Input
                    id="name"
                    {...register('name')}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="startDateTime">Start Date & Time</Label>
                    <Input
                        id="startDateTime"
                        type="datetime-local"
                        {...register('startDateTime')}
                    />
                    {errors.startDateTime && <p className="text-sm text-destructive">{errors.startDateTime.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="endDateTime">End Date & Time</Label>
                    <Input
                        id="endDateTime"
                        type="datetime-local"
                        {...register('endDateTime')}
                    />
                    {errors.endDateTime && <p className="text-sm text-destructive">{errors.endDateTime.message}</p>}
                </div>
            </div>

            <Button
                disabled={!isValid || isSubmitting}
                type="submit"
            >
                {isSubmitting ? 'Creating...' : 'Create Booking'}
            </Button>
        </form>
    );
};
