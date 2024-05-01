
//화면구성 엘리먼트를 선택하여 변수 저장
const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

//모든 span 태그에 onclick 이벤트에 clickedBox(this) 붙여줌
window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}
//o또는 x 버튼 클릭 시 셀렉트박스 숨기고, 플레이 보드는 보이게 함 
selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    //o를 선택 시 클래스를 추가하여 선택한 사용자를 표시 함
    players.setAttribute("class", "players active player");
}
//플레이어를 구분하기 위한 폰트어썸 아이콘 지정
let playerXIcon = "fas fa-times",
playerOIcon = "far fa-circle",

playerSign = "X",
runBot = true;

function clickedBox(element){
    //만약  내가 플레이어 o이라면 o턴일때 움직이고, o가 아니라면 x(봇)에게 턴을 넘겨라
    if(players.classList.contains("player")){
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    }else{
        //내가 x를 선택했을 경우 
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner();
    // element.style.pointerEvents = "none";
    // playBoard.style.pointerEvents = "none";
    //0.2초~1.2사이의 랜덤시간 후 봇 실행 
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    }, randomTimeDelay);
}


function bot(){
    let array = [];
    if(runBot){
        playerSign = "O";
        //선택되지 않은 칸을 array에 추가 하기 위함.
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){
                array.push(i);
            }
        }
        //자기가 선택 할 수 있는 칸의 번호 추출
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if(array.length > 0){

            if(players.classList.contains("player")){ 
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allBox[randomBox].setAttribute("id", playerSign);
                players.classList.add("active");
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}
//넘겨받은 span의 아이디값 추출 및 반환
function getIdVal(classname){
    return document.querySelector(".box" + classname).id;
}
//
function checkIdSign(val1, val2, val3, sign){ 
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}

//승리 확정 구분
function selectWinner(){
    //둘중에 하나가 승리했을 경우
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, playerSign) || checkIdSign(2,5,8, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(1,5,9, playerSign) || checkIdSign(3,5,7, playerSign)){
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = `Player <p>${playerSign}</p> 승리`;
    }else{//승리가 확정되지 않은 경우
        //게임이 끝났지만 승패가 갈리지 않은 경우
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "비겼습니다";
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload();
}




function memi_Button() {
    alert('게임선택 화면으로 이동합니다.');
    window.location.href = '../game-home/index.html';
}
