'use client'
import Image from 'next/image'
import React from 'react'
import { cocktailLists, mockTailLists } from '../../../constants'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

const Cocktails = () => {

  useGSAP(()=>{
    const parallaxTimeline = gsap.timeline({
        scrollTrigger:{
            trigger:'#cocktails',
            start:'top 30%',
            end:'bottom 80%',
            scrub:true,
        }
    })
    parallaxTimeline
     .from('#c-left-leaf',{
        x: -100, y: 100,
    })
     .from('#c-right-leaf', {
        x: 100 ,y: 100
     })
  })

  return (
    <section id='cocktails' className='noisy'>
        <Image src='/images/cocktail-left-leaf.png' alt='l-leaf' id='c-left-leaf' className='w-[270px]' width={500} height={500}/>
        <Image src='/images/cocktail-right-leaf.png' alt='r-leaf' id='c-right-leaf' className='w-[350px]' width={500} height={500}/>
        <div className='list'>
            <div className='popular'>
               <h2>Most Popular Cocktails : </h2>
               <ul>
                {cocktailLists.map(({name,country,detail,price})=>(
                   <li key={name}>
                    <div className='md:me-28'>
                       <h3>{name}</h3>
                       <p>{country} | {detail}</p>
                    </div>
                    <span> - {price}</span>
                   </li>
                ))}
               </ul>
            </div>
            <div className="loved">
		 <h2>Most loved mocktails:</h2>
		 
		 <ul>
			{mockTailLists.map(({ name, country, detail, price }) => (
			 <li key={name}>
				<div className="me-28">
				 <h3>{name}</h3>
				 <p>{country} | {detail}</p>
				</div>
				<span>- {price}</span>
			 </li>
			))}
		 </ul>
		</div>
        </div>
    </section>
  )
}

export default Cocktails