import { expect, test } from "bun:test";
import cipherText from "./ciphertexts/cipher.txt";
import cipherText2 from "./ciphertexts/cipher2.txt";
import english from "./references/english.txt";
import dutch from "./references/dutch.txt";
import {encryptCaesar,decryptByFrequency,isDutchOrEnglish} from "./caesar.ts";

console.log("----------------------------------------------------")

test("english detection works?",()=>{
    expect(isDutchOrEnglish(english,false)).toEqual("english");
});

test("dutch detection works?",()=>{
    expect(isDutchOrEnglish(dutch, false)).toEqual("dutch");
});

test("caesar cipher works?",()=>{
    expect(encryptCaesar("abc",1)).toEqual("BCD");
    expect(encryptCaesar("xyz",1)).toEqual("YZA");
    expect(encryptCaesar("aaa",26)).toEqual("AAA");
});

test("english detection still works on encrypted ciphertexts?",()=>{
    for (let i = 1; i < 26; i++) {
        let encryptedText = encryptCaesar(english,i);
        expect(isDutchOrEnglish(encryptedText, true)).toEqual("english");
    }
});

test("dutch detection still works on encrypted ciphertexts?",()=> {
    for (let i = 1; i < 26; i++) {
        let encryptedText = encryptCaesar(dutch, i);
        expect(isDutchOrEnglish(encryptedText, true)).toEqual("dutch");
    }
});

test("decrypt by frequency works?",()=>{
    expect(decryptByFrequency(cipherText,"english").slice(0,10)).toEqual("ITHINKANDM");
    expect(decryptByFrequency(cipherText2,"dutch").slice(0,10)).toEqual("WIJMOETENM");
});

console.log(decryptByFrequency(cipherText,"english"))