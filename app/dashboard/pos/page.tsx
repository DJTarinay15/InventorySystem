"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Plus, Minus, Trash2, CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: number
  sku: string
  name: string
  price: number
  quantity: number
  total: number
}

export default function POSPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [discount, setDiscount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [amountReceived, setAmountReceived] = useState("")

  const products = [
    {
      id: 1,
      sku: "IPH15-128-BLK",
      name: "iPhone 15 128GB Black",
      price: 899.0,
      stock: 25,
    },
    {
      id: 2,
      sku: "SAM-S24-256-WHT",
      name: "Samsung Galaxy S24 256GB White",
      price: 849.0,
      stock: 8,
    },
    {
      id: 3,
      sku: "MBA-M3-512-SLV",
      name: "MacBook Air M3 512GB Silver",
      price: 1599.0,
      stock: 12,
    },
    {
      id: 4,
      sku: "APP-PRO-2ND",
      name: "AirPods Pro 2nd Generation",
      price: 249.0,
      stock: 30,
    },
    {
      id: 5,
      sku: "IPD-AIR-256-BLU",
      name: "iPad Air 256GB Blue",
      price: 599.0,
      stock: 18,
    },
  ]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addToCart = (product: (typeof products)[0]) => {
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item,
        ),
      )
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          sku: product.sku,
          name: product.name,
          price: product.price,
          quantity: 1,
          total: product.price,
        },
      ])
    }

    toast({
      title: "Added to Cart",
      description: `${product.name} added to cart`,
    })
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity, total: newQuantity * item.price } : item)),
    )
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = (subtotal * discount) / 100
  const tax = (subtotal - discountAmount) * 0.08 // 8% tax
  const total = subtotal - discountAmount + tax

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Error",
        description: "Cart is empty",
        variant: "destructive",
      })
      return
    }

    if (!paymentMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method",
        variant: "destructive",
      })
      return
    }

    // Process the sale
    const transactionId = `TXN-${Date.now()}`

    toast({
      title: "Sale Completed",
      description: `Transaction ${transactionId} processed successfully`,
    })

    // Clear cart and reset form
    setCart([])
    setDiscount(0)
    setPaymentMethod("")
    setAmountReceived("")
  }

  const change = Number.parseFloat(amountReceived) - total

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Point of Sale</h1>
        <p className="text-muted-foreground">Process sales transactions quickly and efficiently</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Product Search and Selection */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Product Search
              </CardTitle>
              <CardDescription>Search and add products to cart</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>

                <div className="grid gap-2 max-h-96 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => addToCart(product)}
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sku}</p>
                        <Badge variant="outline">{product.stock} in stock</Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${product.price.toFixed(2)}</p>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shopping Cart and Checkout */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Shopping Cart
              </CardTitle>
              <CardDescription>
                {cart.length} item{cart.length !== 1 ? "s" : ""} in cart
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Cart is empty</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Separator />

              {/* Cart Summary */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Label htmlFor="discount">Discount (%):</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)}
                    className="w-20"
                    min="0"
                    max="100"
                  />
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="digital">Digital Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentMethod === "cash" && (
                  <div className="space-y-2">
                    <Label htmlFor="amount-received">Amount Received</Label>
                    <Input
                      id="amount-received"
                      type="number"
                      step="0.01"
                      value={amountReceived}
                      onChange={(e) => setAmountReceived(e.target.value)}
                      placeholder="0.00"
                    />
                    {Number.parseFloat(amountReceived) > total && (
                      <p className="text-sm text-green-600">Change: ${change.toFixed(2)}</p>
                    )}
                  </div>
                )}

                <Button className="w-full" size="lg" onClick={handleCheckout} disabled={cart.length === 0}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Complete Sale
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
