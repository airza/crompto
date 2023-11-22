import englishSample from "./references/longEnglish.txt"
import dutchSample from "./references/longDutch.txt"
import {numberOfDFGCompiles} from "bun:jsc";

export type Frequencies = [string,number][];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function decryptCaesar(ciphertext: string, rotation: number): string {
    return (ciphertext.toUpperCase().split("").map(e=>{
        if (alphabet.includes(e)){
            return alphabet[(alphabet.indexOf(e) - rotation + alphabet.length) % alphabet.length]
        } else {
            return e
        }
    }).join(""))
}

export function encryptCaesar(ciphertext:string, rotation:number):string{
    return decryptCaesar(ciphertext,-rotation);
}

export function frequencyAnalysis(text: string): Frequencies {
    let frequencies: { [key: string]: number } = {};
    //setting starting frequency to 0ish for all letters:
    for (let letter of alphabet) {
        frequencies[letter] = 1e-10;
    }
    let textArray: string[] = text.toUpperCase().split("").filter((e) => {
        return alphabet.includes(e)
    })
    //constructing our frequency table:
    type FrequencyTable = {
        [key: string]: number
    }
    let letterFrequencies: FrequencyTable = textArray.reduce((currentTable: FrequencyTable, letter: string): FrequencyTable => {
            currentTable[letter]++
            return currentTable
        }
        , frequencies);
    //Turning this into a probability distribution:
    let textLength: number = textArray.length
    return Object.entries(letterFrequencies).map(e => {
        return [e[0], e[1] / textLength]
    })
}

export function sortByFrequency(frequencies:Frequencies):Frequencies{
    return frequencies.sort((a,b)=>{
        return b[1]-a[1];
    })
}

function sortByLetter(frequencies:Frequencies):Frequencies{
    return frequencies.sort((a,b)=>{
        return a[0]<b[0]?-1:1;
    })
}

export function klDivergence(freqText: Frequencies, freqRef: Frequencies): number {
    if (freqText.length !== freqRef.length) {
        throw new Error('Distributions must have the same length');
    }
    let lettersText = freqText.map(e=>e[0]);
    let lettersRef = freqRef.map(e=>e[0])
    if (!lettersText.every((el):boolean=>lettersRef.includes(el))) {
        throw new Error(`Distributions are not identical:${lettersText},${lettersRef}`);
    }
    let probsText = freqText.map((e) => e[1]);
    let probsRef = freqRef.map((e) => e[1]);
    let zipped = probsText.map((e, i) => [e, probsRef[i]]);
    let divergence = 0;
    const filterZipped = zipped.filter((el)=>{
       return el[0]!==0 || el[1]!==0 ;
    })
    return filterZipped.reduce((divergence:number,currentValue:number[])=>{
        let textProb = currentValue[0];
        let refProb = currentValue[1];
       return divergence + textProb * Math.log(textProb/refProb);
    },0);
}

export function decryptByFrequency(ciphertext: string, language:"dutch"|"english"): string {
    const referenceText:string = language==="dutch"?dutchSample:englishSample;
    const refFrequencies = sortByLetter(frequencyAnalysis(referenceText));
    let bestRotation = 0;
    let minDivergence = Infinity;
    // todo map then reduce
    for (let i = 0; i < 26; i++) {
        let decrypted = decryptCaesar(ciphertext, i);
        let frequencies = sortByLetter(frequencyAnalysis(decrypted));
        let divergence = klDivergence(frequencies, refFrequencies);

        if (divergence < minDivergence) {
            minDivergence = divergence;
            bestRotation = i;
        }
    }
    return decryptCaesar(ciphertext, bestRotation);
}

export function isDutchOrEnglish(text:string, isEncryptedCiphertext:boolean,dutchReference:string=dutchSample, englishReference:string=englishSample):"dutch"|"english" {
    let sortingFunction;
    if (isEncryptedCiphertext){
        sortingFunction = sortByFrequency
    } else {
        sortingFunction = sortByLetter
    }
    let dutchFrequencies = sortingFunction(frequencyAnalysis(dutchReference));
    let englishFrequencies = sortingFunction(frequencyAnalysis(englishReference));
    let textFrequencies = sortingFunction(frequencyAnalysis(text));
    let dutchDivergence = klDivergence(textFrequencies, dutchFrequencies);
    let englishDivergence = klDivergence(textFrequencies, englishFrequencies);
    if (dutchDivergence < englishDivergence) {
        return "dutch";
    } else {
        return "english";
    }
}