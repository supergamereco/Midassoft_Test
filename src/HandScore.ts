let score: number = 0;
let bonusScore: number = 0;
let cardInHand = new Map<string, number>();

export function getHandScore(_input:string):number{
    let cards: string[];
    let scores: number[] = new Array;
    let suit: string[] = new Array;
    //#region Collect score and rank on cards
    cards = _input.split(" ");
    for(let i = 0; i < cards.length; i++){
        suit.push(cards[i].charAt(0));
        let card: any = cards[i].slice(1);
        if(card == 'A')
            card = 11;
        else if(card == 'J' || card == 'Q' || card == 'K')
            card = 10;
        scores.push(card);
    }
    //#endregion
    bonusScore = findDuplicateRank(cards);
    score = sumScore(scores, suit);
    return score;
}

//Find duplicate rank of card and give score for triple duplicated
export function findDuplicateRank(_cards:string[]):number{
    let duplicated: boolean = true;
    let m_bonusScore:number = 0;
    for(let i = 0; i < _cards.length; i++){
        if(i != 0 && _cards[i - 1].charAt(1) != _cards[i].charAt(1) || !duplicated)
                duplicated = false;
    }
    if(duplicated){
        if(_cards[0].charAt(1) == 'A')
            m_bonusScore = 35;
        else
            m_bonusScore = 32.5;
    }else
        m_bonusScore = 0;
    return m_bonusScore;
}

//Calculate score here
export function sumScore(_scores:number[], _suit:string[]):number{
    for(let i = 0; i < _suit.length; i ++){
        if(!cardInHand.has(_suit[i]))
            cardInHand.set(_suit[i], _scores[i]);
        else
            cardInHand.set(_suit[i], Number(cardInHand.get(_suit[i])) + Number(_scores[i]));
    }
    let m_score = Math.max(...cardInHand.values()) + bonusScore;
    return m_score;
}

getHandScore("S8 S10 CA");
//getHandScore("CK C10 CA");
//getHandScore("D2 SK D1");

console.log(score);
