//METHOD ONE
    //split code word
    //for first letter of code word (and then second etc),
        //get every xth letter from text
        //caesar rotate
    //recombine

//METHOD TWO
    //map plain text to how much to rotate it by
        //how much do we want to rotate
    //execute rotation and put back together

/*
NOP
SPHINX THING IDK
012345 67890 123
012012 01201 201
 */

export function indexCodeword(textPosition:number, codeword:string): number {
    let codewordIndex:number = textPosition % codeword.length
    return codewordIndex
}

export function encryptVigenere(text:string, codeword:string): string{
    debugger;
    let textArray = text.split("")
    let codewordArray = codeword.split("")
    let killmeArray = textArray.map((e, index) =>{
    })
}

/*
export function figureRotation()
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
 */