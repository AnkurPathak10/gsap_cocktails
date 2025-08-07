'use client'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { allCocktails } from '../../../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Menu = () => {
    const contentRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalCocktails = allCocktails.length
    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails;
        setCurrentIndex(newIndex)
    }
    const getCocktailAt = (indexOffset) => {
        return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
    }
    const currentCocktail = getCocktailAt(0);
    const prevCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);

    useGSAP(()=>{
       gsap.fromTo('#title',{opacity: 0}, {opacity: 1, duration: 1});
       gsap.fromTo('.cocktail img', {opacity: 0 , xPercent: -100}, {xPercent: 0 , opacity: 1 , duration: 1 ,ease: 'power1.inOut'});
       gsap.fromTo('.details h2',{yPercent: 100, opacity: 0}, {yPercent:0, opacity:100 , ease: 'power1.inOut'});
       gsap.fromTo('.details p',{yPercent: 100, opacity: 0}, {yPercent:0, opacity:100 , ease: 'power1.inOut'})
    },[currentIndex])
  return (
    <section id="menu" aria-labelledby='menu-heading'>
        <Image src="/images/slider-left-leaf.png" alt="left-leaf" className='w-[200px]' id="m-left-leaf" width={400} height={400}/>
        <Image src="/images/slider-right-leaf.png" alt="right-leaf" className='w-[300px]' id="m-right-leaf" width={400} height={400}/>
        
        <h2 id='menu-heading' className='sr-only'>
            Cocktails Menu
        </h2>
        <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
            {allCocktails.map((cocktail, index) => {
              const isActive = index === currentIndex;

              return (
                <button key={cocktail.id} className={`
                ${isActive ? 
                'text-white border-white' : 
                'text-white/50 border-white/50'}`} onClick={()=> goToSlide(index)}>
                  {cocktail.name}
                </button>
              )
            })}

        </nav>
        <div className='content'>
            <div className='arrows'>
               <button className='text-left' onClick={()=> goToSlide(currentIndex-1)}>
                 <span>{prevCocktail.name}</span>
                 <Image src="/images/right-arrow.png" alt="right-arrow" className='' aria-hidden='true' width={50} height={20}/>
               </button>
               <button className='text-left' onClick={()=> goToSlide(currentIndex+1)}>
                 <span>{nextCocktail.name}</span>
                 <Image src="/images/left-arrow.png" alt="left-arrow" className='' aria-hidden='true' width={50} height={20}/>
               </button>
            </div>
            <div className='cocktail'>
               <Image src={currentCocktail.image} alt="left-arrow" className='' aria-hidden='true' width={400} height={400}/>
            </div>
            <div className='recipe'>
              <div ref={contentRef} className='info'>
                <p>Recipe for</p>
                <p id = "title">{currentCocktail.name}</p>
              </div>
              <div className='details'>
                <h2>{currentCocktail.title}</h2>
                <p>{currentCocktail.description}</p>
              </div>
            </div>
        </div>
    </section>
  )
}

export default Menu