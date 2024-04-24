let watch = document.getElementById('watch');
let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let recordBtn = document.getElementById('recordBtn');
let resetBtn = document.getElementById('resetBtn');
let records = document.getElementById('records');
let startTime;
let elapsedTime = 0;
let timer;

function formatTime(milliseconds) {
    var hours = Math.floor(milliseconds / (1000 * 60 * 60));
    var minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    var milliseconds = Math.floor((milliseconds % 1000));

    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + ":" +
        (milliseconds < 100 ? (milliseconds < 10 ? "00" : "0") : "") + milliseconds
    );
}

function updateStopwatch() {
    var currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    watch.textContent = formatTime(elapsedTime);
}

function startwatch() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateStopwatch, 1);
    startBtn.disabled = true;
}

function stopStopwatch() {
    clearInterval(timer);
    startBtn.disabled = false;
}

function recordTime() {
    var recordItem = document.createElement('li');
    recordItem.textContent = formatTime(elapsedTime);
    records.append(recordItem);
}

function resetStopwatch() {
    clearInterval(timer);
    elapsedTime = 0;
    watch.textContent = formatTime(elapsedTime);
    startBtn.disabled = false;
    records.innerHTML = ''; // 기록 초기화
}

startBtn.addEventListener('click', startwatch);
stopBtn.addEventListener('click', function() {
    stopStopwatch();
   
});
recordBtn.addEventListener('click', recordTime); // 기록 버튼 클릭 시에 기록
resetBtn.addEventListener('click', resetStopwatch);