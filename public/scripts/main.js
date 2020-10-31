var playing = false;
var maxSpawn = 20;

setTextRecord();

function start(){
    buttonState(true);
    resetValues();

    contTime();
}

function deletePoint(event){
    event.target.remove()

    if(pointsSpawned >= maxSpawn){
        finished();
    }else{
        setTimeout(() => {
            spawnPoint();
        }, 80);
    }
}