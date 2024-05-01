let move_speed = 3, grativy = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/die.mp3');

// 원하는 요소의 좌표값을 가져오는 함수
let bird_props = bird.getBoundingClientRect();

// 백그라운드 이미지 좌표값 설정
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
// 클래스 추가
message.classList.add('messageStyle');

// 키다운 했을 때 이벤트 추가
document.addEventListener('keydown', (e) => {
    //엔터 눌렀을 때 게임 플레이중이 아니라면 파이프 삭제
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        // 새, 점수 스타일 설정
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play(){
    function move(){
        //플레이 중이 아니라면 리턴
        if(game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0){
                element.remove();
            }else{
                //게임오버 충돌값 설정
                if(bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width && bird_props.left + bird_props.width > pipe_sprite_props.left && bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height && bird_props.top + bird_props.height > pipe_sprite_props.top){
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart' + '<br><button id="reHome" type="button"><a href = "../game-home/index.html">Game Home</a></button>';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
                }else{
                    //점수 상승값 설정
                    if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        sound_point.play();
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        //애니메이션 실행
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    //새 중력값 초기화
    let bird_dy = 0;
    //새 중력값 설정
    function apply_gravity(){
        if(game_state != 'Play') return;
        bird_dy = bird_dy + grativy;
        // ↑ 또는 스페이스바 키다운시 점프값 설정하고 이미지 2번으로 변경
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/Bird-2.png';
                bird_dy = -7.6;
            }
        });

        // ↑ 또는 스페이스바 키다운 후 키업 했을 때 이미지 돌아오기
        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/Bird.png';
            }
        });

        // 새가 꼭대기로 올라가거나 바닥으로 떨어졌을 경우 게임 종료
        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        //새 머리 충돌값 설정
        bird.style.top = bird_props.top + bird_dy + 'px';
        //새 위치값 가져오고 새가 중력에 따라 움직이는 것을 시뮬레이션함
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;

    let pipe_gap = 35;

    function create_pipe(){
        if(game_state != 'Play') return;

        //파이프 사이가 115 넘어가면 0으로 초기화
        if(pipe_seperation > 115){
            pipe_seperation = 0;

            //파이프 길이 랜덤값 설정 8~51, 파이프 div로 생성하고 class부여
            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            //아래 파이프 div로 생성하고 class부여, 길이는 위 파이프 + 갭을 뺀 값으로 설정
            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
