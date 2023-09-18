'use client'
import React from "react";

function LoanTable({ loanAmount, rateOfInterest, tenure }) {
    // Convert rate of interest to a decimal and monthly rate
    const monthlyInterestRate = (rateOfInterest / 100) / 12;
    // Calculate the number of months
    const totalMonths = tenure * 12;
    // Calculate EMI using the formula
    const emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    // Initialize an array to store amortization details
    const amortizationDetails = [];

    let balance = loanAmount;
    let currentMonth = new Date().getMonth() + 1; // Current month (1-12)
    let currentYear = new Date().getFullYear();

    for (let month = 1; month <= totalMonths; month++) {
        const interest = balance * monthlyInterestRate;
        const principal = emi - interest;
        balance -= principal;

        // Determine the month name
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const monthName = monthNames[currentMonth - 1];

        // Add the amortization details for this month
        amortizationDetails.push({
            month: `${monthName} ${currentYear}`,
            principal: principal,
            monthlyInterest: interest,
            balance: balance,
            interest:rateOfInterest
        });

        // Update currentMonth and currentYear
        if (currentMonth === 12) {
            currentMonth = 1;
            currentYear++;
        } else {
            currentMonth++;
        }
    }

    return (
        <div className="max-h-[70vh]  border border-gray-800 overflow-scroll">
            <h3 className="font-bold text-xl text-center p-8">Loan Amortization</h3>
            <table className="min-w-[630px] w-[100%]">
                <thead>
                    <tr className="p-8">
                        <th>Month</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Balance</th>
                        <th>{"Interest (%)"}</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {amortizationDetails.map((detail) => (
                        <tr key={detail.month}>
                            <td>{detail.month}</td>
                            <td>₹ {Math.round(detail.principal)}</td>
                            <td>₹ {Math.round(detail.monthlyInterest)}</td>
                            <td>₹ {Math.round(detail.balance)}</td>
                            <td>{detail.interest} %</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LoanTable;
