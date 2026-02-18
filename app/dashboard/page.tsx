import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { StatCard } from "@/components/dashboard/StatCard";
import { DollarSign, Users, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "../login/actions";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

const revenueData = [
  { month: "Sep", revenue: 8500000, expenses: 6200000 },
  { month: "Oct", revenue: 9200000, expenses: 6800000 },
  { month: "Nov", revenue: 10100000, expenses: 7100000 },
  { month: "Dec", revenue: 11800000, expenses: 7500000 },
  { month: "Jan", revenue: 10900000, expenses: 7300000 },
  { month: "Feb", revenue: 12345000, expenses: 7800000 },
];


export default function DashboardPage() {
  const currentMonthRevenue = revenueData[revenueData.length - 1].revenue;
  const previousMonthRevenue = revenueData[revenueData.length - 2].revenue;
  const revenueGrowth = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
  
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = (netProfit / totalRevenue) * 100;

  const statsData = [
  {
    title: "Current Month Revenue",
    value: new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(currentMonthRevenue),
    icon: DollarSign,
    iconBgColor: "bg-blue-500",
    trend: {
      value: Math.round(revenueGrowth),
      label: "vs Last Month",
    },
  },
  {
    title: "Total Revenue (6M)",
    value: new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(totalRevenue),
    icon: TrendingUp,
    iconBgColor: "bg-green-500",
    trend: {
      value: 24,
      label: "Year over Year",
    },
  },
  {
    title: "Active Invoices",
    value: "23",
    icon: FileText,
    iconBgColor: "bg-orange-500",
    trend: {
      value: 12,
      label: "From Last Month",
    },
  },
  {
    title: "Profit Margin",
    value: `${profitMargin.toFixed(1)}%`,
    icon: Users,
    iconBgColor: "bg-purple-500",
    trend: {
      value: 3,
      label: "From Last Period",
    },
  },
];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 pl-64">
        {/* Navbar */}
        <Navbar title="Dashboard Overview" />

        {/* Content Area */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                iconBgColor={stat.iconBgColor}
                trend={stat.trend}
              />
            ))}
          </div>

          <br />

          <div className="grid gap-6 grid-cols-2">
            <RevenueChart data={revenueData} />
            {/* <RevenueChart data={revenueData} /> */}
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
              <p>Recent Invoices section</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}