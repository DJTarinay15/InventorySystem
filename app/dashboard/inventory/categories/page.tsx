"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { Plus, Search, MoreHorizontal, Edit, Trash2, Tag, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CategoriesPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", description: "Electronic devices and gadgets", productCount: 45 },
    { id: 2, name: "Computers", description: "Laptops, desktops, and computer accessories", productCount: 32 },
    { id: 3, name: "Mobile Phones", description: "Smartphones and mobile accessories", productCount: 28 },
    { id: 4, name: "Audio", description: "Headphones, speakers, and audio equipment", productCount: 15 },
    { id: 5, name: "Accessories", description: "Various accessories and add-ons", productCount: 22 },
  ])

  const [units, setUnits] = useState([
    { id: 1, name: "Pieces", abbreviation: "pcs", description: "Individual items" },
    { id: 2, name: "Kilograms", abbreviation: "kg", description: "Weight measurement" },
    { id: 3, name: "Meters", abbreviation: "m", description: "Length measurement" },
    { id: 4, name: "Liters", abbreviation: "L", description: "Volume measurement" },
    { id: 5, name: "Boxes", abbreviation: "box", description: "Packaged items" },
  ])

  const [newCategory, setNewCategory] = useState({ name: "", description: "" })
  const [newUnit, setNewUnit] = useState({ name: "", abbreviation: "", description: "" })
  const [activeTab, setActiveTab] = useState("categories")

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredUnits = units.filter(
    (unit) =>
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast({
        title: "Error",
        description: "Please enter a category name",
        variant: "destructive",
      })
      return
    }

    const category = {
      id: categories.length + 1,
      ...newCategory,
      productCount: 0,
    }

    setCategories([...categories, category])
    setNewCategory({ name: "", description: "" })
    setShowAddDialog(false)

    toast({
      title: "Success",
      description: "Category added successfully",
    })
  }

  const handleAddUnit = () => {
    if (!newUnit.name || !newUnit.abbreviation) {
      toast({
        title: "Error",
        description: "Please enter unit name and abbreviation",
        variant: "destructive",
      })
      return
    }

    const unit = {
      id: units.length + 1,
      ...newUnit,
    }

    setUnits([...units, unit])
    setNewUnit({ name: "", abbreviation: "", description: "" })
    setShowAddDialog(false)

    toast({
      title: "Success",
      description: "Unit added successfully",
    })
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((c) => c.id !== id))
    toast({
      title: "Success",
      description: "Category deleted successfully",
    })
  }

  const handleDeleteUnit = (id: number) => {
    setUnits(units.filter((u) => u.id !== id))
    toast({
      title: "Success",
      description: "Unit deleted successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Category & Unit Management</h1>
        <p className="text-muted-foreground">Manage product categories and units of measurement</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "categories"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab("units")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "units"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Units
        </button>
      </div>

      {activeTab === "categories" && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Product Categories
                </CardTitle>
                <CardDescription>Organize your products into categories</CardDescription>
              </div>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>Create a new product category</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoryName">Category Name *</Label>
                      <Input
                        id="categoryName"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        placeholder="Electronics"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="categoryDescription">Description</Label>
                      <Textarea
                        id="categoryDescription"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        placeholder="Category description"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCategory}>Add Category</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
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
                    <TableHead>Category Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Product Count</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell>{category.productCount} products</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
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
      )}

      {activeTab === "units" && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Units of Measurement
                </CardTitle>
                <CardDescription>Define units for measuring your products</CardDescription>
              </div>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Unit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Unit</DialogTitle>
                    <DialogDescription>Create a new unit of measurement</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="unitName">Unit Name *</Label>
                      <Input
                        id="unitName"
                        value={newUnit.name}
                        onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
                        placeholder="Pieces"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unitAbbreviation">Abbreviation *</Label>
                      <Input
                        id="unitAbbreviation"
                        value={newUnit.abbreviation}
                        onChange={(e) => setNewUnit({ ...newUnit, abbreviation: e.target.value })}
                        placeholder="pcs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unitDescription">Description</Label>
                      <Textarea
                        id="unitDescription"
                        value={newUnit.description}
                        onChange={(e) => setNewUnit({ ...newUnit, description: e.target.value })}
                        placeholder="Unit description"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddUnit}>Add Unit</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search units..."
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
                    <TableHead>Unit Name</TableHead>
                    <TableHead>Abbreviation</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUnits.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium">{unit.name}</TableCell>
                      <TableCell className="font-mono">{unit.abbreviation}</TableCell>
                      <TableCell>{unit.description}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUnit(unit.id)}>
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
      )}
    </div>
  )
}
