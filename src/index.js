import "./style.css";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitText from "./modules/split-text";
const splitText = new SplitText();

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

document.querySelectorAll(".players__player").forEach((node, index) => {
  node.style.setProperty("--index", index % 4);
});

lenis.on("scroll", () => {
  document.body.style.setProperty(
    "--scroll",
    window.scrollY / (document.body.offsetHeight - window.innerHeight)
  );
  document.getElementById("main-logo").style.opacity =
    1 - document.body.style.getPropertyValue("--scroll") * 10;
  document.querySelector(".section__players").style.opacity =
    0 + document.body.style.getPropertyValue("--scroll") * 10;
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// const cursorDot = document.querySelector(".cursor-dot");

// const positionCursor = (e) => {
//   const mouseY = e.clientY;
//   const mouseX = e.clientX;

//   cursorDot.style.setProperty(
//     "transform",
//     `translate3d(${mouseX}px, ${mouseY}px, 0)`
//   );
// };

// window.addEventListener("mousemove", positionCursor);

const targets = document.querySelectorAll(".section__players img");

const lazyLoad = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      console.log("😍");

      if (entry.isIntersecting) {
        console.log("image loaded");
        const img = entry.target;
        const src = img.getAttribute("data-lazy");

        img.setAttribute("src", src);
        img.parentNode.parentNode.animate([{ opacity: 1 }], {
          fill: "forwards",
          duration: 300,
          iterations: 1,
        });
        observer.disconnect();
      }
    });
  });

  io.observe(target);
};

targets.forEach(lazyLoad);

const loadScreenHeading = document
  .getElementById("loadScreen")
  .querySelector("h2");

document.addEventListener("DOMContentLoaded", () => {
  // JS Set Animation Parameters
  // splitText.wordsOverflow("44 days remaining", loadScreenHeading, "", {
  //   properties: [{ transform: "translateY(0)", opacity: 1 }],
  //   duration: 2000,
  //   fill: "forwards",
  //   ease: "cubic-bezier(0.61, 1, 0.88, 1)",
  //   delay: 1000,
  //   staggered: {
  //     delay: 50,
  //   },
  // });

  // CSS set animation class
  splitText.wordsOverflow(
    "44 days remaining",
    loadScreenHeading,
    "fadeUp",
    null
  );
});
