import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { StatCard } from "@/components/dashboard/StatCard";
import { DollarSign, Users, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "../login/actions";

// Dummy data - akan diganti dengan fetch dari Supabase nanti
const statsData = [
  {
    title: "Total Revenue",
    value: "Rp 12,345,000",
    icon: DollarSign,
    iconBgColor: "bg-blue-500",
    trend: {
      value: 20,
      label: "Than Last Month",
    },
  },
  {
    title: "Active Subscriptions",
    value: "3,213",
    icon: Users,
    iconBgColor: "bg-green-500",
    trend: {
      value: 8,
      label: "Than Last Month",
    },
  },
  {
    title: "Pending Invoices",
    value: "65",
    icon: FileText,
    iconBgColor: "bg-orange-500",
    trend: {
      value: 32,
      label: "Than Last Month",
    },
  },
  {
    title: "Monthly Growth",
    value: "72%",
    icon: TrendingUp,
    iconBgColor: "bg-purple-500",
    trend: {
      value: 3,
      label: "Than Last Month",
    },
  },
];

export default function DashboardPage() {
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

          {/* Placeholder untuk section berikutnya */}
          <div className="mt-6 rounded-lg border border-dashed p-8 text-center text-muted-foreground">
            <p>Chart & Table Section akan ditambahkan di task berikutnyaaaa</p>
          </div>
        </main>
      </div>
    </div>
  );
}