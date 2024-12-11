"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Download, TrendingUp, TrendingDown} from "lucide-react";

// Mock data for reports
const summaryData = {
  totalLoans: 45,
  activeLoans: 32,
  totalInterestEarned: 25600,
  totalPrincipal: 450000,
  averageInterestRate: 5.8,
  defaultRate: 2.3,
};

const monthlyData = [
  {
    month: "January 2024",
    newLoans: 5,
    completedLoans: 3,
    interestEarned: 2300,
    principalCollected: 15000,
  },
  {
    month: "December 2023",
    newLoans: 4,
    completedLoans: 2,
    interestEarned: 2100,
    principalCollected: 12000,
  },
  {
    month: "November 2023",
    newLoans: 6,
    completedLoans: 4,
    interestEarned: 2500,
    principalCollected: 18000,
  },
];

const performanceMetrics = [
  {
    metric: "Collection Rate",
    value: "98.5%",
    trend: "up",
    change: "+2.3%",
  },
  {
    metric: "Default Rate",
    value: "2.3%",
    trend: "down",
    change: "-0.5%",
  },
  {
    metric: "Average Loan Duration",
    value: "8.5 months",
    trend: "up",
    change: "+0.8",
  },
  {
    metric: "Interest Coverage Ratio",
    value: "2.4x",
    trend: "up",
    change: "+0.2",
  },
];

export default function ReportsPage() {
  return (
    <div className='space-y-4 sm:space-y-6'>
      <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
        <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
          Reports & Analytics
        </h1>
        <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0'>
          <Select defaultValue='30'>
            <SelectTrigger className='w-full sm:w-[180px]'>
              <SelectValue placeholder='Select time period' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='7'>Last 7 days</SelectItem>
              <SelectItem value='30'>Last 30 days</SelectItem>
              <SelectItem value='90'>Last 90 days</SelectItem>
              <SelectItem value='365'>Last 365 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='outline' className='w-full sm:w-auto'>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{summaryData.totalLoans}</div>
            <p className='text-xs text-muted-foreground'>
              {summaryData.activeLoans} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Interest Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${summaryData.totalInterestEarned.toLocaleString()}
            </div>
            <p className='text-xs text-muted-foreground'>
              {summaryData.averageInterestRate}% avg. rate
            </p>
          </CardContent>
        </Card>
        <Card className='sm:col-span-2 lg:col-span-1'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Principal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${summaryData.totalPrincipal.toLocaleString()}
            </div>
            <p className='text-xs text-muted-foreground'>
              {summaryData.defaultRate}% default rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {performanceMetrics.map((metric) => (
          <Card key={metric.metric}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {metric.metric}
              </CardTitle>
              {metric.trend === "up" ? (
                <TrendingUp className='h-4 w-4 text-green-500' />
              ) : (
                <TrendingDown className='h-4 w-4 text-red-500' />
              )}
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{metric.value}</div>
              <p
                className={`text-xs ${
                  metric.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                {metric.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Report Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Report</CardTitle>
        </CardHeader>
        <CardContent className='px-0 sm:px-6'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>New Loans</TableHead>
                  <TableHead>Completed Loans</TableHead>
                  <TableHead>Interest Earned</TableHead>
                  <TableHead>Principal Collected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyData.map((data) => (
                  <TableRow key={data.month}>
                    <TableCell className='font-medium'>{data.month}</TableCell>
                    <TableCell>{data.newLoans}</TableCell>
                    <TableCell>{data.completedLoans}</TableCell>
                    <TableCell>
                      ${data.interestEarned.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      ${data.principalCollected.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Additional Reports Section */}
      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Low Risk Loans</span>
                <span className='text-sm'>65%</span>
              </div>
              <div className='h-2 rounded-full bg-gray-100'>
                <div
                  className='h-2 rounded-full bg-green-500'
                  style={{width: "65%"}}
                />
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Medium Risk Loans</span>
                <span className='text-sm'>25%</span>
              </div>
              <div className='h-2 rounded-full bg-gray-100'>
                <div
                  className='h-2 rounded-full bg-yellow-500'
                  style={{width: "25%"}}
                />
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>High Risk Loans</span>
                <span className='text-sm'>10%</span>
              </div>
              <div className='h-2 rounded-full bg-gray-100'>
                <div
                  className='h-2 rounded-full bg-red-500'
                  style={{width: "10%"}}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
                <div>
                  <p className='text-sm font-medium'>Upcoming Payments</p>
                  <p className='text-xs text-muted-foreground'>Next 7 days</p>
                </div>
                <span className='text-2xl font-bold'>12</span>
              </div>
              <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
                <div>
                  <p className='text-sm font-medium'>Expected Collections</p>
                  <p className='text-xs text-muted-foreground'>Next 7 days</p>
                </div>
                <span className='text-2xl font-bold'>$8,500</span>
              </div>
              <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
                <div>
                  <p className='text-sm font-medium'>Overdue Payments</p>
                  <p className='text-xs text-muted-foreground'>Current</p>
                </div>
                <span className='text-2xl font-bold text-red-500'>3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
