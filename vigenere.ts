import {encryptCaesar} from "./caesar";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encryptVigenere(text:string, codeword:string): string{
    return rotatingLetters(text, getEncryptRotation(codeword))
}

export function decryptVigenere(text:string, codeword:string): string{
    let decryptRotations:number[] = getEncryptRotation(codeword).map((e)=>{
        return e * -1
    })
    return rotatingLetters(text, decryptRotations)
}

export function getEncryptRotation(codeword:string): number[]{
    let codewordArray:string[] = codeword.toUpperCase().split("")
    let codewordLettersOnly:string[] = codewordArray.filter((e)=>{
        return alphabet.includes(e)
    })
    return codewordLettersOnly.map((e)=>{
        return alphabet.indexOf(e)
    })
}

export function rotatingLetters(text:string, rotations:number[]): string{
    let textArray:string[] = text.toUpperCase().split("")
    let textLettersOnly:string[] = textArray.filter((e)=>{
        return alphabet.includes(e)
    })
    let outputText:string[] = textLettersOnly.map((e, index) =>{
        let currentRotation:number = rotations[index % rotations.length]
        return encryptCaesar(e, currentRotation)
    })
    return outputText.join("")
}