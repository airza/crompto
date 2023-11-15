import {encryptCaesar} from "./caesar";
import _ from 'lodash';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


// todo fix capital letters in splitCodewordWise and getTextSubset
// todo throw an error when there's a number where there shOULDNT BE
// todo allow spaces in code word

export function encryptVigenere(text:string, codeword:string): string{
    return rotatingLetters(text, getEncryptRotation(codeword))
}

export function decryptVigenere(text:string, codeword:string): string{
    if (hasEvilCharacters(codeword)) {
        throw new Error ("Your codeword is evil! >:c");
    }
    let decryptRotations:number[] = getEncryptRotation(codeword).map((e)=>{
        return e * -1
    })
    return rotatingLetters(text, decryptRotations)
}

export function getEncryptRotation(codeword:string): number[]{
    if (hasEvilCharacters(codeword)) {
        throw new Error ("Your codeword is evil! >:c");
    }
    let codewordLettersOnly:string[] = codeword.toUpperCase().split("").filter((e)=>{
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

export function getTextSubset(text:string, codewordLength:number, offset:number):string{
    let textArray:string[] = text.split("")
    return (textArray.filter((e, i)=>{
        return i % codewordLength == offset
    })
    .join(""))
}

export function splitTextCodewordwise(text:string, codeword:string):string[]{
    if (hasEvilCharacters(codeword)) {
        throw new Error (`Your codeword ${codeword} is evil! >:c`);
    }
    if (codeword.length < 2) {
        throw new Error (`Codeword ${codeword} makes this a caesar cipher, not a vigenere, you dumb bitch.`);
    }
    let codewordArray = codeword.split("")
    return codewordArray.map((e, i)=>{
        return getTextSubset(text, codeword.length, i)
    })
}

export function hasEvilCharacters(codeword:string):boolean{
    let codewordArray = codeword.toUpperCase().split("")
    return (codewordArray.some((e)=>{
        return !alphabet.includes(e)
    }))
}