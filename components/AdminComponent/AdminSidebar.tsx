import {
  Home,
  Package,
  // ShoppingCart,
  // Clock,
  // Tag,
  BarChart2,
  Users,
  // DollarSign,
  // Megaphone,
  Settings,
  ShoppingBag,
  Warehouse,
} from "lucide-react";
import Link from "next/link";

export function AdminSidebar() {
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: Warehouse, label: "Inventory", href: "/admin/inventory" },
    { icon: BarChart2, label: "Analytics", href: "/admin/analytics" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 bg-black text-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-950">
        <span className="text-2xl font-semibold">Brandsquare</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
