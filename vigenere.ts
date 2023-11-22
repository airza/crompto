import {encryptCaesar, frequencyAnalysis, klDivergence} from "./caesar";
import _ from "lodash";
import englishSample from "./references/longEnglish.txt"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//todo somehow return punctuation to decrypted text? save & reconstruct from indexes?
//todo KLBITCh

export function prepareText(text:string):string[]{
    return text.toUpperCase().split("").filter((e)=>{
        return alphabet.includes(e)
    })
}

export function prepareCodeword(codeword:string):string[]{
    let codewordArraySpaceless:string[] = codeword.toUpperCase().split("").filter((e)=>{
        return (e !== " ")
    })
    if (codewordArraySpaceless.length < 2) {
        throw new Error (`Your codeword, "${codeword}", makes this a caesar cipher, not a vigenere, you dumb bitch.`);
    }
    if (codewordArraySpaceless.some((e)=>{
        return !alphabet.includes(e)
        })) {
        throw new Error(`Your codeword, "${codeword}", is evil! >:c`);
    }
    return codewordArraySpaceless
}

export function getEncryptRotations(codeword:string): number[]{
    return prepareCodeword(codeword).map((e)=>{
        return alphabet.indexOf(e)
    })
}

export function rotatingLetters(text:string, rotations:number[]): string{
    return (prepareText(text).map((e, index) =>{
        let currentRotation:number = rotations[index % rotations.length]
        return encryptCaesar(e, currentRotation)
    })
    .join(""))
}

export function encryptVigenere(text:string, codeword:string): string{
    return rotatingLetters(text, getEncryptRotations(codeword))
}

export function decryptVigenereSimple(text:string, codeword:string): string{
    let decryptRotations:number[] = getEncryptRotations(codeword).map((e)=>{
        return e * -1
    })
    return rotatingLetters(text, decryptRotations)
}

export function splitTextCodeletterwise(text:string, codewordLength:number, offset:number):string{
    return ((prepareText(text)).filter((e, i)=>{
        return i % codewordLength == offset
    })
    .join(""))
}

export function splitTextCodewordLengthwise(text:string, codewordLength:number):string[]{
    return _.range(codewordLength).map(e=>{
        return splitTextCodeletterwise(text.toUpperCase(), codewordLength, e)
    })
}

//todo freqan takes (text: string): Frequencies //[string,number][]
//todo KLBITCH takes (freqText: Frequencies, freqRef: Frequencies): number

export function calculateCodewordLength(text:string, maximumLength:number=20, referenceEnglish:string=englishSample):number{
    let referenceFrequenciesEnglish = frequencyAnalysis(referenceEnglish)
    let HELLO = _.range(2, maximumLength+1).map(e=> {                              //outputs [Frequencies][]
        return splitTextCodewordLengthwise(text, e).map(el => {                        //outputs Frequencies[]
            return klDivergence(frequencyAnalysis(el), referenceFrequenciesEnglish)    //outputs number for every
        })
    });
    debugger;
    return 4;
}