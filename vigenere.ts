import {encryptCaesar} from "./caesar";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// todo fix capital letters in splitCodewordWise and getTextSubset
// todo throw an error when there's a number where there shOULDNT BE
// todo allow or disallow spaces in code word (now in SOME places)
// todo test for evil characters in encrypt+decrypt with known codeword
// todo make a prepText function instead of repeating this bitch

export function hasEvilCharacters(codeword:string):boolean{
    let codewordUppercase = codeword.toUpperCase().split("")
    return (codewordUppercase.some((e)=>{
        return !alphabet.includes(e)
    }))
}

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
    let codewordUppercase:string[] = codeword.toUpperCase().split("")
    return codewordUppercase.map((e)=>{
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
    let textArray:string[] = text.toUpperCase().split("")
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
    let codewordArray = codeword.toUpperCase().split("")
    return codewordArray.map((e, i)=>{
        return getTextSubset(text.toUpperCase(), codeword.length, i)
    })
}

// todo export function KLBITCH