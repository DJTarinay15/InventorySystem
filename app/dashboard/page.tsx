"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Package, TrendingUp, AlertTriangle, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const stats = [
    {
      title: "Today's Sales",
      value: "$2,847.50",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Total Products",
      value: "1,247",
      change: "+3 new",
      icon: Package,
      color: "text-blue-600",
    },
  ]

  const lowStockItems = [
    { name: "iPhone 15 Pro", stock: 3, minStock: 10 },
    { name: "Samsung Galaxy S24", stock: 5, minStock: 15 },
    { name: "MacBook Air M3", stock: 2, minStock: 8 },
    { name: "iPad Pro 12.9", stock: 4, minStock: 12 },
  ]

  const recentTransactions = [
    { id: "TXN-001", customer: "John Doe", amount: 299.99, time: "2 min ago" },
    { id: "TXN-002", customer: "Jane Smith", amount: 149.5, time: "15 min ago" },
    { id: "TXN-003", customer: "Mike Johnson", amount: 89.99, time: "32 min ago" },
    { id: "TXN-004", customer: "Sarah Wilson", amount: 199.99, time: "1 hour ago" },
  ]

  const topProducts = [
    { name: "iPhone 15", sales: 45, revenue: 35999.55 },
    { name: "AirPods Pro", sales: 32, revenue: 7968.0 },
    { name: "MacBook Pro", sales: 18, revenue: 35982.0 },
    { name: "iPad Air", sales: 28, revenue: 16772.0 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">TechStore Pro</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Sale
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Low Stock Alert */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Low Stock Alert
            </CardTitle>
            <CardDescription>Items that need restocking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.name}</span>
                  <Badge variant="destructive">{item.stock} left</Badge>
                </div>
                <Progress value={(item.stock / item.minStock) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-blue-500" />
              Recent Transactions
            </CardTitle>
            <CardDescription>Latest sales activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{transaction.id}</p>
                  <p className="text-xs text-muted-foreground">{transaction.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${transaction.amount}</p>
                  <p className="text-xs text-muted-foreground">{transaction.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Top Products
            </CardTitle>
            <CardDescription>Best performing items this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${product.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
