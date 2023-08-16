
//main
export function getHandScore(_input:string):number{
    let scores: number[] = new Array;
    let suit: string[] = new Array;
    let AceScore:number = 11;
    let FaceScore:number = 10;
    //#region Collect score and rank on cards
    let cards = _input.split(" ");
    for(let i = 0; i < cards.length; i++){
        suit.push(cards[i].charAt(0));
        let card: any = cards[i].slice(1);
        if(card == 'A')
            card = AceScore;
        else if(card == 'J' || card == 'Q' || card == 'K')
            card = FaceScore;
        scores.push(card);
    }
    //#endregion
    let score = sumScore(scores, suit, cards);
    return score;
}

//Find duplicate rank of card and give score for triple duplicated
export function findDuplicateRank(_cards:string[]):number{
    let duplicated: boolean = true;
    let bonusScore:number = 0;
    let tripleValueScore:number = 32.5;
    let tripleAceScore:number = 35;
    for(let i = 0; i < _cards.length; i++){
        if(i != 0 && _cards[i - 1].charAt(1) != _cards[i].charAt(1) || !duplicated)
                duplicated = false;
    }
    if(duplicated){
        if(_cards[0].charAt(1) == 'A')
            bonusScore = tripleAceScore;
        else
            bonusScore = tripleValueScore;
    }else
        bonusScore = 0;
    return bonusScore;
}

//Calculate score here
export function sumScore(_scores:number[], _suit:string[], _cards:string[]):number{
    let cardInHand = new Map<string, number>();
    for(let i = 0; i < _suit.length; i ++){
        if(!cardInHand.has(_suit[i]))
            cardInHand.set(_suit[i], _scores[i]);
        else
            cardInHand.set(_suit[i], Number(cardInHand.get(_suit[i])) + Number(_scores[i]));
    }
    let bonusScore:number = findDuplicateRank(_cards);
    let m_score = Math.max(...cardInHand.values()) + bonusScore;
    return m_score;
}

//Test
let input1: string = "S8 S10 CA";
let input2: string = "CK C10 CA";
let input3: string = "D9 SK D7";

console.log(getHandScore(input1));
console.log(getHandScore(input2));
console.log(getHandScore(input3));
