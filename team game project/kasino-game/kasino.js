

function randomNum(){
    computerNum=Math.floor(Math.random()*100)+1; 
    console.log("랜덤번호", computerNum)

}
let computerNum = 0;
let userNum = document.getElementById("user-input");
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");
let resultArea = document.getElementById("result-area");
let chance = 5;
let chanceArea = document.getElementById("chance-area");



let gameOver = false;
let history = [];

chanceArea.innerHTML = `❤❤❤❤❤
`;


userNum.addEventListener("focus", () => {
    userNum.value = ""
})
playButton.addEventListener("click", playGame)
resetButton.addEventListener("click", reset)


function playGame(){
    let userValue=userNum.value

    if(userValue<1 && userValue>50){
        resultArea.textContent="1에서 100까지의 숫자를 입력하시오"
        return;
    }
    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 값입니다."
        return;
    }

    chance--;
    chanceArea.textContent="";
    for(let i=0;i<chance;i++){
        chanceArea.textContent+=`❤`;
    }
    //chanceArea.textContent=`남은 기회: ${chance}번`;
    console.log("기회?",chance);
    history.push(userValue);
    console.log("입력값",history);
    

    if(userValue>computerNum){
        resultArea.textContent="Down!";

    }else if(userValue<computerNum){
        resultArea.textContent="Up!";
    
    }else{
       resultArea.textContent="Clear!";
       
        chanceArea.innerHTML="reset버튼을 눌러주세요";
        playButton.disabled=true;
     
    }
 
    if(chance == 0){
        resultArea.textContent="fail";
        chanceArea.innerHTML="reset버튼을 눌러주세요"
        playButton.disabled=true;
        gameOver = true;
    }
    if(gameOver == true){
        resultArea.textContent="fail";
        chanceArea.innerHTML="reset버튼을 눌러주세요"
        playButton.disabled=true;
    }

}


function reset(){
    userNum.value="";
    resultArea.textContent="1에서 100까지의 숫자를 입력하라";
    chanceArea.innerHTML="❤❤❤❤❤";
    randomNum();
    playButton.disabled = false;
    gameOver = false;
    chance = 5;
    history = [];

    if( history = []){
        alert = "게임 승리, 게임 홈으로 돌아갑니다."
    }

    
}



