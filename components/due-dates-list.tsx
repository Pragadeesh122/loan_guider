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
import {Calendar, Search, AlertCircle, Bell} from "lucide-react";

// Mock data for demonstration
const dueDates = [
  {
    id: 1,
    borrower: "John Doe",
    amount: 1200,
    dueDate: "2024-02-15",
    status: "upcoming",
    daysUntilDue: 5,
    lendingId: "LOAN-001",
  },
  {
    id: 2,
    borrower: "Jane Smith",
    amount: 850,
    dueDate: "2024-02-10",
    status: "overdue",
    daysUntilDue: -2,
    lendingId: "LOAN-002",
  },
  {
    id: 3,
    borrower: "Mike Johnson",
    amount: 2000,
    dueDate: "2024-02-20",
    status: "upcoming",
    daysUntilDue: 10,
    lendingId: "LOAN-003",
  },
];

export function DueDatesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDueDates = dueDates.filter((date) => {
    const matchesSearch = date.borrower
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || date.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string, daysUntilDue: number) => {
    if (status === "overdue") return "destructive";
    if (daysUntilDue <= 3) return "secondary";
    return "default";
  };

  return (
    <div className='space-y-6'>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Due This Week
            </CardTitle>
            <AlertCircle className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$3,250</div>
            <p className='text-xs text-muted-foreground'>
              From 5 different lendings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Overdue Amount
            </CardTitle>
            <Bell className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-500'>$850</div>
            <p className='text-xs text-muted-foreground'>
              From 1 overdue lending
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
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='upcoming'>Upcoming</SelectItem>
              <SelectItem value='overdue'>Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payments</CardTitle>
          <CardDescription>
            View and manage upcoming payment due dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Borrower</TableHead>
                <TableHead>Amount Due</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Days Until Due</TableHead>
                <TableHead>Lending ID</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDueDates.map((date) => (
                <TableRow key={date.id}>
                  <TableCell className='font-medium'>{date.borrower}</TableCell>
                  <TableCell>${date.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className='flex items-center'>
                      <Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
                      {date.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusColor(date.status, date.daysUntilDue)}>
                      {date.status.charAt(0).toUpperCase() +
                        date.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {date.daysUntilDue < 0
                      ? `${Math.abs(date.daysUntilDue)} days overdue`
                      : `${date.daysUntilDue} days`}
                  </TableCell>
                  <TableCell>{date.lendingId}</TableCell>
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
