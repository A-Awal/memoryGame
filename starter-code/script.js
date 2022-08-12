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
        
        
        // let bls = this._tiles.length-1;

        // this._tiles[Math.floor(Math.random()*bls)] = this.setBlunt();
        // this._tiles[Math.floor(Math.random()*bls)] = this.setBlunt();
        // this._tiles[Math.floor(Math.random()*bls)] = this.setBlunt();
        // console.log(this._tiles, 'a these the tile');
    }
    
    // setBlunt(){
    //     return {100: "<div></div>"};

    // }

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
            this._currentMove.push(tile.innerHTML);
            console.log(this._currentMove, 'this is the current move');
            this._selected++;
            
            tile.classList.add('iconClick');
            tile.classList.remove('blunt');

            console.log(tile.innerHTML, 'iner of inner');
            if(this._selected >2){
                for(let e of brdEl){
                    if(e.classList.contains('iconClick')){ // for setting selected to blunt
                        // e.innerHTML= Object.values(this.setBlunt());
                        this.pairCounter();
                        // e.removeEventListener('click', )
                        e.classList.remove('iconClick');
                        // e.classList.add('blunt');
                    }
                

                    
                };
                this._selected =0;
            }
            
        });
        
        }
    
    }

    pairCounter(){
        let brd=document.querySelector('.board');
        let brdEl = brd.children;
        let brdArr =[];
        let itar =[];
        for(let i of brdEl){
            brdArr.push(i.innerText);
        }
        console.log(brdArr, 'brd arra')
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
                                    console.log(curr+"-"+ e +'-'+ valnum)
    
                                }
                            })
                        }
                    }
                    
                    
                }
                return last+ Math.floor(valnum/2);
            }, 0)
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
        // for(let i of this._currentObj){
        //     console.log(i, 'current object')
        // }
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
            }, 100)

                   
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
            // console.log(indexArr, 'this na index array');
            if(indexArr[0]==indexArr[1] ){
                if(indexArr[0]<100){
                    this.scoreManager();
                    
                }
            }
            // if(this.pairCounter==0){
            //     console.log('Done bro. Game Over')
            //    }
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
        
        let p =(document.querySelectorAll('.p'));
        for(let i of p){
            i.style.backgroundColor= "var(--light-grey)";
            i.nextElementSibling.style.visibility='hidden';
            i.previousElementSibling.style.visibility='hidden';

        }
        currentPlayer.style.backgroundColor='#fda214';
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

function display(arr){
    // arr: array 
    // feeds it to the board
    let brd = document.querySelector('.board');

    for(let i of arr){
        for(let j of i){
            //console.log(j);
            //console.log(brd)
            brd.appendChild(j);
        }
    }
}
function levelVar(st, difficulty=5){
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
                arr.forEach(e =>{e.classList.remove('iconClick')});
                i.classList.add('iconClick');
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
function restart(currentBoard){
    //empties current board 
    // and displays an new ones
        let brd = document.querySelector('.board');
        for(let i of currentBoard){
            brd.removeChild(brd.firstChild)
                
        }
        display(currentBoard);
        console.log('Game retarted')
        
}

function loadIcons(event, game, grid4, grid6, currentBoard, loadBoard, levelVar, display, tile){
    try{
        let gridSize = 4;
        if(event.target.classList.contains('grid6')){
            grid6.classList.add('iconClick');
            grid4.classList.remove('iconClick');
            gridSize=6;
        }
        else{
            grid4.classList.add('iconClick');
            grid6.classList.remove('iconClick');
        }
        currentBoard = [];
        currentBoard = loadBoard(game.getBoard(gridSize, levelVar(tile)));
        return display(currentBoard);
    
        }

        catch{
            console.log('must first choose tile');
    }

}





// MAIN GAME
function GAME(){
    let game = new Memory();
    game._score.length=1; // mde score manager to work well
    


    // choosing tile type
    let tile = '' // for detecting tyle type in gridload level setting
    let iconTile= document.querySelector('.icons');
    let numberTile = document.querySelector('.numbers');
    iconTile.addEventListener('click', (event)=>{

        iconTile.classList.add('iconClick');
        game.setTile(icon[1]);
        tile = 'icons';
    });
    numberTile.addEventListener('click', (event)=>{
        iconTile.classList.remove('iconClick');
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
    document.querySelector('.begin').addEventListener('click', ()=>game.getMove());
    
    // Restarting game
    document.querySelector('.restart') .addEventListener('click', ()=> restart(currentBoard))

    // setting the number of players
    let playerNumber = document.querySelectorAll('.player')
    setNumberOfPlayers(game, playerNumber);

    // Game logic
   game.gameLogic();

   


}

GAME()

// the code below is for switching between start screen and board

document.querySelector('.begin').addEventListener('click', function board(){
    document.querySelector('body').className='body';
    document.querySelector('.startEl').style.display='none';
    document.querySelector('.start').style.display='none';
    
    document.querySelector('.gameBoard').style.display='block';
});

