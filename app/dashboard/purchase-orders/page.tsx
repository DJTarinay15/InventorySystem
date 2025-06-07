"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, MoreHorizontal, Edit, Eye, Truck, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PurchaseOrdersPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPO, setSelectedPO] = useState<any>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: 1,
      poNumber: "PO-2024-001",
      supplier: "Apple Inc.",
      orderDate: "2024-01-10",
      expectedDate: "2024-01-20",
      status: "pending",
      totalAmount: 15999.0,
      items: [
        { product: "iPhone 15 128GB Black", quantityOrdered: 20, quantityReceived: 0, unitCost: 699.0 },
        { product: "AirPods Pro 2nd Gen", quantityOrdered: 15, quantityReceived: 0, unitCost: 199.0 },
      ],
    },
    {
      id: 2,
      poNumber: "PO-2024-002",
      supplier: "Samsung Electronics",
      orderDate: "2024-01-12",
      expectedDate: "2024-01-22",
      status: "ordered",
      totalAmount: 12735.0,
      items: [
        { product: "Samsung Galaxy S24 256GB", quantityOrdered: 15, quantityReceived: 0, unitCost: 649.0 },
        { product: "Samsung Galaxy S24 512GB", quantityOrdered: 10, quantityReceived: 0, unitCost: 749.0 },
      ],
    },
    {
      id: 3,
      poNumber: "PO-2024-003",
      supplier: "Apple Inc.",
      orderDate: "2024-01-08",
      expectedDate: "2024-01-18",
      receivedDate: "2024-01-17",
      status: "received",
      totalAmount: 18588.0,
      items: [
        { product: "MacBook Air M3 512GB", quantityOrdered: 12, quantityReceived: 12, unitCost: 1299.0 },
        { product: "iPad Air 256GB", quantityOrdered: 10, quantityReceived: 10, unitCost: 499.0 },
      ],
    },
  ])

  const [newPO, setNewPO] = useState({
    supplier: "",
    expectedDate: "",
    notes: "",
    items: [{ product: "", quantity: "", unitCost: "" }],
  })

  const suppliers = ["Apple Inc.", "Samsung Electronics", "Dell Technologies", "HP Inc."]
  const products = [
    "iPhone 15 128GB Black",
    "Samsung Galaxy S24 256GB",
    "MacBook Air M3 512GB",
    "iPad Air 256GB",
    "AirPods Pro 2nd Gen",
  ]

  const filteredPOs = purchaseOrders.filter(
    (po) =>
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, label: "Pending" },
      ordered: { variant: "default" as const, label: "Ordered" },
      received: { variant: "default" as const, label: "Received" },
      cancelled: { variant: "destructive" as const, label: "Cancelled" },
    }
    const config = variants[status as keyof typeof variants] || variants.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const addPOItem = () => {
    setNewPO({
      ...newPO,
      items: [...newPO.items, { product: "", quantity: "", unitCost: "" }],
    })
  }

  const removePOItem = (index: number) => {
    setNewPO({
      ...newPO,
      items: newPO.items.filter((_, i) => i !== index),
    })
  }

  const updatePOItem = (index: number, field: string, value: string) => {
    const updatedItems = newPO.items.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setNewPO({ ...newPO, items: updatedItems })
  }

  const handleCreatePO = () => {
    if (!newPO.supplier || newPO.items.some((item) => !item.product || !item.quantity)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const totalAmount = newPO.items.reduce((sum, item) => {
      return sum + Number.parseFloat(item.quantity) * Number.parseFloat(item.unitCost)
    }, 0)

    const po = {
      id: purchaseOrders.length + 1,
      poNumber: `PO-2024-${String(purchaseOrders.length + 1).padStart(3, "0")}`,
      supplier: newPO.supplier,
      orderDate: new Date().toISOString().split("T")[0],
      expectedDate: newPO.expectedDate,
      status: "pending",
      totalAmount,
      items: newPO.items.map((item) => ({
        product: item.product,
        quantityOrdered: Number.parseInt(item.quantity),
        quantityReceived: 0,
        unitCost: Number.parseFloat(item.unitCost),
      })),
    }

    setPurchaseOrders([...purchaseOrders, po])
    setNewPO({
      supplier: "",
      expectedDate: "",
      notes: "",
      items: [{ product: "", quantity: "", unitCost: "" }],
    })
    setShowCreateDialog(false)

    toast({
      title: "Success",
      description: `Purchase Order ${po.poNumber} created successfully`,
    })
  }

  const markAsReceived = (id: number) => {
    setPurchaseOrders(
      purchaseOrders.map((po) =>
        po.id === id
          ? {
              ...po,
              status: "received",
              receivedDate: new Date().toISOString().split("T")[0],
              items: po.items.map((item) => ({ ...item, quantityReceived: item.quantityOrdered })),
            }
          : po,
      ),
    )

    toast({
      title: "Success",
      description: "Purchase order marked as received",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
          <p className="text-muted-foreground">Manage supplier orders and inventory restocking</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Purchase Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Purchase Order</DialogTitle>
              <DialogDescription>Create a new purchase order for inventory restocking</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier *</Label>
                  <Select value={newPO.supplier} onValueChange={(value) => setNewPO({ ...newPO, supplier: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier} value={supplier}>
                          {supplier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedDate">Expected Delivery Date</Label>
                  <Input
                    id="expectedDate"
                    type="date"
                    value={newPO.expectedDate}
                    onChange={(e) => setNewPO({ ...newPO, expectedDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Order Items *</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addPOItem}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>

                {newPO.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div className="space-y-2">
                      <Label>Product</Label>
                      <Select value={item.product} onValueChange={(value) => updatePOItem(index, "product", value)}>
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
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updatePOItem(index, "quantity", e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit Cost</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.unitCost}
                        onChange={(e) => updatePOItem(index, "unitCost", e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Actions</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePOItem(index)}
                        disabled={newPO.items.length === 1}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newPO.notes}
                  onChange={(e) => setNewPO({ ...newPO, notes: e.target.value })}
                  placeholder="Additional notes or instructions"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePO}>Create Purchase Order</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Purchase Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Purchase Orders
          </CardTitle>
          <CardDescription>Track and manage all purchase orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search purchase orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Expected Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPOs.map((po) => (
                  <TableRow key={po.id}>
                    <TableCell className="font-mono text-sm">{po.poNumber}</TableCell>
                    <TableCell>{po.supplier}</TableCell>
                    <TableCell>{po.orderDate}</TableCell>
                    <TableCell>{po.expectedDate}</TableCell>
                    <TableCell>{getStatusBadge(po.status)}</TableCell>
                    <TableCell className="font-medium">${po.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedPO(po)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {po.status === "ordered" && (
                            <DropdownMenuItem onClick={() => markAsReceived(po.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Received
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Order Details Dialog */}
      {selectedPO && (
        <Dialog open={!!selectedPO} onOpenChange={() => setSelectedPO(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Purchase Order Details</DialogTitle>
              <DialogDescription>Complete information for {selectedPO.poNumber}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">PO Number</p>
                  <p className="text-sm text-muted-foreground">{selectedPO.poNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Supplier</p>
                  <p className="text-sm text-muted-foreground">{selectedPO.supplier}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Order Date</p>
                  <p className="text-sm text-muted-foreground">{selectedPO.orderDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Expected Date</p>
                  <p className="text-sm text-muted-foreground">{selectedPO.expectedDate}</p>
                </div>
                {selectedPO.receivedDate && (
                  <div>
                    <p className="text-sm font-medium">Received Date</p>
                    <p className="text-sm text-muted-foreground">{selectedPO.receivedDate}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">Status</p>
                  {getStatusBadge(selectedPO.status)}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Order Items</p>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Qty Ordered</TableHead>
                        <TableHead>Qty Received</TableHead>
                        <TableHead>Unit Cost</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedPO.items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.product}</TableCell>
                          <TableCell>{item.quantityOrdered}</TableCell>
                          <TableCell>{item.quantityReceived}</TableCell>
                          <TableCell>${item.unitCost.toFixed(2)}</TableCell>
                          <TableCell>${(item.quantityOrdered * item.unitCost).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-lg font-medium">Total Amount:</span>
                <span className="text-lg font-bold">${selectedPO.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
