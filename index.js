const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const circleArray = [];
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouseCoordinate = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("mousemove", (evt) => {
  mouseCoordinate.x = evt.x;
  mouseCoordinate.y = evt.y;
  for (let i = 0; i < 3; i++) {
    circleArray.push(new Circle());
  }
});

class Circle {
  constructor() {
    this.x = mouseCoordinate.x;
    this.y = mouseCoordinate.y;
    this.size = Math.random() * 5 + 1; // random between 1 --> 6
    this.speedX = Math.random() * 3 - 1.5; // random between 1.5 --> -1.5
    this.speedY = Math.random() * 3 - 1.5; // random between 1.5 --> -1.5
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }

  update() {
    this.x += this.speedX; // change position of circle (plus cordinate with speedX until circle outa screen)
    this.y += this.speedY; // change position of circle (plus cordinate with speedX until circle outa screen)
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    // draw circle
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
  }
}

const handleCircle = () => {
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
    circleArray[i].draw();
    for (let j = i; j < circleArray.length; j++) {
      const dx = circleArray[i].x - circleArray[j].x; // canh goc vuong 1 cua tam giac vuong
      const dy = circleArray[i].y - circleArray[j].y; // canh 2 cua tam gac vuong
      const distance = Math.sqrt(dx * dx + dy * dy); // dung pytago tinh canh huyen
      if (distance < 50 && distance > 20) {
        context.beginPath();
        context.lineWidth = circleArray[i].size / 8;
        context.strokeStyle = circleArray[i].color;
        context.moveTo(circleArray[i].x, circleArray[i].y);
        context.lineTo(circleArray[j].x, circleArray[j].y);
        context.stroke();
      }
    }
    if (circleArray[i].size <= 0.3) {
      // if circle smaller than 0.3 => remove it
      circleArray.splice(i, 1); // cause remove one so next element being skipped => add i--
      i--;
    }
  }
};

const animate = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  //   context.fillStyle = "rgba(0,0,0,0.2)";
  //   context.fillRect(0, 0, canvas.width, canvas.height);
  handleCircle();
  hue += 3;
  requestAnimationFrame(animate);
};

animate();
