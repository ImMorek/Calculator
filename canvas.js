let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let fireflies = [];

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  copy () {
    return new Vector(this.x, this.y);
  }
}

class Firefly {
  constructor() {
    this.pos = new Vector(Math.random() * canvas.width, Math.random() * canvas.height);
  }
  
  update() {
    this.pos.x += (Math.random()*2 - 1 );
    this.pos.y += (Math.random()*2 - 1 );
  }
  
  draw(ctx) {
    let radius = 10 + Math.random() * 50;
    let gradient = ctx.createRadialGradient(this.pos.x, this.pos.y, 0, this.pos.x, this.pos.y, radius);
    gradient.addColorStop(0, "rgba(177,255,252,0.75)");
    gradient.addColorStop(0.15,	"rgba(177,255,252,0.1)");
    gradient.addColorStop(0.65, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

let draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let i = fireflies.length;
  while(i--) {
    const f = fireflies[i];
    f.update();
    if(i > 50) {
      fireflies.splice(0, 1);
    }
    if(f.pos.y >= canvas.height || f.pos.y <= 0 || f.pos.x >= canvas.width || f.pos.x <= 0) {
      fireflies.splice(i, 1);
    }
    f.draw(ctx);
  }
  if(Math.random() < 0.1) {
    fireflies.push(new Firefly());
  }
  window.requestAnimationFrame(draw);
}

draw();