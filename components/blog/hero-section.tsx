import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
  return (
    <header>
      <Image
        src="/path/to/your/image.jpg"
        alt="Hero Image"
        layout="responsive"
        width={700}
        height={475}
        fill
      />
    </header>
  )
}

export default HeroSection