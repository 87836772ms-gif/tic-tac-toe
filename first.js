let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let newgamebtn=document.querySelector("#newgame");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector(".msg");
let drawGame=document.querySelector(".draw");
let score=document.querySelector(".score");
let score2=document.querySelector(".score2");

let turnO=true;
const winpatterns=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turnO){
            box.innerHTML="O";
            turnO=false;
        }
        else{
            box.innerHTML="X";
            turnO=true;
        } 
        box.disabled=true;
        checkwinner();
        checkDraw();
    })
})
const checkDraw = () => {
    let isDraw = true;

    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false;
            break;
        }
    }

    if (isDraw) {
        msg.innerText = "It's a Draw!";
        msgcontainer.classList.remove("hide");

        disablebox();
    }
};
const disablebox=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enablebox=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerHTML="";
    }
}
const resetgame=()=>{
    turnO=true;
    enablebox();
    msgcontainer.classList.add("hide");
}
scoreX=0;
scoreO=0;
const showWinner=(winner)=>{
    msg.innerHTML=`congratulations ${winner} is the winner`;
    msgcontainer.classList.remove("hide");
    disablebox();
}
const updateScore=(winner)=>{
    if(winner==="X"){
        score.innerHTML=`Score X: ${scoreX+=1}`;
    }
    else if(winner==="O"){
        score2.innerHTML=`Score O: ${scoreO+=1}`;
    }
}
const checkwinner=()=>{
    for(let pattern of winpatterns){
        let pos1=boxes[pattern[0]].innerHTML;
        let pos2=boxes[pattern[1]].innerHTML;
        let pos3=boxes[pattern[2]].innerHTML;
        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1==pos2 && pos2==pos3){
                console.log('winner found');
                showWinner(pos1);
                updateScore(pos1);

                
            }
        }
    }

}
newgamebtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);

