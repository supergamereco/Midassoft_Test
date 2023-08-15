let words: string[] = new Array;
let answers: string[] = new Array;

export function getQuestionPart(_phrases:string[]):string[] {
    getAnswer(_phrases);
    if(checkAnswer(answers))
        removerAnserFromWords(answers[0], _phrases);
    else    
        console.log("error: all words need to shared the same answer.")
    return words;
}

//Solution for answer
function getAnswer(_phrases:string[]){
    for(let i = 1; i < _phrases.length; i++){
        let matchWordLefttoRight: string = "";
        let matchWordRighttoLeft: string = "";
        matchWordLefttoRight = _phrases[i-1];
        matchWordRighttoLeft = reverseText(_phrases[i-1]);
        let wordRighttoLeft: string;
        matchWordLefttoRight = findSimilarWord(_phrases[i], matchWordLefttoRight);
        wordRighttoLeft = reverseText(_phrases[i]);
        matchWordRighttoLeft = findSimilarWord(wordRighttoLeft, matchWordRighttoLeft);
        if(matchWordRighttoLeft.length > matchWordLefttoRight.length){
            matchWordRighttoLeft = reverseText(matchWordRighttoLeft);
            answers.push(matchWordRighttoLeft);
        }
        else if(matchWordRighttoLeft.length < matchWordLefttoRight.length){
            answers.push(matchWordLefttoRight);
        }
    }
}

//Remove answer from all words
function removerAnserFromWords(_answer:string, _words:string[]){
    for(let i = 0; i < _words.length; i++){
        _words[i] = _words[i].replace(_answer, "");
        words.push(_words[i]);
    }
}

//Check if all words has the same answer
export function checkAnswer(_answer:string[]):boolean{
    let similarAns: boolean = true;
    for(let i = 1; i < _answer.length; i++){
        if(_answer[i] != _answer[i - 1]){
            similarAns = !similarAns;
            break;
        }
    }
    return similarAns;
}

//Reverse text by reindex them
export function reverseText(_text:string):string{
    let wordRighttoLeftTemp: string = "";
    for(let j = _text.length; j >= 0; j--){
        wordRighttoLeftTemp = wordRighttoLeftTemp + _text.charAt(j);
    }
    return wordRighttoLeftTemp;
}

//Find similar word in strings
export function findSimilarWord(_text:string, matchWord:string):string{
    let wordLefttoRightTemp: string = "";
    for(let j = 0; j < _text.length; j++){
        let temp: string;
        temp = wordLefttoRightTemp;
        wordLefttoRightTemp += _text.charAt(j);
        if(!matchWord.includes(wordLefttoRightTemp)){
            wordLefttoRightTemp.replace(wordLefttoRightTemp, temp);
            wordLefttoRightTemp = temp;
            break;
        }
    }    
    return wordLefttoRightTemp;
}

getQuestionPart(["BATHROOM", "BATH SALTS", "BLOODBATH"]);
//getQuestionPart(["BEFRIEND", "GIRLFRIEND", "FRIENDSHIP"]);
//getQuestionPart(["DESERT EAGLE", "BLACK DESERT", "RED DESERT"]);

console.log(words);
