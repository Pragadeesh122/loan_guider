import {ScheduleView} from "@/components/schedule-view";

export default function SchedulePage() {
  return (
    <div>
      <h1 className='text-2xl font-bold tracking-tight'>Payment Schedule</h1>
      <p className='text-muted-foreground mb-6'>
        View and manage all scheduled payments for your lendings
      </p>
      <ScheduleView />
    </div>
  );
}
