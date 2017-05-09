let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let context = ctx;

let width = window.innerWidth;
let height = window.innerHeight;

let centerX = width * 0.5;
let mainColor = '#fff';
let globalAlpha = 0.5;

canvas.width = width;
canvas.height = height;

let pillarsNum = Math.floor(width/10);
let pillars = [];

function animate() {
  window.requestAnimationFrame(animate);
  render();
}

function render() {
  ctx.clearRect(0, 0, width, height);
  
  if (!pillars.length) {
    for(var i = 0; i < pillarsNum; i++) {
      pillars.push(newPillar())
    }
  }
  

  for (var i = 0, n = pillars.length; i < n; i++) {
    let p = pillars[i];
    
    ctx.beginPath();
    ctx.fillStyle = p.sc;
    
    if(p.y > 0) {
      
      let o = p.v + p.additiveH;
      
      p.h += o;
      p.y -= o;
    } else {
      if(p.h < 0) {
        pillars[i] = newPillar();
      } else {
       p.h -= p.v + p.additiveH;
      }
      
    }
    ctx.shadowColor = p.sc;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = p.w;
    ctx.fillRect(p.x, p.y, p.w, p.h);
    
    
    let x = random(0, width);
    let y = random(0, height);
    ctx.shadowBlur = 0;
    ctx.fillRect(x, y, 2, 2);
  }
}

function newPillar() {
  let offsetX = width*0.5;
  
  return {
    w: random(1, 20),
    h: 20,
    x: centerX + random(-offsetX, offsetX),
    y: height,
    v: random(1, 20),
    alpha: globalAlpha,
    additiveH: random(-10, 10),
    sc: `hsl(${random(0, 360)}, 100%, 50%)`
  }
}

animate();

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}