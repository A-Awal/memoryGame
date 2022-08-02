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

    getBoard(num, level){
        /* num and level: ints;
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

    move(id1, id2){
        
    }


}