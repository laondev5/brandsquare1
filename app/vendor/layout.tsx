import { Inter } from "next/font/google";
import { Sidebar } from "@/components/vendorComponent/Sidebar";
import TopBar from "@/components/vendorComponent/Topbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleMenuToggle = () => {
    // Your logic for toggling the menu
    console.log("Menu toggled");
  };
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <TopBar onMenuToggle={handleMenuToggle} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
