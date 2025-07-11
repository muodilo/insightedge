import BlogNavbar from "@/components/blog/blog-navbar";
export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <BlogNavbar/>
        {children}
    </div>
    

  );
}