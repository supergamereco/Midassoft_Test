
//main
export function getQuestionPart(_phrases:string[]):string[] {
    let words: string[] = new Array;
    let answers: string[] = getAnswer(_phrases);
    if(checkAnswer(answers))
        words = removerAnserFromWords(answers[0], _phrases);
    else    
        console.log("error: all words need to shared the same answer.")
    return words;
}

//Solution for answer
export function getAnswer(_phrases:string[]):string[]{
    let answers:string[] = new Array;
    for(let i = 1; i < _phrases.length; i++){
        let matchWordLefttoRight = _phrases[i-1];
        let matchWordRighttoLeft = reverseText(_phrases[i-1]);
        let wordRighttoLeft = reverseText(_phrases[i]);
        matchWordLefttoRight = findSimilarWord(_phrases[i], matchWordLefttoRight);
        matchWordRighttoLeft = findSimilarWord(wordRighttoLeft, matchWordRighttoLeft);
        if(matchWordRighttoLeft.length > matchWordLefttoRight.length){
            matchWordRighttoLeft = reverseText(matchWordRighttoLeft);
            answers.push(matchWordRighttoLeft);
        }
        else if(matchWordRighttoLeft.length < matchWordLefttoRight.length){
            answers.push(matchWordLefttoRight);
        }
    }
    return answers;
}

//Remove answer from all words
export function removerAnserFromWords(_answer:string, _words:string[]):string[]{
    let words: string[] = new Array;
    for(let i = 0; i < _words.length; i++){
        _words[i] = _words[i].replace(_answer, "").replace(" ", "");;
        words.push(_words[i]);
    }
    return words;
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
        let temp = wordLefttoRightTemp;
        wordLefttoRightTemp += _text.replace(" ", "").charAt(j);
        if(!matchWord.includes(wordLefttoRightTemp)){
            wordLefttoRightTemp = temp;
            break;
        }
    }    
    return wordLefttoRightTemp;
}

//Test
let input1: string[] = ["BATHROOM", "BATH SALTS", "BLOODBATH"];
let input2: string[] = ["BEFRIEND", "GIRLFRIEND", "FRIENDSHIP"];
let input3: string[] = ["DESERT EAGLE", "BLACK DESERT", "RED DESERT"];

console.log(getQuestionPart(input1));
console.log(getQuestionPart(input2));
console.log(getQuestionPart(input3));
