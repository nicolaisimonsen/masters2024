export default class SplitText {
  createSpan = (text, index) => {
    const node = document.createElement("span");
    node.style.setProperty("--index", index);
    node.textContent = text;
    return node;
  };

  appendSpan = (type, el, elementAppendTo) => {
    const div = document.createElement("div");
    div.className = `${type}-overflow`;
    el.className = `${type}-overflow__text`;
    div.appendChild(el);
    elementAppendTo.appendChild(div);
  };

  byLetter = (text) => [...text].map(this.createSpan);

  byWord = (text) => text.split(" ").map(this.createSpan);

  setAnimation = (el, animationAttr) => {
    el.animate(animationAttr.properties, {
      duration: animationAttr.duration ? animationAttr.duration : 400,
      fill: animationAttr.fill ? animationAttr.fill : "forwards",
      easing: animationAttr.ease ? animationAttr.ease : "linear",
    });
  };

  lettersOverflow = (
    inputText,
    elementAppendTo,
    cssAnimation,
    animationAttr = null
  ) => {
    Array.from(this.byLetter(inputText)).map((el) => {
      this.appendSpan("letter", el, elementAppendTo);
    });

    if (animationAttr) {
      Array.from(
        elementAppendTo.querySelectorAll(".letter-overflow__text")
      ).map((el, index) => {
        if (animationAttr.staggered) {
          setTimeout(() => {
            this.setAnimation(el, animationAttr);
          }, 1000 + index * animationAttr.staggered.delay);
        } else {
          this.setAnimation(el, animationAttr);
        }
      });
    } else if (cssAnimation !== "") {
      elementAppendTo.classList.add(`animate-${cssAnimation}`);
    }
  };

  wordsOverflow = (
    inputText,
    elementAppendTo,
    cssAnimation,
    animationAttr = null
  ) => {
    Array.from(this.byWord(inputText)).map((el) => {
      this.appendSpan("word", el, elementAppendTo);
    });

    if (animationAttr) {
      Array.from(elementAppendTo.querySelectorAll(".word-overflow__text")).map(
        (el, index) => {
          if (animationAttr.staggered) {
            setTimeout(() => {
              this.setAnimation(el, animationAttr);
            }, 1000 + index * animationAttr.staggered.delay);
          } else {
            this.setAnimation(el, animationAttr);
          }
        }
      );
    } else if (cssAnimation !== "") {
      elementAppendTo.classList.add(`animate-${cssAnimation}`);
    }
  };
}
