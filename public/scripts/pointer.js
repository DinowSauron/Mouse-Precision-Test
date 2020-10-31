var secondStart = 0;
var seconds = new Date().getTime() / 1000;
function resetTimer(){
    seconds = new Date().getTime() / 1000;
}

function resetValues(){
    document.querySelector("#text").innerHTML = "";
    document.querySelector("#reason").innerHTML = "";
    pointsSpawned = 0;
    moves = 0;
    miss = 0;
    time = 3;
}
function buttonState(state){
    const buttonElement = document.querySelector("#start");
    if(state){
    buttonElement.style.height = "0px";
    }else{
    buttonElement.style.height = "65px";
    }
}


var time = 0;
function contTime(){
    const clock = document.querySelector("#text");
    if(time < 0){
        clock.innerHTML = "";
        playing = true;
        resetTimer();
        secondStart = seconds;
        spawnPoint();
        return;
    }

    setTimeout(() => {
        time -= 1;
        clock.innerHTML = time;
        contTime();
    }, 1000);
}


var pointsSpawned = 0;
var miss = 0;
var moves = 0;

function spawnPoint(){
    const x = Math.random() * 705;
    const y = Math.random() * 388;

    const area = document.querySelector(".mouse-area");
    const point = document.createElement("span");

    pointsSpawned += 1;
    point.setAttribute("id", "point");
    point.setAttribute("onclick", "deletePoint(event)");
    point.style.top = y + "px";
    point.style.left = x + "px";
    area.appendChild(point);
}
function addMove(){
    if(playing)
    moves += 1;
}
function addMiss(){
    if(playing)
    miss += 1;
}

function finished(){
    //Log dos resultados.
    console.log("points: " + pointsSpawned);
    console.log("moves: " + moves);
    console.log("miss: " + miss);
    console.log("=================");

    playing = false;
    resetTimer();
    const text = document.querySelector("#text");
    const details = document.querySelector("#reason");
    const timeLapse = (seconds - secondStart).toFixed(1);
    var total = (((timeLapse - (maxSpawn * 1.5)) * 50) + ((miss - maxSpawn + 1) * 60) + moves);

    if(total > 200 * maxSpawn)
        total = 200 * maxSpawn;
    total = Number(Math.abs((200 * maxSpawn) - total))


    text.innerHTML = (total) + "pts";
    details.innerHTML = `${total} Pontos em ${timeLapse} Segundos com ${miss - maxSpawn + 1} Erros.`

    Save(total, timeLapse, miss);
    setTimeout(() => {
        buttonState(playing);
    }, 5000);
}

function Save(pt, time, error){
    const best = localStorage.getItem("best-pt") || 0;

    if(pt > Number(best)){
        localStorage.setItem("best-pt", pt);
        localStorage.setItem("best-time", time);
        localStorage.getItem("best-miss", error - maxSpawn + 1);
    }
}

function setTextRecord(){
    const info = document.querySelector("#reason");

    const best = localStorage.getItem("best-pt") || "0";
    const time = localStorage.getItem("best-time") || "0";
    const error = localStorage.getItem("best-miss") || "0";
    info.innerHTML = `Melhor Resultado: ${best}pts em ${time}s com ${error} Erros.`;
}