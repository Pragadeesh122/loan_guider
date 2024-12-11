"use client";

import {useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {DatePicker} from "@/components/ui/date-picker";

interface PaymentSchedule {
  paymentNo: number;
  date: Date;
  totalInterest: number;
  remainingPrincipal: number;
}

export function CalculatorForm() {
  const [principal, setPrincipal] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [term, setTerm] = useState<number>(12);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [paidPrincipal, setPaidPrincipal] = useState<number>(0);
  const [paidInterest, setPaidInterest] = useState<number>(0);
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentSchedule[]>([]);

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfMonths = term;
    const remainingPrincipal = principal - paidPrincipal;

    // Generate interest accrual schedule
    const schedule: PaymentSchedule[] = [];
    const currentPrincipal = remainingPrincipal;
    let totalInterestAccrued = 0;

    for (let i = 1; i <= numberOfMonths; i++) {
      const monthlyInterest = currentPrincipal * monthlyRate;
      totalInterestAccrued += monthlyInterest;

      const paymentDate = new Date(startDate);
      paymentDate.setMonth(paymentDate.getMonth() + i);

      schedule.push({
        paymentNo: i,
        date: paymentDate,
        totalInterest: totalInterestAccrued,
        remainingPrincipal: currentPrincipal,
      });
    }

    setPaymentSchedule(schedule);
  };

  const totalInterestAccrued =
    paymentSchedule[paymentSchedule.length - 1]?.totalInterest || 0;
  const remainingInterest = Math.max(0, totalInterestAccrued - paidInterest);
  const remainingPrincipal = Math.max(0, principal - paidPrincipal);

  return (
    <div className='space-y-6'>
      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Lending Details</CardTitle>
            <CardDescription>
              Enter the lending details to calculate interest projections
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='principal'>Principal Amount</Label>
              <Input
                id='principal'
                type='number'
                placeholder='Enter amount'
                onChange={(e) => setPrincipal(Number(e.target.value))}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='interest'>Annual Interest Rate (%)</Label>
              <Input
                id='interest'
                type='number'
                step='0.1'
                placeholder='Enter rate'
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='term'>Term (Months)</Label>
              <Select onValueChange={(value) => setTerm(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder='Select term' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='3'>3 months</SelectItem>
                  <SelectItem value='6'>6 months</SelectItem>
                  <SelectItem value='12'>12 months</SelectItem>
                  <SelectItem value='24'>24 months</SelectItem>
                  <SelectItem value='36'>36 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label>Start Date</Label>
              <DatePicker date={startDate} setDate={setStartDate} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='paidPrincipal'>Principal Paid</Label>
              <Input
                id='paidPrincipal'
                type='number'
                placeholder='Enter paid principal'
                value={paidPrincipal}
                onChange={(e) => setPaidPrincipal(Number(e.target.value))}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='paidInterest'>Interest Paid</Label>
              <Input
                id='paidInterest'
                type='number'
                placeholder='Enter paid interest'
                value={paidInterest}
                onChange={(e) => setPaidInterest(Number(e.target.value))}
              />
            </div>
            <Button className='w-full' onClick={calculateLoan}>
              Calculate
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Lending calculation summary</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2'>
              <div>
                <Label className='text-muted-foreground'>Total Principal</Label>
                <p className='text-2xl font-bold'>${principal.toFixed(2)}</p>
                <p className='text-sm text-muted-foreground'>
                  Remaining: ${remainingPrincipal.toFixed(2)}
                </p>
              </div>
              <div>
                <Label className='text-muted-foreground'>Total Interest</Label>
                <p className='text-2xl font-bold'>
                  ${totalInterestAccrued.toFixed(2)}
                </p>
                <p className='text-sm text-muted-foreground'>
                  Remaining: ${remainingInterest.toFixed(2)}
                </p>
              </div>
              <div>
                <Label className='text-muted-foreground'>Principal Paid</Label>
                <p className='text-2xl font-bold text-green-600'>
                  ${paidPrincipal.toFixed(2)}
                </p>
              </div>
              <div>
                <Label className='text-muted-foreground'>Interest Paid</Label>
                <p className='text-2xl font-bold text-green-600'>
                  ${paidInterest.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {paymentSchedule.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Interest Accrual Schedule</CardTitle>
            <CardDescription>
              Monthly interest accrual breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Interest Accrued</TableHead>
                    <TableHead>Remaining Principal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentSchedule.map((payment) => (
                    <TableRow key={payment.paymentNo}>
                      <TableCell>{payment.paymentNo}</TableCell>
                      <TableCell>{payment.date.toLocaleDateString()}</TableCell>
                      <TableCell>${payment.totalInterest.toFixed(2)}</TableCell>
                      <TableCell>
                        ${payment.remainingPrincipal.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
