export class Letters{
    allLetters:String[]=['a', 'b','v', 'g','d', 'dj','e', 'ž', 'z', 'i','j', 'k','l', 'lj','m', 'n','nj', 'o', 'p', 'r','s', 't','ć', 'u','f', 'h','c', 'č', 'dž', 'š'];

    getLetter(index:number):String{
        return this.allLetters[index];
    }
}