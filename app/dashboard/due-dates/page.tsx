import {DueDatesList} from "@/components/due-dates-list";

export default function DueDatesPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold tracking-tight'>Due Dates</h1>
      <p className='text-muted-foreground mb-6'>
        Track and manage upcoming payment due dates
      </p>
      <DueDatesList />
    </div>
  );
}
