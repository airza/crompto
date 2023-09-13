// Purpose: Entry point for the application
import sample from "./sample.txt"
import cipher from "./cipher.txt"
console.log("bun");
type Frequencies = { [key: string]: number };
type FrequencyArray = Array<[string, number]>;
type TranslationTable = Map<string,string>|{};
function breakSubstitutionCipher(cipherText: string,knownLetters:TranslationTable={}): string {
    let knownCiphertextLetters = Object.keys(knownLetters)
    let knownPlaintextLetters = Object.values(knownLetters)
    //get the frequencies of each letter in the cipher text
    const ctFrequencies: Frequencies = getFrequencies(cipherText);
    //sort the frequencies in descending order
    let sortedCtFrequencies:string[]= sortFrequencies(ctFrequencies)
    console.log(sortedCtFrequencies);
    sortedCtFrequencies = sortedCtFrequencies.filter(e=>{
        return knownCiphertextLetters.indexOf(e)<0;
    })
    let englishFrequencies = getFrequencies(sample)
    let sortedEnglishFrequencies = sortFrequencies(englishFrequencies).filter(e=>{
        return knownPlaintextLetters.indexOf(e)<0;
    }).map(
        e=>e.toUpperCase()
    )
    let outText = cipherText.toLowerCase()
    for (let i = 0; i < sortedCtFrequencies.length; i++) {
        outText = outText.replaceAll(sortedCtFrequencies[i],sortedEnglishFrequencies[i])
    }
    return outText;
}
function getFrequencies(text: string): Frequencies {
    //get rid of everything that isn't a letter
    const preparedText = text.toLowerCase()
    const frequencies: Frequencies = {};
    let totalCharacters = 0
    for (let i = 0; i < preparedText.length; i++) {
        const letter = preparedText[i];
        if ("abcdefghijklmnopqrstuvwxyz".indexOf(letter)==-1){
            continue;
        } else {
            totalCharacters+=1;
        }
        if (frequencies[letter]) {
            frequencies[letter]+=1;
        } else {
            frequencies[letter] = 1;
        }
    }
    Object.keys(frequencies).forEach((key) => {
        frequencies[key] = frequencies[key] / totalCharacters;
    });
    return frequencies;
}
function sortFrequencies(frequencies: Frequencies): string[]{
    const sortedFrequencies: FrequencyArray = [];
    Object.keys(frequencies).forEach((key) => {
        sortedFrequencies.push([key, frequencies[key]]);
    });
    sortedFrequencies.sort((a, b) => {
        return b[1] - a[1];
    });
    return sortedFrequencies.map(e=>e[0])
}
console.log(breakSubstitutionCipher(cipher,{v:'E'}));