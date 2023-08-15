let angleDiff: number = 0;
let hhAngle: number;
let mmAngle: number;

export function getClockAngle(_hh_mm:string):number {
    let hh: string;
    let mm: string;
    hh = _hh_mm.slice(0, 2);
    mm = _hh_mm.slice(3, 5);
    convertTime(Number(hh), Number(mm));
    return angleDiff;
}

//Convert digital time to analog
function convertTime(_hh:number, _mm:number){
    if(_hh > 12)
        _hh -= 12;
    mmAngle = _mm * 6;
    hhAngle = mmAngle/12 + (_hh * 30);
    calculateAngleDiff(hhAngle, mmAngle);
}

//Calculate different between hour and minute hands
function calculateAngleDiff(_hhAngle:number, _mmAngle:number){
    if(_hhAngle >= 360)
        _hhAngle = _hhAngle - 360;
    if(_mmAngle == 0 && _hhAngle > 180)
        _mmAngle = 360;

    if(_hhAngle > _mmAngle)
        angleDiff = Math.abs(_mmAngle - _hhAngle);
    else
        angleDiff = Math.abs(_hhAngle - _mmAngle);
}

getClockAngle("09:00");
//getClockAngle("17:30");
//getClockAngle("14:10");

console.log("angleDiff " + angleDiff);
