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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, TrendingUp, TrendingDown, RotateCcw, Package, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function StockMovementsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const [stockMovements, setStockMovements] = useState([
    {
      id: 1,
      date: "2024-01-15",
      time: "14:30",
      product: "iPhone 15 128GB Black",
      sku: "IPH15-128-BLK",
      type: "out",
      quantity: 1,
      reference: "Sale - TXN-001",
      user: "Alice Smith",
      notes: "Regular sale transaction",
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "10:15",
      product: "Samsung Galaxy S24 256GB",
      sku: "SAM-S24-256-WHT",
      type: "in",
      quantity: 20,
      reference: "Purchase - PO-2024-002",
      user: "Store Manager",
      notes: "New stock arrival from supplier",
    },
    {
      id: 3,
      date: "2024-01-14",
      time: "16:45",
      product: "MacBook Air M3 512GB",
      sku: "MBA-M3-512-SLV",
      type: "adjustment",
      quantity: -2,
      reference: "Stock Adjustment",
      user: "Store Manager",
      notes: "Damaged items removed from inventory",
    },
    {
      id: 4,
      date: "2024-01-14",
      time: "11:20",
      product: "AirPods Pro 2nd Gen",
      sku: "APP-PRO-2ND",
      type: "out",
      quantity: 3,
      reference: "Sale - TXN-003",
      user: "Bob Johnson",
      notes: "Bulk sale to corporate customer",
    },
    {
      id: 5,
      date: "2024-01-13",
      time: "09:30",
      product: "iPad Air 256GB Blue",
      sku: "IPD-AIR-256-BLU",
      type: "in",
      quantity: 15,
      reference: "Purchase - PO-2024-001",
      user: "System",
      notes: "Automatic stock update from purchase order",
    },
  ])

  const [newMovement, setNewMovement] = useState({
    product: "",
    type: "",
    quantity: "",
    reference: "",
    notes: "",
  })

  const products = [
    "iPhone 15 128GB Black",
    "Samsung Galaxy S24 256GB",
    "MacBook Air M3 512GB",
    "iPad Air 256GB Blue",
    "AirPods Pro 2nd Gen",
  ]

  const filteredMovements = stockMovements.filter((movement) => {
    const matchesSearch =
      movement.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.reference.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterType === "all" || movement.type === filterType

    return matchesSearch && matchesFilter
  })

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "in":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "out":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "adjustment":
        return <RotateCcw className="h-4 w-4 text-blue-600" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getMovementBadge = (type: string) => {
    const variants = {
      in: { variant: "default" as const, label: "Stock In" },
      out: { variant: "destructive" as const, label: "Stock Out" },
      adjustment: { variant: "secondary" as const, label: "Adjustment" },
    }
    const config = variants[type as keyof typeof variants] || variants.adjustment
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const handleAddMovement = () => {
    if (!newMovement.product || !newMovement.type || !newMovement.quantity) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive",
      })
      return
    }

    const movement = {
      id: stockMovements.length + 1,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }),
      product: newMovement.product,
      sku: "AUTO-SKU",
      type: newMovement.type,
      quantity: Number.parseInt(newMovement.quantity),
      reference: newMovement.reference || "Manual Entry",
      user: "Current User",
      notes: newMovement.notes,
    }

    setStockMovements([movement, ...stockMovements])
    setNewMovement({
      product: "",
      type: "",
      quantity: "",
      reference: "",
      notes: "",
    })
    setShowAddDialog(false)

    toast({
      title: "Success",
      description: "Stock movement recorded successfully",
    })
  }

  // Calculate summary stats
  const totalIn = stockMovements.filter((m) => m.type === "in").reduce((sum, m) => sum + m.quantity, 0)
  const totalOut = stockMovements.filter((m) => m.type === "out").reduce((sum, m) => sum + Math.abs(m.quantity), 0)
  const totalAdjustments = stockMovements.filter((m) => m.type === "adjustment").length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Management</h1>
          <p className="text-muted-foreground">Track all stock movements and inventory changes</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Record Movement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Stock Movement</DialogTitle>
              <DialogDescription>Add a new stock in/out or adjustment record</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product *</Label>
                <Select
                  value={newMovement.product}
                  onValueChange={(value) => setNewMovement({ ...newMovement, product: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product} value={product}>
                        {product}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Movement Type *</Label>
                  <Select
                    value={newMovement.type}
                    onValueChange={(value) => setNewMovement({ ...newMovement, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in">Stock In</SelectItem>
                      <SelectItem value="out">Stock Out</SelectItem>
                      <SelectItem value="adjustment">Adjustment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newMovement.quantity}
                    onChange={(e) => setNewMovement({ ...newMovement, quantity: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">Reference</Label>
                <Input
                  id="reference"
                  value={newMovement.reference}
                  onChange={(e) => setNewMovement({ ...newMovement, reference: e.target.value })}
                  placeholder="Purchase order, sale, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newMovement.notes}
                  onChange={(e) => setNewMovement({ ...newMovement, notes: e.target.value })}
                  placeholder="Additional notes"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMovement}>Record Movement</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock In</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalIn}</div>
            <p className="text-xs text-muted-foreground">Items added to inventory</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock Out</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalOut}</div>
            <p className="text-xs text-muted-foreground">Items removed from inventory</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adjustments</CardTitle>
            <RotateCcw className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalAdjustments}</div>
            <p className="text-xs text-muted-foreground">Stock adjustments made</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">5</div>
            <p className="text-xs text-muted-foreground">Items below minimum stock</p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Stock Movement History
          </CardTitle>
          <CardDescription>Complete record of all inventory movements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search movements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Movements</SelectItem>
                <SelectItem value="in">Stock In</SelectItem>
                <SelectItem value="out">Stock Out</SelectItem>
                <SelectItem value="adjustment">Adjustments</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{movement.date}</p>
                        <p className="text-sm text-muted-foreground">{movement.time}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{movement.product}</TableCell>
                    <TableCell className="font-mono text-sm">{movement.sku}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMovementIcon(movement.type)}
                        {getMovementBadge(movement.type)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          movement.type === "in"
                            ? "text-green-600"
                            : movement.type === "out"
                              ? "text-red-600"
                              : "text-blue-600"
                        }`}
                      >
                        {movement.type === "out"
                          ? "-"
                          : movement.type === "adjustment" && movement.quantity < 0
                            ? ""
                            : "+"}
                        {Math.abs(movement.quantity)}
                      </span>
                    </TableCell>
                    <TableCell>{movement.reference}</TableCell>
                    <TableCell>{movement.user}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{movement.notes}</TableCell>
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
