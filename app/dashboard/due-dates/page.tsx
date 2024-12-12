import {DueDatesList} from "@/components/due-dates-list";

export default function DueDatesPage() {
  return (
    <div className='container mx-auto px-4 py-6 md:px-6 lg:px-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
          Due Dates
        </h1>
        <p className='mt-2 text-muted-foreground'>
          Track and manage upcoming payment due dates
        </p>
      </div>
      <DueDatesList />
    </div>
  );
}
