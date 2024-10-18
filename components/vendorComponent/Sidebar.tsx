import {
  Home,
  Package,
  ShoppingCart,
  Clock,
  Tag,
  BarChart2,
  Users,
  DollarSign,
  Megaphone,
  Settings,
} from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/vendor" },
    { icon: Package, label: "Products", href: "/vendor/products" },
    { icon: ShoppingCart, label: "Orders", href: "/vendor/orders" },
    { icon: Clock, label: "Pre-orders", href: "/vendor/pre-order" }, // Keep this as is
    { icon: Tag, label: "Coupons", href: "/vendor/coupons" },
    { icon: BarChart2, label: "Analytics", href: "/vendor/analytics" },
    { icon: Users, label: "Customers", href: "/vendor/customers" },
    { icon: DollarSign, label: "Payments", href: "/vendor/payments" },
    { icon: Megaphone, label: "Marketing", href: "/vendor/marketing" },
    { icon: Settings, label: "Settings", href: "/vendor/settings" },
  ];

  return (
    <div className="flex flex-col w-64 bg-blue-900 text-white">
      <div className="flex items-center justify-center h-16 border-b border-blue-800">
        <span className="text-2xl font-semibold">Brandsquare</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors"
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
