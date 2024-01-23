import React, { useEffect, useRef } from 'react';

class Bubbles {
  constructor(options) {
    this.options = options;
    this.setCanvas();
    this.createBubbles();
    this.drawBubbles();
    this.resizeObserver = new ResizeObserver(this.resizeCanvas.bind(this));
    this.resizeObserver.observe(this.canvas);
  }

  setCanvas() {
    this.canvas = document.getElementById(this.options.canvasID);
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.ctx = this.canvas.getContext('2d');
  }

  resizeCanvas() {
    this.setCanvas();
    this.createBubbles();
  }

  createBubbles() {
    this.bubbleArray = [];
    let bubbleCount = Math.floor(
      this.options.bubbleDensity * ((this.canvas.width * this.canvas.height) / 2000)
    );
    for (let i = 0; i < bubbleCount; i++) {
      this.createBubble(i);
    }
  }

  createBubble(i) {
    let sprite = {};
    let bubble = {};
    let canvas = {};
    sprite.posX = 0;
    sprite.posY =
      Math.floor(Math.random() * this.options.spriteCount) *
      (this.options.sprite.height / this.options.spriteCount);
    bubble.size = Math.floor(
      Math.random() *
        (this.options.bubbleSize[1] - this.options.bubbleSize[0]) +
        this.options.bubbleSize[0]
    );
    bubble.velocity =
      Math.random() *
        (this.options.bubbleVelocityY[1] - this.options.bubbleVelocityY[0]) +
      this.options.bubbleVelocityY[0];
    bubble.opacity =
      Math.random() *
        (this.options.bubbleOpacity[1] - this.options.bubbleOpacity[0]) +
      this.options.bubbleOpacity[0];
    canvas.posX = Math.floor(
      Math.random() * this.canvas.width - bubble.size / 2
    );
    canvas.posY = Math.floor(Math.random() * this.canvas.height);
    let singleBubble = new Bubble(sprite, bubble, canvas);
    this.bubbleArray.push(singleBubble);
  }

  drawBubbles() {
    this.updateBubbles();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.bubbleArray.length; i++) {
      let b = this.bubbleArray[i];
      this.ctx.globalAlpha = b.bubble.opacity;
      this.ctx.drawImage(
        this.options.sprite,
        this.bubbleArray[i].sprite.posX,
        this.bubbleArray[i].sprite.posY,
        this.options.spriteSize,
        this.options.spriteSize,
        this.bubbleArray[i].canvas.posX,
        this.bubbleArray[i].canvas.posY,
        this.bubbleArray[i].bubble.size,
        this.bubbleArray[i].bubble.size
      );
    }
    this.animationId = requestAnimationFrame(this.drawBubbles.bind(this));
  }

  updateBubbles() {
    for (let i = 0; i < this.bubbleArray.length; i++) {
      if (this.bubbleArray[i].canvas.posY < 0) {
        this.bubbleArray[i].canvas.posY =
          this.canvas.height + this.bubbleArray[i].bubble.size;
      } else {
        this.bubbleArray[i].canvas.posY -= this.bubbleArray[i].bubble.velocity;
      }
    }
  }

  cleanup() {
    cancelAnimationFrame(this.animationId);
    this.resizeObserver.disconnect();
  }
}

class Bubble {
  constructor(sprite, bubble, canvas) {
    this.sprite = sprite;
    this.bubble = bubble;
    this.canvas = canvas;
  }
}

const BubblesComponent = () => {
  const canvasRef = useRef(null);
  const bubblesRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sprite = new Image();

    const bubbles = new Bubbles({
      canvasID: 'bubbles',
      sprite: sprite,
      spriteCount: 10,
      bubbleDensity: 1.5,
      bubbleSize: [2, 15],
      bubbleVelocityY: [0.5, 2],
      bubbleOpacity: [0.05, 0.25],
    });

    bubblesRef.current = bubbles;

    sprite.onload = () => {
      bubbles.options.spriteSize = sprite.height / bubbles.options.spriteCount;
      bubbles.drawBubbles();
    };

    sprite.src = 'https://keho.nl/mb/codepenfiles/brewerydb/sprite.png';

    return () => {
      // Cleanup code
      bubblesRef.current.cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} id="bubbles"></canvas>;
};

export default BubblesComponent;