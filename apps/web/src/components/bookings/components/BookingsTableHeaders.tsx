import { TableHead, TableHeader, TableRow } from '@web/components/ui/table.tsx';

export const BookingsTableHeaders = () => (
    <TableHeader>
        <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
        </TableRow>
    </TableHeader>
);
