import {ScheduleView} from "@/components/schedule-view";

export default function SchedulePage() {
  return (
    <div className='container mx-auto px-4 py-6 md:px-6 lg:px-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
          Payment Schedule
        </h1>
        <p className='mt-2 text-muted-foreground'>
          View and manage all scheduled payments for your lendings
        </p>
      </div>
      <ScheduleView />
    </div>
  );
}
