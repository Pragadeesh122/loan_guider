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
import {Plus, Search} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";

// Temporary mock data
const borrowers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    activeLoans: 2,
    totalBorrowed: 15000,
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 891",
    activeLoans: 1,
    totalBorrowed: 5000,
    status: "pending",
  },
];

export default function BorrowersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredBorrowers = borrowers.filter((borrower) =>
    borrower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='space-y-4 sm:space-y-6'>
      <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
        <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
          Borrowers
        </h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Add Borrower
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add New Borrower</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='space-y-2'>
                <label htmlFor='name' className='text-sm font-medium'>
                  Full Name
                </label>
                <Input id='name' placeholder='John Doe' />
              </div>
              <div className='space-y-2'>
                <label htmlFor='email' className='text-sm font-medium'>
                  Email
                </label>
                <Input id='email' type='email' placeholder='john@example.com' />
              </div>
              <div className='space-y-2'>
                <label htmlFor='phone' className='text-sm font-medium'>
                  Phone Number
                </label>
                <Input id='phone' placeholder='+1 234 567 890' />
              </div>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Borrower
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className='flex items-center space-x-2'>
        <div className='relative flex-1'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search borrowers...'
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
        {filteredBorrowers.map((borrower) => (
          <Card key={borrower.id}>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='font-medium'>{borrower.name}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {borrower.email}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      {borrower.phone}
                    </p>
                  </div>
                  <Badge
                    variant={
                      borrower.status === "active" ? "default" : "secondary"
                    }>
                    {borrower.status}
                  </Badge>
                </div>
                <div className='flex justify-between text-sm'>
                  <div>
                    <p className='text-muted-foreground'>Active Loans</p>
                    <p className='font-medium'>{borrower.activeLoans}</p>
                  </div>
                  <div>
                    <p className='text-muted-foreground'>Total Borrowed</p>
                    <p className='font-medium'>
                      ${borrower.totalBorrowed.toLocaleString()}
                    </p>
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
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Active Loans</TableHead>
              <TableHead>Total Borrowed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBorrowers.map((borrower) => (
              <TableRow key={borrower.id}>
                <TableCell className='font-medium'>{borrower.name}</TableCell>
                <TableCell>
                  <div className='space-y-1'>
                    <div className='text-sm'>{borrower.email}</div>
                    <div className='text-xs text-muted-foreground'>
                      {borrower.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{borrower.activeLoans}</TableCell>
                <TableCell>
                  ${borrower.totalBorrowed.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      borrower.status === "active" ? "default" : "secondary"
                    }>
                    {borrower.status}
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
