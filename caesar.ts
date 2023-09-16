import englishSample from "./english.txt"
import dutchSample from "./dutch.txt"
type Frequencies = [string,number][];
function decryptCaesar(ciphertext: string, rotation: number): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let decrypted = '';
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
export function encryptCaesar(ciphertext:string, rotation:number):string{
    return decryptCaesar(ciphertext,-rotation);
}
function frequencyAnalysis(text: string): Frequencies {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let frequencies: { [key: string]: number } = {};

    // Initialize frequencies to a very small value because it makes the math easier later
    for (let letter of alphabet) {
        frequencies[letter] = 1e-10;
    }

    let count = 0;
    for (let char of text.toUpperCase()) {
        if (frequencies[char] !== undefined && alphabet.includes(char)){
            frequencies[char]++;
            count++;
        }
    }

    for (let letter of alphabet) {
        frequencies[letter] /= count;
    }
    //convert to array
    return Object.entries(frequencies);
}

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
    if (!freqText.every((e) => e[0] === freqRef.find((f) => f[0] === e[0])![0])) {
        throw new Error('Distributions must have the same letters');
    }
    let probsText = freqText.map((e) => e[1]);
    let probsRef = freqRef.map((e) => e[1]);
    let divergence = 0;
    for (let i = 0; i < probsText.length; i++) {
        if (probsText[i] === 0 || probsRef[i] === 0) {
            continue;
        }
        divergence += probsText[i] * Math.log(probsText[i] / probsRef[i]);
    }
    return divergence;
}

export function decryptByFrequency(ciphertext: string, language:"dutch"|"english"): string {
    const referenceText:string = language==="dutch"?dutchSample:englishSample;
    const refFrequencies = sortByLetter(frequencyAnalysis(referenceText));
    let bestRotation = 0;
    let minDivergence = Infinity;

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
export function isDutchOrEnglish(text:string, dutchReference:string=dutchSample, englishReference:string=englishSample):"dutch"|"english" {
    let dutchFrequencies = sortByFrequency(frequencyAnalysis(dutchReference));
    let englishFrequencies = sortByFrequency(frequencyAnalysis(englishReference));
    let textFrequencies = sortByFrequency(frequencyAnalysis(text));
    let dutchDivergence = klDivergence(textFrequencies,dutchFrequencies);
    let englishDivergence = klDivergence(textFrequencies,englishFrequencies);
    if (dutchDivergence<englishDivergence){
        return "dutch";
    } else {
        return "english";
    }
}
// Example aaa