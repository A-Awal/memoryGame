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
        /*takes an array required tile
        and empties the tile prop off previous type
        and reassings the new array */
        this._tiles=[];
        arr.forEach((tile, index) =>{
            let newTile = {};
            newTile[index]=tile;
            this._tiles.push(newTile);
        })
          
        console.log(this._tiles);
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
        this._currentArr =size;
        console.log(size);
        return this._currentArr;

    }

    move(id1, id2){
        // takes two values
        // check if they are equal
        // replace them with blunt values
        // adjusts the scores

        if(id1===id2){
            this._score++;
        }
        this._currentArr[this._currentArr.findIndex(id1)]==this._blunt;
        this._currentArr[this._currentArr.findIndex(id2)]==this._blunt;

    }

    getMove(){
        // set current move to user input selected elements
        let brd = document.querySelector('.board');
        let brdEl = brd.children;
        //console.log(brdEl);
        for(let tile of brdEl){ 
            tile.addEventListener('click', ()=> {this._currentMove.push(tile.innerHTML)
            console.log(this._currentMove, 'this is the current move');
            //tile.addEventListener('click', (event)=>event.target.className='iconClick')
        });
        }
    
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
            if(indexArr[0]===indexArr[1]){
                // this.setscore()
                this.scoreManager()
            }
            console.log(indexArr);
            this.turnManager();
        }).then(()=>this.gameLogic())

        
    }

    turnManager(){
        // manages turn switching 
        
        this._turn += 1;
        if(this._turn > this._numberOfPlayers){
            this._turn=1;
        }

        let currentPlayer = document.querySelector(`.pl${this._turn}`);
        
        currentPlayer.style.backgroundColor='red';
        currentPlayer.nextElementSibling.style.display='block';
        console.log('current turn', this._turn);
    }

    scoreManager(){
        // responsible for player scoring
         // to adjust for 0 base of arrays
        this._score[this._turn] ?? this._score.push({'playerNumber': this._turn, 'score':0});
        this._score[this._turn].score +=1;
        console.log(this._score, 'is the current score arr ')
    }

}

let icon=[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], ["<i class='fas fa-futbol'></i>", "<i class='fa-solid fa-anchor'></i>", '<i class="fa-solid fa-flask"></i>',
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
        T.classList.add('tile6');
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
function levelVar(st){
    if(st=='numbers'){
        return Math.floor(Math.random()*16); // to be tunned
    }
    return Math.floor(Math.random()*10);
}





// MAIN GAME
function GAME(){
    let game = new Memory();
    game._score.length=1; // mde score manager to work well

    // choosing tile type
    let tile = '' // for detecting tyle type in gridload level setting
    let iocnTile= document.querySelector('.icons');
    let numberTile = document.querySelector('.numbers');
    iocnTile.addEventListener('click', ()=>{
        game.setTile(icon[1]);
        tile = 'icons';
    });
    numberTile.addEventListener('click', ()=>{
        game.setTile(icon[0]);
        tile='numbers'
    });

    // choosing board size
    let grid4 = document.querySelector('.grid4');
    let grid6 = document.querySelector('.grid6');
    let currentBoard = [];

    
    grid4.addEventListener('click', ()=>{
        currentBoard = loadBoard(game.getBoard(4, levelVar(tile)));
        return display(currentBoard);
    });

    grid6.addEventListener('click', ()=>{
        currentBoard = loadBoard(game.getBoard(6, levelVar(tile)));
        return display(currentBoard);
        });

    // start listening for moves
    document.querySelector('.begin').addEventListener('click', ()=>game.getMove());
    
    // Restarting game
    document.querySelector('.restart') .addEventListener('click', ()=>{
        let brd = document.querySelector('.board');
        for(let i of currentBoard){
            brd.removeChild(brd.firstChild)
                
        }
        display(currentBoard);
        console.log('Game retarted')
    })
    // Game logic
   game.gameLogic();

    
}

GAME()

// the code below is for switching between start screen and board

document.querySelector('.begin').addEventListener('click', function board(){
    document.querySelector('body').className='body';
    document.querySelector('.start').style.display='none';
    document.querySelector('.gameBoard').style.display='block';
});

