"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Plus, Search, Calendar} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

// Temporary mock data
const loans = [
  {
    id: 1,
    borrower: "John Doe",
    amount: 10000,
    interestRate: 5.5,
    startDate: "2023-01-15",
    duration: "12 months",
    status: "active",
    nextPayment: "2024-01-15",
    totalPaid: 4500,
  },
  {
    id: 2,
    borrower: "Jane Smith",
    amount: 5000,
    interestRate: 6.0,
    startDate: "2023-06-01",
    duration: "6 months",
    status: "pending",
    nextPayment: "2024-01-01",
    totalPaid: 1000,
  },
];

export default function LoansPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredLoans = loans.filter((loan) =>
    loan.borrower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalActiveLoans = loans.filter(
    (loan) => loan.status === "active"
  ).length;
  const totalLoanAmount = loans.reduce((acc, loan) => acc + loan.amount, 0);
  const averageInterestRate =
    loans.reduce((acc, loan) => acc + loan.interestRate, 0) / loans.length;

  return (
    <div className='space-y-4 sm:space-y-6'>
      <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
        <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>Loans</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Create Loan
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Create New Loan</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Borrower</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Select borrower' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='john'>John Doe</SelectItem>
                    <SelectItem value='jane'>Jane Smith</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Loan Amount</label>
                <Input type='number' placeholder='Enter amount' />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Interest Rate (%)</label>
                <Input type='number' step='0.1' placeholder='Enter rate' />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Duration</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Select duration' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='3'>3 months</SelectItem>
                    <SelectItem value='6'>6 months</SelectItem>
                    <SelectItem value='12'>12 months</SelectItem>
                    <SelectItem value='24'>24 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Create Loan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalActiveLoans}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Loan Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${totalLoanAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card className='sm:col-span-2 lg:col-span-1'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Average Interest Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {averageInterestRate.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='flex items-center space-x-2'>
        <div className='relative flex-1'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search loans...'
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className='pl-8'
          />
        </div>
      </div>

      {/* Mobile view - Cards */}
      <div className='grid gap-4 sm:hidden'>
        {filteredLoans.map((loan) => (
          <Card key={loan.id}>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='font-medium'>{loan.borrower}</h3>
                    <p className='text-sm text-muted-foreground'>
                      ${loan.amount.toLocaleString()} at {loan.interestRate}%
                    </p>
                  </div>
                  <Badge
                    variant={
                      loan.status === "active" ? "default" : "secondary"
                    }>
                    {loan.status}
                  </Badge>
                </div>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <p className='text-muted-foreground'>Duration</p>
                    <p className='font-medium'>{loan.duration}</p>
                  </div>
                  <div>
                    <p className='text-muted-foreground'>Next Payment</p>
                    <div className='flex items-center'>
                      <Calendar className='mr-1 h-3 w-3 text-muted-foreground' />
                      <p className='font-medium'>{loan.nextPayment}</p>
                    </div>
                  </div>
                </div>
                <Button variant='ghost' size='sm' className='w-full'>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop view - Table */}
      <div className='hidden rounded-md border sm:block'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Borrower</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Interest Rate</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Next Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLoans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell className='font-medium'>{loan.borrower}</TableCell>
                <TableCell>${loan.amount.toLocaleString()}</TableCell>
                <TableCell>{loan.interestRate}%</TableCell>
                <TableCell>{loan.duration}</TableCell>
                <TableCell>
                  <div className='flex items-center'>
                    <Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
                    {loan.nextPayment}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      loan.status === "active" ? "default" : "secondary"
                    }>
                    {loan.status}
                  </Badge>
                </TableCell>
                <TableCell className='text-right'>
                  <Button variant='ghost' size='sm'>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
