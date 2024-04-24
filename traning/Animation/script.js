const canvas = document.createElement('canvas');
canvas.style.position = 'fixed'; // 고정 위치
canvas.style.top = '0';
canvas.style.left = '0';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.documentElement.append(canvas);
const ctx = canvas.getContext('2d'); // CanvasRenderingContext2D 객체 생성
// 공 정의
class Ball {
    constructor(x, y, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }
}

// 공 그리기
function drawBall(ball) {
    ctx.beginPath();  // 도형 시작
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2); // x좌표, y좌표, 반지름(크기),각도 0도 ~ 각도 360도 (원 모양)
    ctx.fillStyle = 'skyblue';  // 채우기 스타일 설정
    ctx.fill();  // 도형 채우기
} 

const balls = []; // 공 배열 생성
let ballCount = 0; //공의 숫자 

//움직이는 공을 추가하는 함수
function addBall() {
    const x = Math.random() * (canvas.width - 40) + 20;  //공의 X좌표 랜덤
    const y = Math.random() * (canvas.height - 40) + 20; //공의 y좌표 랜덤
    const xSpeed = Math.random() * 4 - 2; //공의 X좌표 속도 랜덤
    const ySpeed = Math.random() * 4 - 2; //공의 y좌표 속도 랜덤
    const newBall = new Ball(x, y, xSpeed, ySpeed); //공 생성 
    balls.push(newBall); //공 배열에 넣어준다 
    ballCount++;
}

// 공 개수 표시
function drawBallCount(count) {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText(`공 개수: ${count}`, 10, 30);
}

// 공을 움직는 함수
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 공을 지워준다

    // 모든 공들에 대해서 좌표를 업데이트하고 경계를 넘어갔다면 반대방향으로 이동
    for (const ball of balls) {
        ball.x += ball.xSpeed;
        ball.y += ball.ySpeed;
        if (ball.x + 20 > canvas.width || ball.x - 20 < 0) {
            ball.xSpeed = -ball.xSpeed;
        }
        if (ball.y + 20 > canvas.height || ball.y - 20 < 0) {
            ball.ySpeed = -ball.ySpeed;
        }
        drawBall(ball); // 계산된 좌표로 공을 다시 그려준다
    }
    drawBallCount(ballCount); //공의 개수 갱신
    requestAnimationFrame(animate); // 다음 프레임을 실행 
}
// 브라우저 창 크기 변경 시 Canvas 크기 조정
window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const intervalID = setInterval(addBall, 1000); // 1초마다 공 추가

animate(); // 애니메이션 시작
