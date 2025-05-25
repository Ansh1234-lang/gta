import React, { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";

function App() {
  // useEffect(() => {
  //   const audio = new Audio("/GTA6.mp3");
  //   audio.play().catch((e) => {
  //     // Handle autoplay block (some browsers require user interaction)
  //     console.log("Audio playback failed:", e);
  //   });

  //   // Optional: clean up if component unmounts
  //   return () => {
  //     audio.pause();
  //     audio.currentTime = 0;
  //   };
  // }, []);

  let [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power4.inOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  }, []);

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1.02,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
      onComplete: () => {
        document.querySelector(".main").style.overflowY = "hidden";
      },
    });
    gsap.to(".sky", {
      scale: 1.02,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });
    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });
    gsap.to(".character", {
      scale: 0.4,
      x: "-50%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });
    gsap.to(".text", {
      scale: 1,
      x: "-1%",
      rotate: 0,
      duration: 1,
      delay: "-.5",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black">
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main  w-full bg-black rotate-[10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-10 ">
                <div className="lines flex flex-col gap-[3px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-10 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                {/* Modified logo text size and line sizes for responsiveness */}
                <h3 className="text-lg md:text-2xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>
            <div className="imagesdiv  overflow-hidden relative w-full h-screen">
              {/* Made images responsive using Tailwind's responsive utilities */}
              <img
                className="absolute sky top-0 left-0 w-full h-full object-cover scale-[1.2] md:scale-[1.5] rotate-[-20deg]"
                src="sky.png"
              />
              <img
                className="bg absolute top-0 left-0 w-full h-full object-cover scale-[1.3] md:scale-[1.8] rotate-[-5deg]"
                src="bg.png"
              />
              {/* Made text block responsive with better spacing and scaling */}
              <div className="text text-white flex flex-col gap-2 md:gap-3 absolute top-10 md:top-15 left-1/2 -translate-x-1/2 scale-[1] md:scale-[1.1] rotate-[-10deg] md:rotate-[-20deg]">
                <h1 className="text-5xl md:text-9xl leading-none -ml-20 md:-ml-40">
                  grand
                </h1>
                <h1 className="text-5xl md:text-9xl leading-none ml-10 md:ml-20">
                  theft
                </h1>
                <h1 className="text-5xl md:text-9xl leading-none -ml-10 md:-ml-30">
                  auto
                </h1>
              </div>
              {/* Responsive scale and position for the character image */}
              <img
                className="character absolute -bottom-[60%] md:-bottom-[80%] left-1/2 -translate-x-1/2 rotate-[-10deg] scale-[1.5] md:scale-[2]"
                src="./girlbg.png"
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              {/* Responsive text and icon in bottom bar */}
              <div className="flex gap-2 md:gap-4 items-center">
                <i className="text-base md:text-xl ri-arrow-down-line"></i>
                <h3 className="text-base md:text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
                
              </div>
              {/* Responsive positioning and scale for console icon */}
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30px] md:h-[45px]"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-screen flex item-center justify-center bg-black">
            {/* Made the bottom section responsive with flex-wrap for better stacking on mobile */}
            <div className="cntnr flex flex-col md:flex-row text-white w-full p-4">
              <div className="limg relative w-full md:w-1/2 h-[300px] md:h-full scale-[.6]">
                <img
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[80%] md:max-w-full"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-full md:w-[30%] mt-10 md:mt-[7%] px-4">
                <h1 className="text-3xl md:text-6xl">Still Running</h1>
                <h1 className="text-3xl md:text-6xl">Not Hunting</h1>
                <p className="mt-5 text-xs font-[Helvetica_Now_Display]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae repellat, tempore officia suscipit quos necessitatibus, fuga cumque nulla esse, incidunt labore delectus corporis!
                </p>
                <p className="mt-5 text-xs font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere repellat, repudiandae placeat odio beatae architecto explicabo? Quaerat harum velit itaque adipisci, nesciunt neque impedit optio, quasi molestias, ad unde. Quia impedit eaque temporibus!
                </p>
                <button className="bg-yellow-500 px-4 md:px-5 py-3 md:py-5 text-black text-base md:text-xl mt-5">
                  DOWNLOAD NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
