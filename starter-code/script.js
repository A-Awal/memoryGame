class Memory {
    constructor(){
        this._tiles=[];
        this._blunt = [];
        this._currentArr =[];

    }

    setTile(arr){
        /*takes an array required tile
        and empties the tile prop off previous type
        and reassings the new array */
        this._tiles=[];
        this._tiles.concat(arr);  
    }

    deficulty(level){    
    //   level: int
    // sets current to the tiles to play 
        let tile= this._tiles[Math.floor(Math.random()*level)];
    }

    getBoard(num, level){
        /*Takes an num and 
        returns sqaure array of the number with the tiles given */

        let tile= this._tiles[Math.floor(Math.random()*level)];

        let size = [];
        for(let i=0; i<num; i++){
            size.unshift([])
        }
        size.forEach(arr=>{
            let n=0;
            while(n<num){
                arr.push(tile);
                n++;
            }
        })
        this._currentArr =size;
        //console.log(size);
        return this._currentArr;
    }
}