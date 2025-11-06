import Image from 'next/image'

export default function HeroSection() {
  return (
    <header className="relative w-full lg:h-[600px] md:h-[500px] h-[400px] rounded-xl ">
      <Image
        src="/images/hero-Image.jpg"
        alt="Hero Image"
        fill
        className="object-cover rounded-xl"
      />
      <div className="absolute rounded-xl inset-0 bg-black/30 flex items-center justify-center ">
      </div>
      <div className='absolute -bottom-[50px] lg:left-10 lg:right-auto left-5 right-5  max-w-lg bg-white dark:bg-gray-800/80 p-6 rounded-lg shadow-lg '>
        {/* badge */}
        <p className='text-xs bg-blue-400 text-white px-2 inline rounded-lg'>Technology</p>
        <p className='mt-2 text-3xl'>The Impact of Technology on the Workplace: How Technology is Changing</p>
      </div>
    </header>
  )
}
