"use client";

import {useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {DatePicker} from "@/components/ui/date-picker";
import {Calendar, Search, DollarSign, Clock} from "lucide-react";
import {Label} from "./ui/label";

// Mock data for demonstration
const scheduleData = [
  {
    id: 1,
    borrower: "John Doe",
    lendingId: "LOAN-001",
    paymentDate: "2024-02-20",
    amount: 1200,
    type: "Regular",
    status: "upcoming",
    remainingBalance: 4800,
  },
  {
    id: 2,
    borrower: "Jane Smith",
    lendingId: "LOAN-002",
    paymentDate: "2024-02-25",
    amount: 850,
    type: "Interest",
    status: "upcoming",
    remainingBalance: 3400,
  },
  {
    id: 3,
    borrower: "Mike Johnson",
    lendingId: "LOAN-003",
    paymentDate: "2024-03-01",
    amount: 2000,
    type: "Regular",
    status: "upcoming",
    remainingBalance: 8000,
  },
];

export function ScheduleView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(),
    to: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  });
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredSchedule = scheduleData.filter((item) => {
    const matchesSearch = item.borrower
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "all" || item.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalScheduledAmount = filteredSchedule.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className='space-y-6'>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Scheduled Payments
            </CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${totalScheduledAmount.toLocaleString()}
            </div>
            <p className='text-xs text-muted-foreground'>
              From {filteredSchedule.length} scheduled payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Next Payment</CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {scheduleData[0]?.paymentDate}
            </div>
            <p className='text-xs text-muted-foreground'>
              ${scheduleData[0]?.amount.toLocaleString()} due
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
        <div className='flex flex-1 items-center space-x-2'>
          <div className='relative flex-1'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search borrowers...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-8'
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Payment type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Types</SelectItem>
              <SelectItem value='regular'>Regular</SelectItem>
              <SelectItem value='interest'>Interest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='flex items-center space-x-2'>
        <div className='grid gap-2'>
          <Label>Date Range</Label>
          <div className='flex items-center space-x-2'>
            <DatePicker
              date={dateRange.from}
              setDate={(date) =>
                setDateRange((prev) => ({...prev, from: date}))
              }
            />
            <span className='text-muted-foreground'>to</span>
            <DatePicker
              date={dateRange.to}
              setDate={(date) => setDateRange((prev) => ({...prev, to: date}))}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Schedule</CardTitle>
          <CardDescription>View and manage scheduled payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Borrower</TableHead>
                <TableHead>Lending ID</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Remaining Balance</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedule.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className='font-medium'>{item.borrower}</TableCell>
                  <TableCell>{item.lendingId}</TableCell>
                  <TableCell>
                    <div className='flex items-center'>
                      <Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
                      {item.paymentDate}
                    </div>
                  </TableCell>
                  <TableCell>${item.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.type === "Regular" ? "default" : "secondary"
                      }>
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    ${item.remainingBalance.toLocaleString()}
                  </TableCell>
                  <TableCell className='text-right'>
                    <Button variant='ghost' size='sm'>
                      Record Payment
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
