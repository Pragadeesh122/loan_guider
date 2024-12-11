import {PrismaClient} from "@prisma/client";
import {hash} from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const adminPassword = await hash("admin123", 12);
    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: adminPassword,
        role: "ADMIN",
      },
    });

    // Create some borrowers
    const borrowers = await Promise.all([
      prisma.borrower.create({
        data: {
          name: "John Doe",
          email: "john@example.com",
          phone: "+1 234 567 890",
          address: "123 Main St, City",
          dateOfBirth: new Date("1990-01-15"),
          occupation: "Software Engineer",
          monthlyIncome: 8000,
          creditScore: 750,
        },
      }),
      prisma.borrower.create({
        data: {
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+1 234 567 891",
          address: "456 Oak St, City",
          dateOfBirth: new Date("1992-03-20"),
          occupation: "Marketing Manager",
          monthlyIncome: 6500,
          creditScore: 720,
        },
      }),
    ]);

    // Create loans for borrowers
    const loans = await Promise.all([
      prisma.loan.create({
        data: {
          borrowerId: borrowers[0].id,
          userId: admin.id,
          amount: 10000,
          interestRate: 5.5,
          term: 12,
          startDate: new Date("2023-01-15"),
          status: "ACTIVE",
          type: "PERSONAL",
          purpose: "Home Renovation",
        },
      }),
      prisma.loan.create({
        data: {
          borrowerId: borrowers[1].id,
          userId: admin.id,
          amount: 5000,
          interestRate: 6.0,
          term: 6,
          startDate: new Date("2023-06-01"),
          status: "ACTIVE",
          type: "PERSONAL",
          purpose: "Education",
        },
      }),
    ]);

    // Create payment schedules
    for (const loan of loans) {
      const monthlyPayment =
        (loan.amount * (1 + loan.interestRate / 100)) / loan.term;
      const schedules = Array.from({length: loan.term}, (_, i) => {
        const dueDate = new Date(loan.startDate);
        dueDate.setMonth(dueDate.getMonth() + i + 1);
        return prisma.paymentSchedule.create({
          data: {
            loanId: loan.id,
            dueDate,
            amount: monthlyPayment,
            principal: loan.amount / loan.term,
            interest: monthlyPayment - loan.amount / loan.term,
            status: i === 0 ? "PENDING" : "PENDING",
          },
        });
      });
      await Promise.all(schedules);
    }

    // Create some payments
    await Promise.all([
      prisma.payment.create({
        data: {
          loanId: loans[0].id,
          userId: admin.id,
          amount: 875,
          type: "PRINCIPAL",
          date: new Date("2023-02-15"),
          status: "COMPLETED",
          reference: "PAY-001",
        },
      }),
      prisma.payment.create({
        data: {
          loanId: loans[0].id,
          userId: admin.id,
          amount: 875,
          type: "PRINCIPAL",
          date: new Date("2023-03-15"),
          status: "COMPLETED",
          reference: "PAY-002",
        },
      }),
    ]);

    console.log("Seed data created successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
