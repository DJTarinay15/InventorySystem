"use client"

import {
  BarChart3,
  Package,
  ShoppingCart,
  Receipt,
  Users,
  Settings,
  Home,
  Truck,
  LogOut,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface AppSidebarProps {
  user: {
    email: string
    role: string
  }
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const menuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      roles: ["admin", "manager", "cashier"],
    },
    {
      title: "Point of Sale",
      url: "/dashboard/pos",
      icon: ShoppingCart,
      roles: ["admin", "manager", "cashier"],
    },
    {
      title: "Inventory Management",
      icon: Package,
      roles: ["admin", "manager"],
      subItems: [
        { title: "Product Management", url: "/dashboard/inventory" },
        { title: "Categories & Units", url: "/dashboard/inventory/categories" },
        { title: "Stock Management", url: "/dashboard/inventory/stock-movements" },
        { title: "Supplier Management", url: "/dashboard/inventory/suppliers" },
      ],
    },
    {
      title: "Sales & Transactions",
      url: "/dashboard/sales",
      icon: Receipt,
      roles: ["admin", "manager"],
    },
    {
      title: "Purchase Orders",
      url: "/dashboard/purchase-orders",
      icon: Truck,
      roles: ["admin", "manager"],
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: BarChart3,
      roles: ["admin", "manager"],
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: Users,
      roles: ["admin", "manager"],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      roles: ["admin"],
    },
  ]

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(user.role))

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">Inventory & POS</p>
            <p className="text-xs text-muted-foreground">Management System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible defaultOpen className="group/collapsible">
                      <SidebarMenuButton asChild>
                        <CollapsibleTrigger className="w-full">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                      </SidebarMenuButton>
                      <CollapsibleContent>
                        <div className="ml-4 mt-2 space-y-1">
                          {item.subItems.map((subItem) => (
                            <SidebarMenuButton
                              key={subItem.title}
                              asChild
                              isActive={pathname === subItem.url}
                              className="w-full justify-start text-sm"
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url!}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarSeparator className="mb-4" />
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.email}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
