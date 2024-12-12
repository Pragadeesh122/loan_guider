import {ScheduleSkeleton} from "@/components/skeletons/schedule-skeleton";

export default function ScheduleLoading() {
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
      <ScheduleSkeleton />
    </div>
  );
}
