import {CalculatorForm} from "@/components/calculator-form";

export default function CalculatorPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold tracking-tight'>Lending Calculator</h1>
      <p className='text-muted-foreground mb-6'>
        Calculate payment schedules and interest projections for your lendings
      </p>
      <CalculatorForm />
    </div>
  );
}
