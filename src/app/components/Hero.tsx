"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, SplitText);


const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    // 1. SplitText animation
    const heroSplit = new SplitText(".title", {
      type: "chars, words",
    });
  
    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines",
    });
  
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
  
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });
  
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });
  
    // 2. Leaves and arrow scroll animation
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0)
      .to(".arrow", { y: 100 }, 0);
  
    // 3. Video timeline - ONLY after metadata is loaded
    const videoEl = videoRef.current;
    if (videoEl) {
      const startValue = isMobile ? "top 50%" : "center 60%";
      const endValue = isMobile ? "120% top" : "bottom top";
  
      const onLoaded = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: videoEl,
            start: startValue,
            end: endValue,
            scrub: true,
            pin: true,
          },
        });
  
        tl.to(videoEl, {
          currentTime: videoEl.duration,
          ease: "none",
        });
      };
  
      // Already loaded?
      if (videoEl.readyState >= 1) {
        onLoaded();
      } else {
        videoEl.onloadedmetadata = onLoaded;
      }
    }
  }, []);
  

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img
		       src="/images/hero-left-leaf.png"
		       alt="left-leaf"
		       className="left-leaf z-10"
		      />
		      <img
		       src="/images/hero-right-leaf.png"
		       alt="right-leaf"
		       className="right-leaf z-10"
		      />

        <div className="body">
          <img src="/images/arrow.png" alt="arrow" className="arrow z-10" />

          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0 z-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
        />
      </div>
    </>
  );
};

export default Hero;
