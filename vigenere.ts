import {encryptCaesar} from "./caesar";

export function indexCodeword(textPosition:number, codeword:string): number {
    let codewordIndex:number = textPosition % codeword.length
    return codewordIndex
}

function rotatingLetters(textArray:string[], rotations:number[]): string{
    let outputText:string[] = textArray.map((e, index) =>{
        let rotation = rotations[index]
        return encryptCaesar(e, rotation)
    })
    return outputText.join("")
}

export function encryptVigenere(text:string, codeword:string): string{
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let textArray:string[] = text.toUpperCase().split("")
        .filter((e)=>{
            return alphabet.includes(e)
        })
    let codewordArray:string[] = codeword.toUpperCase().split("")
    let codewordIndexes:number[] = textArray.map((e, index) =>{
        return indexCodeword(index, codeword)
    })
    let codewordLetters:string[] = codewordIndexes.map((e)=>{
        return codewordArray[e]
    })
    let rotations:number[] = codewordLetters.map((e) =>{
        return alphabet.indexOf(e)
    })
    let encrypted:string[] = textArray.map((e, index) =>{
        let rotation = rotations[index]
        return encryptCaesar(e, rotation)
    })
    return encrypted.join("")
}

export function decryptVigenere(text:string, codeword:string): string{

}