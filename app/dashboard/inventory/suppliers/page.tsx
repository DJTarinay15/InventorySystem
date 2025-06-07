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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, MoreHorizontal, Edit, Eye, Trash2, Building, Phone, Mail, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SuppliersPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Apple Inc.",
      contactPerson: "John Smith",
      email: "orders@apple.com",
      phone: "+1-800-275-2273",
      address: "1 Apple Park Way, Cupertino, CA 95014",
      city: "Cupertino",
      state: "CA",
      zipCode: "95014",
      country: "USA",
      status: "active",
      totalOrders: 15,
      totalAmount: 125000.0,
      lastOrder: "2024-01-10",
      purchaseHistory: [
        { date: "2024-01-10", poNumber: "PO-2024-001", amount: 15999.0, status: "received" },
        { date: "2024-01-08", poNumber: "PO-2024-003", amount: 18588.0, status: "received" },
        { date: "2023-12-15", poNumber: "PO-2023-045", amount: 22500.0, status: "received" },
      ],
    },
    {
      id: 2,
      name: "Samsung Electronics",
      contactPerson: "Jane Doe",
      email: "b2b@samsung.com",
      phone: "+1-800-726-7864",
      address: "85 Challenger Road, Ridgefield Park, NJ 07660",
      city: "Ridgefield Park",
      state: "NJ",
      zipCode: "07660",
      country: "USA",
      status: "active",
      totalOrders: 12,
      totalAmount: 89500.0,
      lastOrder: "2024-01-12",
      purchaseHistory: [
        { date: "2024-01-12", poNumber: "PO-2024-002", amount: 12735.0, status: "ordered" },
        { date: "2023-12-20", poNumber: "PO-2023-042", amount: 15800.0, status: "received" },
      ],
    },
    {
      id: 3,
      name: "Dell Technologies",
      contactPerson: "Mike Johnson",
      email: "sales@dell.com",
      phone: "+1-800-289-3355",
      address: "1 Dell Way, Round Rock, TX 78682",
      city: "Round Rock",
      state: "TX",
      zipCode: "78682",
      country: "USA",
      status: "active",
      totalOrders: 8,
      totalAmount: 45600.0,
      lastOrder: "2023-12-28",
      purchaseHistory: [
        { date: "2023-12-28", poNumber: "PO-2023-048", amount: 18900.0, status: "received" },
        { date: "2023-11-15", poNumber: "PO-2023-035", amount: 26700.0, status: "received" },
      ],
    },
  ])

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    return status === "active" ? <Badge variant="default">Active</Badge> : <Badge variant="destructive">Inactive</Badge>
  }

  const handleAddSupplier = () => {
    if (!newSupplier.name || !newSupplier.email) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive",
      })
      return
    }

    const supplier = {
      id: suppliers.length + 1,
      ...newSupplier,
      status: "active",
      totalOrders: 0,
      totalAmount: 0.0,
      lastOrder: "",
      purchaseHistory: [],
    }

    setSuppliers([...suppliers, supplier])
    setNewSupplier({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    })
    setShowAddDialog(false)

    toast({
      title: "Success",
      description: "Supplier added successfully",
    })
  }

  const handleDeleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter((s) => s.id !== id))
    toast({
      title: "Success",
      description: "Supplier deleted successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supplier Management</h1>
          <p className="text-muted-foreground">Manage supplier information and purchase history</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Supplier</DialogTitle>
              <DialogDescription>Enter supplier information</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplierName">Company Name *</Label>
                  <Input
                    id="supplierName"
                    value={newSupplier.name}
                    onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                    placeholder="Apple Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={newSupplier.contactPerson}
                    onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
                    placeholder="John Smith"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplierEmail">Email *</Label>
                  <Input
                    id="supplierEmail"
                    type="email"
                    value={newSupplier.email}
                    onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                    placeholder="orders@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplierPhone">Phone</Label>
                  <Input
                    id="supplierPhone"
                    value={newSupplier.phone}
                    onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                    placeholder="+1-800-000-0000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplierAddress">Address</Label>
                <Textarea
                  id="supplierAddress"
                  value={newSupplier.address}
                  onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                  placeholder="Street address"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplierCity">City</Label>
                  <Input
                    id="supplierCity"
                    value={newSupplier.city}
                    onChange={(e) => setNewSupplier({ ...newSupplier, city: e.target.value })}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplierState">State</Label>
                  <Input
                    id="supplierState"
                    value={newSupplier.state}
                    onChange={(e) => setNewSupplier({ ...newSupplier, state: e.target.value })}
                    placeholder="State"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplierZip">ZIP Code</Label>
                  <Input
                    id="supplierZip"
                    value={newSupplier.zipCode}
                    onChange={(e) => setNewSupplier({ ...newSupplier, zipCode: e.target.value })}
                    placeholder="ZIP"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplierCountry">Country</Label>
                <Input
                  id="supplierCountry"
                  value={newSupplier.country}
                  onChange={(e) => setNewSupplier({ ...newSupplier, country: e.target.value })}
                  placeholder="USA"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSupplier}>Add Supplier</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Supplier Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
            <p className="text-xs text-muted-foreground">Active suppliers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.reduce((sum, s) => sum + s.totalOrders, 0)}</div>
            <p className="text-xs text-muted-foreground">Purchase orders placed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${suppliers.reduce((sum, s) => sum + s.totalAmount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total purchase amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {(
                suppliers.reduce((sum, s) => sum + s.totalAmount, 0) /
                suppliers.reduce((sum, s) => sum + s.totalOrders, 0)
              ).toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground">Per purchase order</p>
          </CardContent>
        </Card>
      </div>

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Supplier Directory
          </CardTitle>
          <CardDescription>Complete supplier database with purchase history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
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
                  <TableHead>Supplier</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Total Orders</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-sm text-muted-foreground">{supplier.contactPerson}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span className="text-sm">{supplier.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span className="text-sm">{supplier.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-sm">
                          {supplier.city}, {supplier.state}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{supplier.totalOrders}</TableCell>
                    <TableCell className="font-medium">${supplier.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>{supplier.lastOrder || "Never"}</TableCell>
                    <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedSupplier(supplier)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Supplier
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteSupplier(supplier.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
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

      {/* Supplier Details Dialog */}
      {selectedSupplier && (
        <Dialog open={!!selectedSupplier} onOpenChange={() => setSelectedSupplier(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Supplier Details</DialogTitle>
              <DialogDescription>Complete information for {selectedSupplier.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Company Information</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Company Name</p>
                      <p className="text-sm text-muted-foreground">{selectedSupplier.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Contact Person</p>
                      <p className="text-sm text-muted-foreground">{selectedSupplier.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{selectedSupplier.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{selectedSupplier.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">{selectedSupplier.address}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Purchase Summary</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Total Orders</p>
                      <p className="text-2xl font-bold">{selectedSupplier.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Amount</p>
                      <p className="text-2xl font-bold">${selectedSupplier.totalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last Order</p>
                      <p className="text-lg font-semibold">{selectedSupplier.lastOrder || "Never"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      {getStatusBadge(selectedSupplier.status)}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Purchase History</h3>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>PO Number</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedSupplier.purchaseHistory.map((purchase: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{purchase.date}</TableCell>
                          <TableCell className="font-mono">{purchase.poNumber}</TableCell>
                          <TableCell>${purchase.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={purchase.status === "received" ? "default" : "secondary"}>
                              {purchase.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
