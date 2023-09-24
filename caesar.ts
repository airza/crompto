import englishSample from "./references/longEnglish.txt"
import dutchSample from "./references/longDutch.txt"
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
    // todo CHANGING SHIT AROUND: split, map, filter, reduce
    //ALL OF THIS STILL PART OF frequencyAnalysis?
    debugger;
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
    // {A:1000,B:500,C:400,D:400,E:2000} except with all the letters
    function reducer(acc:{ [key: string]: number },val:string):{ [key: string]: number }{
        return acc;
    } //STOP CHANGING SHIT AROUND
    let allFrequencies = onlyGoodLetters.reduce(reducer,frequencies)
    //now we need to turn this into a probability distribution
    //change this
    const count = 0;
    //foreach is like map except instead of returning stuff it doesn't return stuff lol
    Object.keys(allFrequencies).forEach((letter:string)=>{
        allFrequencies[letter]/=count
    })

//garbage which we're replacing
    for (let char of text.toUpperCase()) {
        if (frequencies[char] !== undefined && alphabet.includes(char)){
            frequencies[char]++;
            count++;
        }
    }

    for (let letter of alphabet) {
        frequencies[letter] /= count;
    }
    //end garbage

    //convert to array
    return Object.entries(allFrequencies);
} //stop define frequencyAnalysis
//define sortByFrequency, sortByLetter, klDivergence
function sortByFreequency(frequencies:Frequencies):Frequencies{
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
    if (!freqText.every((e) => e[0] === freqRef.find((f) => f[0] === e[0])![0])) {
        throw new Error('Distributions must have the same letters');
    }
    let probsText = freqText.map((e) => e[1]);
    let probsRef = freqRef.map((e) => e[1]);
    let zipped = probsText.map((e, i) => [e, probsRef[i]]);
    let divergence = 0;
    // todo filter, then reduce
    for (let i = 0; i < probsText.length; i++) {
        if (probsText[i] === 0 || probsRef[i] === 0) {
            continue;
        }
        divergence += probsText[i] * Math.log(probsText[i] / probsRef[i]);
    }
    return divergence;
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
export function isDutchOrEnglish(text:string, dutchReference:string=dutchSample, englishReference:string=englishSample):"dutch"|"english" {
    let dutchFrequencies = sortByLetter(frequencyAnalysis(dutchReference));
    let englishFrequencies = sortByLetter(frequencyAnalysis(englishReference));
    let textFrequencies = sortByLetter(frequencyAnalysis(text));
    let dutchDivergence = klDivergence(textFrequencies, dutchFrequencies);
    let englishDivergence = klDivergence(textFrequencies, englishFrequencies);
    if (dutchDivergence < englishDivergence) {
        return "dutch";
    } else {
        return "english";
    }
}