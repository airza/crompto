import { expect, test } from "bun:test";
import cipherText from "./ciphertexts/cipher.txt";
import cipherText2 from "./ciphertexts/cipher2.txt";
import english from "./references/english.txt";
import dutch from "./references/dutch.txt";
import {indexCodeword} from "./vigenere.ts"

console.log("----------------------------------------------------")

test("Indexing codeword works", ()=>{
    expect(indexCodeword(parameter1, parameter2)).toEqual(outcome)
})

//expect(isDutchOrEnglish(dutch, false)).toEqual("dutch");

test("Encrypting works",()=> {

})
test("Decrypting works", ()=>{

})
test("????",()=>{

})