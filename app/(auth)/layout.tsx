import { ModeToggle } from "@/components/mode-toggle";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <div className="absolute top-0 right-0 p-4">
            <ModeToggle />
        </div>
        {children}
    </div>
  );
}