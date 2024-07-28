const board = document.querySelector(".gameBoard")
var foodX
var foodY
var headX = 10
var headY = 9
var vx = 0 , vy = 0
var snake = []
var setIntervalID
var score = 0
var hi = localStorage.getItem("high-score") || 0
document.querySelector(".hiVal").textContent=hi
function changeFoodPos()
{
    foodX = Math.floor(Math.random()*30 + 1)
    foodY = Math.floor(Math.random()*30 + 1)    
}

function changeDirection(e)
{
    if(e.key === "ArrowUp" && vy != 1)
    {
        vx = 0
        vy = -1
    }
    else if(e.key === "ArrowDown" && vy != -1)
    {
        vx = 0
        vy = 1
    }
    else if(e.key === "ArrowLeft" && vx != 1)
    {
        vx = -1
        vy = 0
    }
    else if(e.key === "ArrowRight" && vx != -1)
    {
        vx = 1
        vy = 0
    }
    
    start()
}

function start()
{    
    
    var markup = '<div class="food" style="grid-area: '+ foodX + '/'+foodY +'"></div>'   
    
    if(headX === foodX && headY === foodY)
        {
            changeFoodPos()
            snake.push([foodX,foodY])
            score++
            document.querySelector(".scoreVal").textContent=score
            document.querySelector(".hiVal").textContent=hi
        }

        if(score >= hi)
            hi = score
        localStorage.setItem("high-score" , hi)

        for(var i = snake.length-1 ; i >0 ; i--)
            {
                snake[i] = snake[i-1]
            }    
    snake[0] = [headX,headY]
    headY += vx
    headX += vy
    if(headX <= -1 || headX > 31 || headY <= -1 || headY > 31)
    {
        clearInterval(setIntervalID)
        alert("Game Over !")
        location.reload()
    }

    for(var i = 0 ; i < snake.length ; i++)
        {
            markup += '<div class="head" style="grid-area:'+ snake[i][0] + '/' + snake[i][1]+'"></div>'
            if(i!=0 && snake[0][1] === snake[i][1] && snake[0][0] === snake[i][0])
            {
                clearInterval(setIntervalID)
                alert("Game Over !")
                location.reload()
            }
        }
    board.innerHTML = markup    
    //board.querySelector(".head").setAttribute("style","grid-area: "+(headX-1)+"/"+(headY-1)+"/"+(headX)+"/"+headY)
}
changeFoodPos()
setIntervalID = setInterval(start , 125)
document.addEventListener("keydown" , changeDirection)

