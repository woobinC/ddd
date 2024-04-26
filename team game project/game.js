const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bird = {
    x: 50,
    y: canvas.height / 2,
    radius: 20,
    velocity: 0,
    gravity: 0.5,
    jump: 10,
    draw: function() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    },
    update: function() {
        this.velocity += this.gravity;
        this.y += this.velocity;
    },
    flap: function() {
        this.velocity = -this.jump;
    }
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.draw();
}

function update() {
    bird.update();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        bird.flap();
    }
});

gameLoop();