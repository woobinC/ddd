var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img2 = new Image();
img2.src = 'dinosaur.png';

var dino = {
  x: 10,
  y: 200,
  width : 50,
  height : 50,
  draw(){
    ctx.fillStyle = 'green';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img2, this.x, this.y,this.width, this.height);
  }
}

dino.draw()

var img1 = new Image();
img1.src = 'hurdle.png';

img1.width=50;
img1.height=50;
class Cactus {
  constructor(){
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw(){
    ctx.fillStyle = 'red';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y, this.width, this.height);
  }
}

var timer = 0;
var cactuss = [];
var jumpTimer = 0;
var animation;

function frame() {
  animation = requestAnimationFrame(frame);
  timer++;

  ctx.clearRect(0,0, canvas.width, canvas.height);

  if (timer % 200 === 0){
    var cactus = new Cactus();
    cactuss.push(cactus);
  }

  cactuss.forEach((a, i, o)=>{
    //x좌표가 0미만이면 제거
    if(a.x < 0) {
      // o.shift(); // 배열 첫번째 인덱스 삭제
      o.splice(i, 1)
    }
    a.x -= 2;

    crash(dino, a);

    a.draw();
  })

  //점프기능
  if (jump == true){
    dino.y -= 2;
    jumpTimer++;
  }
  if (jump == false){
    if(dino.y < 200) {
      dino.y += 2;
    } 
  }
  if (jumpTimer > 70){
    jump = false;
    jumpTimer = 0;
  }

  dino.draw();
}

frame();

//충돌 확인
function crash(dino, cactus){
  var xd = cactus.x - (dino.x + dino.width);
  var yd = cactus.y - (dino.y + dino.height);
  if (xd < 0 && yd < 0){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
    alert("게임 오버, 게임 홈으로");
    window.location.href = '../game-home/index.html';
  }
}

var jump = false;
document.addEventListener('keydown', function(e){
  if (e.code === 'Space'){
    jump = true;
  }
})
