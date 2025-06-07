"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Download, Eye, Receipt, TrendingUp, DollarSign } from "lucide-react"

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPeriod, setFilterPeriod] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  const transactions = [
    {
      id: "TXN-001",
      date: "2024-01-15",
      time: "14:30",
      customer: "John Doe",
      cashier: "Alice Smith",
      items: [
        { name: "iPhone 15 128GB Black", quantity: 1, price: 899.0 },
        { name: "AirPods Pro 2nd Gen", quantity: 1, price: 249.0 },
      ],
      subtotal: 1148.0,
      discount: 0,
      tax: 91.84,
      total: 1239.84,
      paymentMethod: "Credit Card",
      status: "Completed",
    },
    {
      id: "TXN-002",
      date: "2024-01-15",
      time: "13:15",
      customer: "Jane Smith",
      cashier: "Bob Johnson",
      items: [{ name: "Samsung Galaxy S24 256GB", quantity: 1, price: 849.0 }],
      subtotal: 849.0,
      discount: 42.45, // 5% discount
      tax: 64.52,
      total: 871.07,
      paymentMethod: "Cash",
      status: "Completed",
    },
    {
      id: "TXN-003",
      date: "2024-01-15",
      time: "12:45",
      customer: "Mike Johnson",
      cashier: "Alice Smith",
      items: [
        { name: "iPad Air 256GB Blue", quantity: 1, price: 599.0 },
        { name: "Apple Pencil", quantity: 1, price: 129.0 },
      ],
      subtotal: 728.0,
      discount: 0,
      tax: 58.24,
      total: 786.24,
      paymentMethod: "Digital Wallet",
      status: "Completed",
    },
    {
      id: "TXN-004",
      date: "2024-01-14",
      time: "16:20",
      customer: "Sarah Wilson",
      cashier: "Bob Johnson",
      items: [{ name: "MacBook Air M3 512GB", quantity: 1, price: 1599.0 }],
      subtotal: 1599.0,
      discount: 0,
      tax: 127.92,
      total: 1726.92,
      paymentMethod: "Credit Card",
      status: "Refunded",
    },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.cashier.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterPeriod === "today") {
      return matchesSearch && transaction.date === "2024-01-15"
    }
    if (filterPeriod === "week") {
      // For demo, showing last 7 days
      return matchesSearch
    }

    return matchesSearch
  })

  const totalSales = filteredTransactions.filter((t) => t.status === "Completed").reduce((sum, t) => sum + t.total, 0)

  const totalTransactions = filteredTransactions.filter((t) => t.status === "Completed").length
  const averageTransaction = totalTransactions > 0 ? totalSales / totalTransactions : 0

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge variant="default">Completed</Badge>
      case "Refunded":
        return <Badge variant="destructive">Refunded</Badge>
      case "Pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentMethodBadge = (method: string) => {
    const variants: { [key: string]: "default" | "secondary" | "outline" } = {
      "Credit Card": "default",
      Cash: "secondary",
      "Digital Wallet": "outline",
    }
    return <Badge variant={variants[method] || "outline"}>{method}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales & Transactions</h1>
          <p className="text-muted-foreground">View and manage all sales transactions</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Sales Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From {totalTransactions} transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">Completed sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Sale</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageTransaction.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Transaction History
          </CardTitle>
          <CardDescription>Complete record of all sales transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Cashier</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.date}</p>
                        <p className="text-sm text-muted-foreground">{transaction.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.customer}</TableCell>
                    <TableCell>{transaction.cashier}</TableCell>
                    <TableCell>
                      {transaction.items.length} item{transaction.items.length !== 1 ? "s" : ""}
                    </TableCell>
                    <TableCell className="font-medium">${transaction.total.toFixed(2)}</TableCell>
                    <TableCell>{getPaymentMethodBadge(transaction.paymentMethod)}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedTransaction(transaction)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Transaction Details</DialogTitle>
                            <DialogDescription>
                              Complete information for transaction {selectedTransaction?.id}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedTransaction && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Transaction ID</p>
                                  <p className="text-sm text-muted-foreground">{selectedTransaction.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Date & Time</p>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedTransaction.date} at {selectedTransaction.time}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Customer</p>
                                  <p className="text-sm text-muted-foreground">{selectedTransaction.customer}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Cashier</p>
                                  <p className="text-sm text-muted-foreground">{selectedTransaction.cashier}</p>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-medium mb-2">Items Purchased</p>
                                <div className="border rounded-md">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Qty</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Total</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {selectedTransaction.items.map((item: any, index: number) => (
                                        <TableRow key={index}>
                                          <TableCell>{item.name}</TableCell>
                                          <TableCell>{item.quantity}</TableCell>
                                          <TableCell>${item.price.toFixed(2)}</TableCell>
                                          <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>

                              <div className="space-y-2 pt-4 border-t">
                                <div className="flex justify-between">
                                  <span>Subtotal:</span>
                                  <span>${selectedTransaction.subtotal.toFixed(2)}</span>
                                </div>
                                {selectedTransaction.discount > 0 && (
                                  <div className="flex justify-between text-green-600">
                                    <span>Discount:</span>
                                    <span>-${selectedTransaction.discount.toFixed(2)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span>Tax:</span>
                                  <span>${selectedTransaction.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                  <span>Total:</span>
                                  <span>${selectedTransaction.total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Payment Method:</span>
                                  <span>{selectedTransaction.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Status:</span>
                                  {getStatusBadge(selectedTransaction.status)}
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
