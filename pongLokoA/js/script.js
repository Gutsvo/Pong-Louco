let canvasPong = document.getElementById('canvas') /* variável para manipular o elemento html canvas*/
let quadro = canvasPong.getContext('2d')
const audio = new Audio('js/rolha.mp3')
let letras = canvasPong.getContext('2d')
quadro.fillStyle = '#f520af'
 
//px = posição X
//py = Posição Y
//tx = Largura
//ty = Altura

let player1 = {
    px:80,
    py:260,
    tx:30,
    ty:200,
    dir:0,
}

let player2 = {
    px:1390,
    py:260,
    tx:30,
    ty:200,
    dir:0,
}

let bolinha = {
    px:718,
    py:340,
    tx:30,
    ty:30,
    dir:5,
    dirY:2,
}

quadro.font = '25px arial'
letras.fillStyle = '#f14aac'

let pts1 = 0
let pts2 = 0

let jogar = true

let score1 = letras.fillText('Pontos 1: ' + pts1, 70, 50)
let score2 = letras.fillText(`Pontos 2: ${pts2}`, 1300, 50)

function moverBolinha(){ 
    bolinha.px += bolinha.dir
    bolinha.py += bolinha.dirY

    if(bolinha.py < 0){
        bolinha.dirY *= -1.005
    }
    if(bolinha.py > 720){
        bolinha.dirY *= -1.005
    }
}

function fimJogo(){
    if (pts1 > 4 || pts2 > 4){
        jogar = false
    }
}

function colisaoBolinha(){
    if(bolinha.py + bolinha.ty >= player2.py && bolinha.py <= player2.py + player2.ty && bolinha.px >= player2.px - player2.tx && bolinha.px <= player2.px + player2.tx && bolinha.px >= player2.px - player2.tx){
        bolinha.dir *= -1.005
        audio.play()
    }
    else if(bolinha.py + bolinha.ty >= player1.py && bolinha.py <= player1.py + player1.ty && bolinha.px <= player1.px + player1.tx && bolinha.px >= player1.px - player1.tx && bolinha.px <= player1.px + player1.tx && bolinha.px >= player1.px - player1.tx){
        bolinha.dir *= -1.005
        audio.play()
    }
}

function pontos(){
    if(bolinha.px < -115){
        bolinha.px = 718
        bolinha.py = 340
        bolinha.dir *= -1
        pts2 = pts2+1
    }

    else if(bolinha.px > 1525) {
        bolinha.px = 718
        bolinha.py = 340
        bolinha.dir *= -1
        pts1 = pts1+1
    }
}

function draw(){
    quadro.fillRect(player1.px, player1.py, player1.tx, player1.ty)
    quadro.fillRect(player2.px, player2.py, player2.tx, player2.ty)
    quadro.fillRect(bolinha.px, bolinha.py, bolinha.tx, bolinha.ty)
    quadro.fillText(`Pontos 2: ${pts2}`, 1250, 50)
    quadro.fillText(`Pontos 1: ` + pts1, 130, 50)
}

function telaVencendor(){
    quadro.clearRect(0, 0, 1500, 750)
    quadro.font = '60px arial'
    quadro.fillText(`Pontuação 1: ${pts1}`, 250, 345)
    quadro.fillText(`Pontuação 2: ${pts2}`, 900, 345)
}

function moverJogador(){
    player1.py += 8
}

document.addEventListener('keydown', function(e){
    if(e.keyCode === 83){
        player1.dir = 10
    }
    else if(e.keyCode === 87){
        player1.dir = -10
    }
})

document.addEventListener('keyup', function(e){
    if(e.keyCode === 83){
        player1.dir = 0
    }
    else if(e.keyCode === 87){
        player1.dir = 0
    }
})


document.addEventListener('keydown', function(e){
    if(e.keyCode === 40){
        player2.dir = 10
    }
    else if(e.keyCode === 38){
        player2.dir = -10
    }
})

document.addEventListener('keyup', function(e){
    if(e.keyCode === 40){
        player2.dir = 0
    }
    else if(e.keyCode === 38){
        player2.dir = 0
    }
})

function moverJogador1(){
    if (player1.py < 0){
        player1.py = 0
    }
    else if(player1.py > 550){
        player1.py = 550
    }
    player1.py += player1.dir
}

function moverJogador2(){
    if (player2.py < 0){
        player2.py = 0
    }
    else if(player2.py > 550){
        player2.py = 550
    }
    player2.py += player2.dir
}


function main(){
    if(jogar){
    quadro.clearRect(0,0,1500,780)
    draw()
    moverBolinha()
    moverJogador1()
    moverJogador2()
    colisaoBolinha()
    pontos()
    fimJogo()
    }
    else{
        telaVencendor()
    }
}

setInterval(main, 10)