// ! ---------- Animation Bulle ----------//
class Bubbles {
    constructor(options) {
        this.options = options;
        this.setCanvas();
        // this.options.sprite = new Image();
        // this.options.sprite.onload = ()=> {
        this.createBubbles();
        this.drawBubbles();
        // };
        this.options.spriteSize =
            this.options.sprite.height / this.options.spriteCount;
        new ResizeObserver(this.resizeCanvas.bind(this)).observe(this.canvas);
    } 
    setCanvas() {
        this.canvas = document.getElementById(this.options.canvasID);
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.ctx = this.canvas.getContext("2d");
    }
    resizeCanvas() {
        this.setCanvas();
        this.createBubbles();
    }
    createBubbles() {
        this.bubbleArray = [];
        let bubbleCount = Math.floor(
            this.options.bubbleDensity *
                ((this.canvas.width * this.canvas.height) / 2000)
        );
        console.log(bubbleCount);
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
                (this.options.bubbleVelocityY[1] -
                    this.options.bubbleVelocityY[0]) +
            this.options.bubbleVelocityY[0];
        bubble.opacity =
            Math.random() *
                (this.options.bubbleOpacity[1] -
                    this.options.bubbleOpacity[0]) +
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
        requestAnimationFrame(this.drawBubbles.bind(this));
    }
    updateBubbles() {
        for (let i = 0; i < this.bubbleArray.length; i++) {
            if (this.bubbleArray[i].canvas.posY < 0) {
                this.bubbleArray[i].canvas.posY =
                    this.canvas.height + this.bubbleArray[i].bubble.size;
            } else {
                this.bubbleArray[i].canvas.posY -=
                    this.bubbleArray[i].bubble.velocity;
            }
        }
    }
}
class Bubble {
    constructor(sprite, bubble, canvas) {
        this.sprite = sprite;
        this.bubble = bubble;
        this.canvas = canvas;
    }
}
document.querySelector(".yearJeton").innerHTML = new Date().getFullYear();
let sprite = new Image();
sprite.onload = () => {
    bubbles = new Bubbles({
        canvasID: "bubblesJeton",
        sprite: sprite,
        spriteCount: 10,
        bubbleDensity: 1.5,
        bubbleSize: [2, 15],
        bubbleVelocityY: [0.5, 2],
        bubbleOpacity: [0.05, 0.25],
    });
};
sprite.src = "https://keho.nl/mb/codepenfiles/brewerydb/sprite.png";

const partie2 = document.getElementById('jt-partie2');
const partie3 = document.getElementById('jt-partie3');
const reponseBtn = document.getElementById('reponseBtn');
const rejouerBtn = document.getElementById('rejouerBtn');

reponseBtn.addEventListener('click', function() {
  partie2.classList.add('hidden');
  partie3.classList.remove('hidden');
});

rejouerBtn.addEventListener('click', function() {
  partie3.classList.add('hidden');
  partie2.classList.remove('hidden');
});
