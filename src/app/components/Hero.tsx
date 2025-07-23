"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  useGSAP(() => {
    const heroSplit = new SplitText('.title', { type: 'chars, words' });
    const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 1
    });

    gsap.timeline({
      scrollTrigger: { // ✅ lowercase is mandatory
        trigger: "#hero",
        start: 'top top',
        end: "bottom top",
        scrub: true,
      }
    })
      .to('.right-leaf', { y: 300 }, 0)
      .to('.left-leaf', { y: -300 }, 0)
  }, []);

  return (
    <>
      <section id="hero" className="relative noisy overflow-hidden min-h-screen">
        <h1 className='title z-10 relative'>MOJITO</h1>

        {/* Leaf images positioned absolutely so animation is visible */}
        <Image
          src="/images/hero-left-leaf.png"
          alt='left-leaf'
          className='left-leaf absolute left-0 top-20 w-[290px] h-auto z-0'
          width={280}
          height={300}
        />
        <Image
          src="/images/hero-right-leaf.png"
          alt='right-leaf'
          className='right-leaf absolute right-0 bottom-0 w-[290px] top-[1px] h-auto z-0'
          width={280}
          height={300}
        />

        <div className='body relative z-10 top-1'>
          <div className='content md:pt-15'>
            <div className='space-y-2 md:block hidden'>
              <p>Cool. Crisp. Classic.</p>
              <p className='subtitle'>
                Sip the Spirit <br /> Summer
              </p>
            </div>
            <div className='view-cocktails'>
              <p className='subtitle'>
                Every cocktail on our menu is a blend of premium ingredients, creative
                flair, and timeless recipes — designed to delight your senses.
              </p>
              <Link href="#cocktails">View Cocktails</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
