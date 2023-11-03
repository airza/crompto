/*

 */


/*
NOP
SPHINX THING IDK
012345 67890 123
012012 01201 201
 */

export function indexCodeword(textPosition:number, codeword:string): number {
    let codewordLength:number = codeword.length
    let codewordIndex:number = textPosition % codewordLength
    return codewordIndex
}