import englishSample from "./references/longEnglish.txt"
import dutchSample from "./references/longDutch.txt"
import {filter} from "lodash";
import {numberOfDFGCompiles} from "bun:jsc";
export type Frequencies = [string,number][];
//define decryptCaesar
function decryptCaesar(ciphertext: string, rotation: number): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let decrypted = '';
    // string -> characters[]
    // TODO map the characters - apply the transformation to each element or just skip it
    let ciphertextArray:string[];
    let decryptedTextArray:string[]
    // characters[] -> string
    // adapt this code
    for (let char of ciphertext.toUpperCase()) {
        if (alphabet.includes(char)) {
            let index = (alphabet.indexOf(char) - rotation + 26) % 26;
            decrypted += alphabet[index];
        } else {
            decrypted += char;
        }
    }
    return decrypted;
}
//define encryptCaesar
export function encryptCaesar(ciphertext:string, rotation:number):string{
    return decryptCaesar(ciphertext,-rotation);
}
//define frequencyAnalysis
export function frequencyAnalysis(text: string): Frequencies {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let frequencies: { [key: string]: number } = {};
    //set starting frequencies to 0ish for all letters
    for (let letter of alphabet){
        frequencies[letter] = 1e-10;
    }
    // todid CHANGING SHIT AROUND: split, map, filter, reduce
    //split
    let textArray:string[] = text.split("")
    //map
    function makeUppercase(e:string):string{
        return e.toUpperCase()
    }
    let allUppercase:string[] = textArray.map(makeUppercase)
    //filter
    function isGoodLetter(e:string):boolean {
        return alphabet.includes(e)
    }
    let onlyGoodLetters:string[] = allUppercase.filter(isGoodLetter)
    //we have a list with all the letters in our frequency table,
    // now we just need to go through the object we are using to hold them and make it match up, so something like:
    type FrequencyTable = {
        [key:string]:number
    }
    let letterFrequencies:FrequencyTable = onlyGoodLetters.reduce((currentTable:FrequencyTable,letter:string):FrequencyTable=>{
        currentTable[letter]++
        return currentTable
    }
    ,frequencies);
    //now we need to turn this into a probability distribution
    debugger;
    let freqArray = Object.entries(letterFrequencies)
    let textLength:number = onlyGoodLetters.length
    return freqArray.map(e=>{
        return [e[0], e[1]/textLength]
    })
    //foreach is like map except instead of returning stuff it doesn't return stuff lol
} //stop define frequencyAnalysis
//define sortByFrequency, sortByLetter, klDivergence
function sortByFrequency(frequencies:Frequencies):Frequencies{
    return frequencies.sort((a,b)=>{
        return b[1]-a[1];
    })
}
function sortByLetter(frequencies:Frequencies):Frequencies{
    return frequencies.sort((a,b)=>{
        return a[0]<b[0]?-1:1;
    })
}
function klDivergence(freqText: Frequencies, freqRef: Frequencies): number {
    if (freqText.length !== freqRef.length) {
        throw new Error('Distributions must have the same length');
    }
    //
    let lettersText = freqText.map(e=>e[0]);
    let lettersRef = freqRef.map(e=>e[0])
    if (!lettersText.every((el):boolean=>lettersRef.includes(el))) {
        throw new Error(`Distributions are not identical:${lettersText},${lettersRef}`);
    }
    let probsText = freqText.map((e) => e[1]);
    let probsRef = freqRef.map((e) => e[1]);
    let zipped = probsText.map((e, i) => [e, probsRef[i]]);
    let divergence = 0;
    // todid filter, then reduce
    const filterZipped = zipped.filter((el)=>{
       return el[0]!==0 || el[1]!==0 ;
    })
    //[[0.1,0.2],[0.3,0.4],...]
    return filterZipped.reduce((divergence:number,currentValue:number[])=>{
        let textProb = currentValue[0];
        let refProb = currentValue[1];
       return divergence + textProb * Math.log(textProb/refProb);
    },0);
}
//define decryptByFrequency
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
//define isDutchOrEnglish
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