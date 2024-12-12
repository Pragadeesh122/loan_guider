import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export function ScheduleSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {Array.from({length: 2}).map((_, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-[140px]' />
              <Skeleton className='h-4 w-4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-[100px] mb-1' />
              <Skeleton className='h-4 w-[160px]' />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
        <div className='flex-1'>
          <Skeleton className='h-10 w-full' />
        </div>
        <Skeleton className='h-10 w-[180px]' />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-[150px] mb-2' />
          <Skeleton className='h-4 w-[250px]' />
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <div className='p-4'>
              <div className='flex items-center space-x-4 pb-4'>
                {Array.from({length: 6}).map((_, i) => (
                  <Skeleton key={i} className='h-4 flex-1' />
                ))}
              </div>
              {Array.from({length: 5}).map((_, i) => (
                <div key={i} className='flex items-center space-x-4 py-4'>
                  {Array.from({length: 6}).map((_, j) => (
                    <Skeleton key={j} className='h-4 flex-1' />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
