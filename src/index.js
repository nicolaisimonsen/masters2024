import "./style.css";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

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
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const targets = document.querySelectorAll(".section img");

const lazyLoad = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      console.log("😍");

      if (entry.isIntersecting) {
        console.log("image loaded");
        const img = entry.target;
        const src = img.getAttribute("data-lazy");

        img.setAttribute("src", src);
        observer.disconnect();
      }
    });
  });

  io.observe(target);
};

targets.forEach(lazyLoad);
