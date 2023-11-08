import {encryptCaesar} from "./caesar";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function indexCodeword(textPosition:number, codeword:string): number {
    let codewordIndex:number = textPosition % codeword.length
    return codewordIndex
}

export function rotatingLetters(text:string, codewordRotations:number[]): string{
    let textArray:string[] = text.toUpperCase().split("")
        .filter((e)=>{
            return alphabet.includes(e)
        })
    let outputText:string[] = textArray.map((e, index) =>{
        let allRotations = codewordRotations[index % codewordRotations.length]
        return encryptCaesar(e, allRotations)
    })
    return outputText.join("")
}

export function encryptVigenere(text:string, codeword:string): string{
    let codewordArray:string[] = codeword.toUpperCase().split("")
    let codewordLetters:string[] = codewordIndexes.map((e)=>{
        return codewordArray[e]
    })
    let rotations:number[] = codewordLetters.map((e) =>{
        return alphabet.indexOf(e)
    })
    return rotatingLetters(text, rotations)
}

export function decryptVigenere(text:string, codeword:string): string{

}