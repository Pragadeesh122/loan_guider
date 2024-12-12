import {CalculatorForm} from "@/components/calculator-form";

export default function CalculatorPage() {
  return (
    <div className='container mx-auto px-4 py-6 md:px-6 lg:px-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
          Lending Calculator
        </h1>
        <p className='mt-2 text-muted-foreground'>
          Calculate payment schedules and interest projections for your lendings
        </p>
      </div>
      <CalculatorForm />
    </div>
  );
}
