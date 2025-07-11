
import HeroSection from "@/components/blog/hero-section";
import LatestBlogs from "@/components/blog/latest-blogs";

export default function Home() {
  return (
    <div className="pt-20 lg:px-32 md:px-16 px-5">
        <HeroSection/>
        <LatestBlogs/>
    </div>
  );
}
