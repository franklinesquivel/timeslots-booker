import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: Index
});

function Index() {
    return <div className="aspect-video w-1/2 rounded-2xl bg-white shadow-2xl">index</div>;
}
