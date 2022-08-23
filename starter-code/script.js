class Memory {
    constructor(){
        this._tiles=[];
        this._blunt = [];
        this._currentArr =[];
        this._score=[];
        this.prevMoves=[];
        this._numberOfPlayers =4;
        this._currentMove=[];
        this._currentObj=[];
        this._turn =1;
        this._selected = 0;
        this.currentBoard =[];
        this._remainingMoves=Infinity;
    }
    setscore(){
        this._score++;
    }
    getscore(){
        return this._score;
    }
    set numberOfPlayers(num){
        this._numberOfPlayers= num;
    }


    setTile(arr){
        /*takes an array of required tile
        and empties the tile property off previous type
        and reassings the new array */
        this._tiles=[];
        arr.forEach((tile, index) =>{
            let newTile = {};
            newTile[index]=tile;
            this._tiles.push(newTile);

        })
        
        
       
    }
    
    

    getBoard(num, level){
        /* num and level: ints;
        returns sqaure array of the number with the tiles given */
        let size = [];
        for(let i=0; i<num; i++){
            size.unshift([])
        }

        size.forEach(arr=>{
            
            let n=0;
            while(n<num){
                arr.push(...(Object.values(this._tiles[Math.floor(Math.random()*level)])));
                n++;
            }
        })
        this._currentArr =[];
        this._currentArr =size;
        console.log(size);
        return this._currentArr;

    }

    


    getMove(){
        // set current move to user selected elements
        let brd = document.querySelector('.board');
        let brdEl = brd.children;


        //console.log(brdEl);
        for(let tile of brdEl){ 
            
            tile.addEventListener('click', ()=> {

                if(this.pairCounter()==0){
                    document.querySelector('.gameOver').style.display='flex';
                    this.showScores();
                }   

                console.log(tile.classList);
                if(tile.classList.contains('blunt')){
                    tile.classList.toggle('markClick');
                    if(tile.classList.contains('markClick')){
                        try{
                            this._currentMove.push(tile.innerHTML);
                        // console.log(this._currentMove, 'this is the current move');
                        this._selected++;
            
                            
            
                     tile.classList.add('iconClick');

                        } catch(e){}
    
                    }
                    
                }
            
            // tile.classList.remove('blunt');

            console.log(tile.innerHTML, 'iner of inner');
            if(this._selected >=2){
                let brd=document.querySelector('.board');
                let brdEl = brd.children;
                
            for(let i of brdEl){

                i.classList.remove('markClick');
            
            }
                this._selected =0;
            }
            
        });
        
        }
    
    }

    showScores(){
        let mainStat= document.querySelector('.mainStat');
        let multiPlayer = document.querySelector('.mult');
        let solo= document.querySelector('.soloStat');
        mainStat.innerHTML='';

        if(this._numberOfPlayers==1){ //solo game-Over

            solo.style.display='flex';
            multiPlayer.style.display='none';
            document.querySelector('.com1').style.display='none';

            let moves = document.querySelector(".moves.ex");
            let attempts = document.createElement('h2');

            attempts.innerHTML=`${this._score[1].attempts} Moves`;
            moves.appendChild(attempts);

            let time = document.querySelector('.time.ex');

            let timeRep = document.createElement('h2');
            timeRep.innerHTML=`${document.querySelector('.min').innerText}:${document.querySelector('.sec').innerText}`;
            time.appendChild(timeRep);
            
        }else{

        solo.style.display='none';
        multiPlayer.style.display='flex';
        document.querySelector('.com1').style.display='flex';

            
        let rank = [];
        let el = [];
        for(let i=1; i<this._score.length; i++){
            rank.push(this._score[i].score);
            let mainDiv = document.createElement('div');
            mainDiv.className='ex';
            let divP = document.createElement('div');
            let divPText = document.createTextNode(`Player ${i}`);
            divP.appendChild(divPText);
            // console.log(divP, 'this is divp');

            let divScore = document.createElement('div');
            let divScoreText = document.createTextNode(`${this._score[i].score} Pairs`);
            divScore.appendChild(divScoreText);

            mainDiv.appendChild(divP);
            mainDiv.appendChild(divScore);
            el.push(mainDiv);

            
        
        }

        

        rank= rank.sort((a, b)=>b-a);
        let noMax = 0;  //to count winners
        mainStat.innerHTML='';
        console.log(rank, 'this is rank sorted');
        for(let i of el){  // For adding winners
            console.log(i);
            i.style.margin='.5%'
            if(parseInt(i.lastElementChild.innerHTML.slice(0,1)) == Math.max(...rank)){
                let s = document.createElement('span');
                s.innerHTML='{winner}';
                i.insertBefore(s, i.lastElementChild);
                i.classList.add('winner');
                mainStat.appendChild(i);
                noMax++;

            }
        }

        console.log(rank, noMax, 'this is rank after adding max');

        rank= rank.slice(noMax); // to remove winners
        console.log(rank, 'this is rank after rm max');


        for(let i of el){  // for adding others 
            if(parseInt(i.lastElementChild.innerHTML.slice(0,1)) == Math.max(...rank)){
                document.querySelector('.mainStat').appendChild(i);
                rank = rank.slice(1);
            }
            console.log(rank, 'this is rank remaining');

        }

        // for adding heading
        if(noMax>1){
            document.querySelector('.hail').innerHTML=`It's a tie!`
        }else{
            let wNo = document.querySelector('.mainStat').firstElementChild.firstElementChild.innerText.slice(-1);
            document.querySelector('.hail').innerHTML=`Player ${wNo} Wins!`
        }

        }
    }


    pairCounter(){
        let brd=document.querySelector('.board');
        let brdEl = brd.children;
        let brdArr =[];
        let itar =[];
        for(let i of brdEl){
            if(i.classList.contains('blunt')){
                brdArr.push(i.innerText)
            };
            
        }
        // console.log(brdArr, 'brd arra')
        let pair = brdArr.reduce((last, curr, index, ar)=>{
            let valnum=0;
            // console.log('i am valnum', valnum)
                if(curr!='<div></div>' && curr!=""){
                    if(!itar.includes(curr)){
                        itar.push(curr);
                        if(itar.includes(curr)){
                            ar.slice(index).forEach((e)=>{
                            
                                if(curr == e){
                                    valnum++;
                                    // console.log(curr+"-"+ e +'-'+ valnum)
    
                                }
                            })
                        }
                    }
                    
                    
                }
                return last+ Math.floor(valnum/2);
            }, 0)
            this._remainingMoves=pair;
        console.log( 'you have', pair, 'moves remaining');
        return pair;
    }



    getObject(){
        // get a object of the current move 
        let tileIndex = this._currentMove.reduce((last, el)=>{
            for(let tile of this._tiles){
                if(Object.values(tile).flat()==el){
                    last.push(tile);
                    return last;
                }
            }
                
            
        }, [],)
        this._currentObj=tileIndex;
        
    }



    moveOperation(){
        // return a promise which resoolve when player chooces two tiles
        return new Promise((resolve, reject)=>{
            let currentlength = 0;
            setInterval(()=>{

                //console.log(this._currentMove, 'current array')
               currentlength = this._currentMove.length;
               if(currentlength==2){
                
                this.getObject();
                console.log('resolved')
                //this._currentMove=[];
                // console.log(this._currentObj, 'this what is not working');
                
                resolve (this._currentObj.splice(0, 2));
                
            }
            }, 10)

                   
        })
    }

    gameLogic(){
        this.moveOperation().then(
            currentMoveObj =>{
                this._currentMove=[];

                console.log(currentMoveObj, 'current move obj')
                let indexArr = currentMoveObj.reduce((last, cur)=>{
                    for(let i in cur){
                        last.push(i);
                    }
                    return last;
    
                }, [],)
            
                return indexArr;
            } 
            
        )
        .then((indexArr)=>{
            this.playerRegisterer();
            let brd = document.querySelector('.board');
                let brdEl = brd.children;
            // console.log(indexArr, 'this na index array');
            if(indexArr[0]==indexArr[1] ){
                if(indexArr[0]<100){
                    this.scoreManager();
                    
                }

                for(let e of brdEl){
                    if(e.classList.contains('lastPlay')){ 
                        e.classList.remove('lastPlay');
                        
                    }
                
                };
                // to remove blunts class from tile
                
                for(let e of brdEl){
                    if(e.classList.contains('iconClick')){ 
                        e.classList.remove('blunt');
                        e.classList.add('lastPlay');
                        
                    }
                
                };
                this.pairCounter();
            }
            for(let e of brdEl){
                if(e.classList.contains('iconClick')){ 
                    
                    e.classList.remove('iconClick')
                    
                }
            
            };

            this.turnManager(); //position is important
        }).then(()=>this.gameLogic())

        
    }

    turnManager(){
        // manages turn switching 
        
        this._turn += 1;
        if(this._turn > this._numberOfPlayers){
            this._turn=1;
        }

        let currentPlayer = document.querySelector(`.pl${this._turn}`);

        if(this._numberOfPlayers==1){ // showing attempts for a single player
            let moves = document.querySelector('.moves');
            moves.innerHTML= `${this._score[1].attempts}`;
        }
        
        let p =(document.querySelectorAll('.p'));
        for(let i of p){
            i.classList.remove('currentPlayer');
            i.nextElementSibling.style.visibility='hidden';
            i.previousElementSibling.style.visibility='hidden';

        }
        currentPlayer.classList.add('currentPlayer');
        currentPlayer.nextElementSibling.style.visibility='visible';
        currentPlayer.previousElementSibling.style.visibility='visible';
        console.log('current turn', this._turn);
    }

    playerRegisterer(){
        // player registerer

        this._score[this._turn] ?? this._score.push({'playerNumber': this._turn, 'score':0, 'attempts':0});
        this._score[this._turn].attempts +=1;
    }

    scoreManager(){
        // responsible for player scoring
        this._score[this._turn].score +=1;

        // showing player scores in DOM
        document.querySelector(`#plScore${this._turn}`).innerHTML=this._score[this._turn].score;

        // console.log(this._score, 'is the current score arr ');

    }


    

}

let icon=[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], ['<i class="fas fa-futbol" aria-hidden="true"></i>', '<i class="fa-solid fa-anchor"></i>', '<i class="fa-solid fa-flask"></i>',
'<i class="fa-solid fa-sun"></i>', '<i class="fa-solid fa-bug"></i>', '<i class="fa-regular fa-moon"></i>', '<i class="fa-solid fa-snowflake"></i>','<i class="fa-solid fa-turkish-lira-sign"></i>', '<i class="fa-solid fa-car"></i>' ]]

// let game = new Memory();
// //TEST
// game.setTile(icon[0])
// let bo = game.getBoard(6, 5);
// let boar =loadBoard(bo);
// console.log(boar);
// display(boar);
// game.getMove();
// game.getObject()
// game.moveOperation();
// game.gameLogic();

// TEST OVER
function loadBoard(arr){
    // arr: two-dimensional array 
    // and displays it to user
    let tileElementArr= [];
    for(let i=0; i<arr.length; i++){
        for(let j=0; j<arr[i].length; j++){
        let T = document.createElement('div');
        T.innerHTML=arr[i][j];

        // set tile Element size on board
        if(arr.length==4){
            T.classList.add('tile4');
        }else{T.classList.add('tile6')}
        
        // if(arr[i][j]=='<div></div>'){ // to markout blunt values
        //     T.classList.add('blunt');
        // }

        T.classList.add('blunt');

        tileElementArr[i] ?? tileElementArr.push([]);
        //console.log(tileElementArr)
        tileElementArr[i].push(T);
        }
        
    }
    return tileElementArr;
}



// function timeCounter(){
//     // for solo timer 
//     let start =  Date.now();


//     setInterval(()=>{
//         console.log('responding bro!!!!');
//         let end = Date.now();
//         let milSec = end - start;
        
//         document.querySelector('.min').innerHTML= Math.floor(milSec/60000);
//         document.querySelector('.sec').innerHTML= Math.floor(milSec/1000)%60;
        

//     }, 1000)
// }

let sint; // leave this 

function display(arr, game){
    // arr: array 
    // feeds it to the board
    
    let brd = document.querySelector('.board');
    
    brd.innerHTML='';// to cleanse board 

    

    for(let i of arr){
        for(let j of i){
            //console.log(j);
            brd.appendChild(j);
        }
    }
    if(game._numberOfPlayers==1){
        document.querySelector('.playerEl').style.display='none';
        document.querySelector('.solo').style.display='flex';
        let start = Date.now();
        soloTimer(start);
        let moves = document.querySelector('.moves');
        moves.innerHTML= `0`;
        
        game._score[1].attempts=0;
        game._score[1].score=0;

        let movesR = document.querySelector(".moves.ex h2");
        movesR ??= movesR.innerHTML='';
        let time = document.querySelector(".time.ex h2");
        time.innerHTML='';



    }else{
        document.querySelector('.playerEl').style.display='flex';

        document.querySelector('.solo').style.display='none';

        let p =(document.querySelectorAll('.p'));
        for(let i of p){
            i.classList.add('otherPlayer');
            i.nextElementSibling.style.visibility='hidden';
            i.previousElementSibling.style.visibility='hidden';

        }
        
        let firstPlayer = document.querySelector('.pl1');
    
        firstPlayer.classList.add('currentPlayer');
        firstPlayer.nextElementSibling.style.visibility='visible';
        firstPlayer.previousElementSibling.style.visibility='visible';

        
        for(let i=1; i<5; i++){
            document.querySelector(`#plScore${i}`).innerHTML=0;
        }

    }

    for(let i=1; i<game._score.length; i++){ //to clear Scores
        game._score[i].attempts=0;

    }

    document.querySelector('.gameOver').style.display='none';

    // document.querySelector('.mainStat');
    document.querySelector('.mult').style.display='none';
    document.querySelector('.soloStat').style.display='none';

}
function levelVar(st, difficulty=3){
    // choose level of difficulty 
    let n = Math.random();
    let dif =n;

    while(n<(difficulty/10)){  //avoiding zero prob
        n=Math.random();
        dif=n;
        console.log(dif, 'thi is difficulty level');
    } 
    
    if(st=='numbers'){

    return Math.floor(dif*16); // to be tunned
    }
    return Math.floor(dif*10);


}

function setNumberOfPlayers(game, arr){
        // game: game object
        // arr: array of htmlcollection
        // set the numbers of players in game
    // console.log(arr, 'player num');
    try{
        for(let i of arr){
            // console.log(typeof(parseInt(i.innerText)))
            // console.log(i);
            i.addEventListener('click', ()=>{
                arr.forEach(e =>{
                    e.classList.remove('startClick');
                    
                });
                i.classList.add('startClick');
                i.style.backgroundColor='';
                // console.log(i, 'you clicked me', i.classList, i.style.backgroundColor);
                game._numberOfPlayers = parseInt(i.innerText);
                console.log(game._numberOfPlayers);
    
            })
            
        }
        
    }
    catch{
        console.log('please choose tile and number of players')
    }

    

}

// restarting game
function restart(game){
        clearInterval(sint);
    //empties current board 
    // and displays an new ones
    game._remainingMoves=0;
        for(let i=1; i<game._score.length; i++){
            game._score[i].score=0;
        }
        game._turn=1;
        // making blunt
        let brd = document.querySelector('.board');
        brd.innerHTML='';
        for(let i of game.currentBoard){
            for(let j of i){
                j.classList.add('blunt');
            }
        }

        console.log(game.currentBoard);
        display(game.currentBoard, game);
        console.log('Game retarted');
        
}

function newGame(){
    clearInterval(sint);

    // GameController.abort();
    let brd = document.querySelector('.board');
        brd.innerHTML='';
    document.querySelector('body').classList.remove('body');
    document.querySelector('.startEl').style.display='flex';
    document.querySelector('.start').style.display='flex';
    
    document.querySelector('.gameBoard').style.display='none';
    // REVERTING ELEMENT COLORS
    document.querySelector('.p1').classList.remove('startClick');
    for(let i=2; i<5; i++){
        document.querySelector(`.p${i}`).classList.remove('startClick');
    }


    document.querySelector('.numbers').classList.remove('startClick');
    document.querySelector('.icons').classList.remove('startClick');

    
    document.querySelector('.grid4').classList.remove('startClick');
    document.querySelector('.grid6').classList.remove('startClick');

    document.querySelector('.grid4').addEventListener('click', (event)=>helpL(event));
    document.querySelector('.grid6').addEventListener('click', (event)=>helpL(event));

    
    // setting the number of players
    let playerNumber = document.querySelectorAll('.player');
    for(let i of playerNumber){
        i.addEventListener('click', ()=>{
            playerNumber.forEach(e =>{e.classList.remove('startClick')});
            i.classList.add('startClick');
        });
    }



    function helpL(event){
        let grid4 = document.querySelector('.grid4');
        let grid6 = document.querySelector('.grid6');
        if(event.target.classList.contains('grid6')){
            grid6.classList.add('startClick');
            grid4.classList.remove('startClick');
            gridSize=6;
        }
        else{
            grid4.classList.add('startClick');
            grid6.classList.remove('startClick');
        }
    }

    

}




function loadIcons(event, game, grid4, grid6, currentBoard, loadBoard, levelVar, display, tile){
    try{
        let gridSize = 4;
        if(event.target.classList.contains('grid6')){
            grid6.classList.add('startClick');
            grid4.classList.remove('startClick');
            gridSize=6;
        }
        else{
            grid4.classList.add('startClick');
            grid6.classList.remove('startClick');
        }
        currentBoard = [];
        
        currentBoard = loadBoard(game.getBoard(gridSize, levelVar(tile)));
        game.currentBoard=currentBoard;
        return display(currentBoard, game);
    
        }

        catch{
            console.log('must first choose tile');
    }

}







// MAIN GAME

let main_Game_Controler= 0;

function GAME(){
    if(main_Game_Controler !== 0){
        return;
    }else{
        let game = new Memory();
    game._score.length=1; // mde score manager to work well
    


    // choosing tile type
    let tile = '' // for detecting tyle type in gridload level setting
    let iconTile= document.querySelector('.icons');
    let numberTile = document.querySelector('.numbers');
    iconTile.addEventListener('click', (event)=>{

        iconTile.classList.add('startClick');
        numberTile.classList.remove('startClick');
        game.setTile(icon[1]);
        tile = 'icons';
    });
    numberTile.addEventListener('click', (event)=>{
        iconTile.classList.remove('startClick');
        numberTile.classList.add('startClick');
        game.setTile(icon[0]);
        tile='numbers'
    });

    // choosing board size
    let grid4 = document.querySelector('.grid4');
    let grid6 = document.querySelector('.grid6');
    let currentBoard = [];
    grid4.addEventListener('click', (event)=>loadIcons(event, game, grid4, grid6, currentBoard, loadBoard, levelVar, display, tile));
    grid6.addEventListener('click', (event)=>loadIcons(event,game, grid4, grid6, currentBoard, loadBoard, levelVar, display, tile));

    // start listening for moves
    document.querySelector('.begin').addEventListener('click', ()=>{
        if(game._numberOfPlayers==1){
            
        }
        game.getMove();
    });

    
    // Restarting game
    for(let i of document.querySelectorAll('.restart')){
        i.addEventListener('click', ()=> {
            restart(game);
     
         })
    } 

    // setting the number of players
    let playerNumber = document.querySelectorAll('.player');
    setNumberOfPlayers(game, playerNumber);

    // Game logic
   game.gameLogic();

    // halting and 
    

   
    }

}

GAME()

// the code below is for switching between start screen and board

document.querySelector('.begin').addEventListener('click', function board(){
    document.querySelector('body').className='body';
    document.querySelector('.startEl').style.display='none';
    document.querySelector('.start').style.display='none';
    
    document.querySelector('.gameBoard').style.display='flex';
});

// new game
for(let i of document.querySelectorAll('.newGame')){
    i.addEventListener('click', ()=> {
        newGame();
        
 
     })
} 
// document.querySelector('.newGame').addEventListener('click', ()=>{});

// soloTimer(start)();

function soloTimer(start){
    // for solo timer 
    sint = setInterval(()=>{ 
    console.log('responding bro!!!!');
    let end = Date.now();
    let milSec = end - start;
    
    document.querySelector('.min').innerHTML= Math.floor(milSec/60000);
    document.querySelector('.sec').innerHTML= Math.floor(milSec/1000)%60;
    }, 1000)
    
    
}

