
//main
export function getClockAngle(_hh_mm:string):number {
    let firstIndexOfHH: number = 0;
    let lastIndexOfHH: number = 2;
    let firstIndexOfMM: number = 3;
    let lastIndexOfMM: number = 5;
    let hh = _hh_mm.slice(firstIndexOfHH, lastIndexOfHH);
    let mm = _hh_mm.slice(firstIndexOfMM, lastIndexOfMM);
    let angleDiff = convertTime(Number(hh), Number(mm));
    return angleDiff;
}

//Convert digital time to analog
export function convertTime(_hh:number, _mm:number):number{
    if(_hh > 12)
        _hh -= 12;
    let mmAngle = _mm * 6;
    let hhAngle = mmAngle/12 + (_hh * 30);
    let angleDiff = calculateAngleDiff(hhAngle, mmAngle);
    return angleDiff;
}

//Calculate different between hour and minute hands
export function calculateAngleDiff(_hhAngle:number, _mmAngle:number):number{
    let angleDiff:number = 0;
    let angle0:number = 0;
    let angle180:number = 180;
    let angle360:number = 360;
    if(_hhAngle >= angle360)
        _hhAngle = _hhAngle - angle360;
    if(_mmAngle == angle0 && _hhAngle > angle180)
        _mmAngle = angle360;

    if(_hhAngle > _mmAngle)
        angleDiff = Math.abs(_mmAngle - _hhAngle);
    else
        angleDiff = Math.abs(_hhAngle - _mmAngle);
    return angleDiff;
}

//Test
let input1: string = "09:00";
let input2: string = "17:30";
let input3: string = "14:10";

console.log(getClockAngle(input1));
console.log(getClockAngle(input2));
console.log(getClockAngle(input3));
