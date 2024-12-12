import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export function CalculatorSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-[140px]' />
            <Skeleton className='h-4 w-[250px]' />
          </CardHeader>
          <CardContent className='space-y-4'>
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} className='space-y-2'>
                <Skeleton className='h-4 w-[100px]' />
                <Skeleton className='h-10 w-full' />
              </div>
            ))}
            <Skeleton className='h-10 w-full' />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-[100px]' />
            <Skeleton className='h-4 w-[200px]' />
          </CardHeader>
          <CardContent>
            <div className='grid gap-4 md:grid-cols-2'>
              {Array.from({length: 4}).map((_, i) => (
                <div key={i} className='space-y-2'>
                  <Skeleton className='h-4 w-[120px]' />
                  <Skeleton className='h-8 w-[100px]' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
