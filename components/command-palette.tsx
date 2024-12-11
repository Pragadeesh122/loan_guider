import * as React from "react";
import {
  Calculator,
  Users,
  Wallet,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {useRouter} from "next/navigation";

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandPalette({open, setOpen}: CommandPaletteProps) {
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen, open]);

  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Quick Actions'>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/borrowers/new"))
            }>
            <Users className='mr-2 h-4 w-4' />
            <span>Add New Borrower</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/lendings/new"))
            }>
            <Wallet className='mr-2 h-4 w-4' />
            <span>Create New Lending</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/payments/new"))
            }>
            <TrendingUp className='mr-2 h-4 w-4' />
            <span>Record Payment</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Tools'>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/calculator"))
            }>
            <Calculator className='mr-2 h-4 w-4' />
            <span>Lending Calculator</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/schedule"))
            }>
            <Calendar className='mr-2 h-4 w-4' />
            <span>Payment Schedule</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/due-dates"))
            }>
            <Clock className='mr-2 h-4 w-4' />
            <span>Due Dates</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Views'>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/borrowers"))
            }>
            <Users className='mr-2 h-4 w-4' />
            <span>All Borrowers</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/lendings"))
            }>
            <Wallet className='mr-2 h-4 w-4' />
            <span>Active Lendings</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/payments"))
            }>
            <TrendingUp className='mr-2 h-4 w-4' />
            <span>Payment History</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/overdue"))
            }>
            <AlertCircle className='mr-2 h-4 w-4' />
            <span>Overdue Payments</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Tools'>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/calculator"))
            }>
            <Calculator className='mr-2 h-4 w-4' />
            <span>Lending Calculator</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/schedule"))
            }>
            <Calendar className='mr-2 h-4 w-4' />
            <span>Payment Schedule</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/due-dates"))
            }>
            <Clock className='mr-2 h-4 w-4' />
            <span>Due Dates</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Views'>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/borrowers"))
            }>
            <Users className='mr-2 h-4 w-4' />
            <span>All Borrowers</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/lendings"))
            }>
            <Wallet className='mr-2 h-4 w-4' />
            <span>Active Lendings</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/payments"))
            }>
            <TrendingUp className='mr-2 h-4 w-4' />
            <span>Payment History</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/overdue"))
            }>
            <AlertCircle className='mr-2 h-4 w-4' />
            <span>Overdue Payments</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
