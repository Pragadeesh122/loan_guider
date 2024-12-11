"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Users, Wallet, TrendingUp, AlertCircle, DollarSign} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className='space-y-4 sm:space-y-6'>
      <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
        Dashboard Overview
      </h1>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Borrowers
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>245</div>
            <p className='text-xs text-muted-foreground'>+4 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Loans</CardTitle>
            <Wallet className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>189</div>
            <p className='text-xs text-muted-foreground'>+2 new loans today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Interest Earned
            </CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$12,450</div>
            <p className='text-xs text-muted-foreground'>+$840 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Pending Payments
            </CardTitle>
            <AlertCircle className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>23</div>
            <p className='text-xs text-muted-foreground'>Due this week</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 md:grid-cols-7'>
        <Card className='col-span-full md:col-span-4'>
          <CardHeader>
            <CardTitle>Recent Loan Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 rounded-lg border p-4'>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium'>John Doe</p>
                    <p className='text-xs text-muted-foreground'>
                      Loan payment received
                    </p>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <DollarSign className='h-4 w-4 text-green-500' />
                    <span className='text-sm font-medium text-green-500'>
                      +$350
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className='col-span-full md:col-span-3'>
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 rounded-lg border p-4'>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium'>Jane Smith</p>
                    <p className='text-xs text-muted-foreground'>
                      Due in {i} days
                    </p>
                  </div>
                  <div className='text-sm font-medium'>$420</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
