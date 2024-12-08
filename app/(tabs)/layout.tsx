import Footer from "@/components/tabs/Footer";
import Sidebar from "@/components/tabs/Sidebar";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="w-full px-20 pt-20">{children}</div>
      <Footer />
    </div>
  );
}
