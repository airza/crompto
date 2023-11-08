import { expect, test } from "bun:test";
import cipherText from "./ciphertexts/cipher.txt";
import cipherText2 from "./ciphertexts/cipher2.txt";
import english from "./references/english.txt";
import dutch from "./references/dutch.txt";
import {decryptVigenere, encryptVigenere, getEncryptRotation, rotatingLetters} from "./vigenere.ts"

console.log("----------------------------------------------------")

test("Getting encryption rotation works",()=>{
    expect(getEncryptRotation("NOP")).toEqual([13, 14, 15])
})

test("Rotating letters works",()=>{
    expect(rotatingLetters("HELLO", [13, 14, 15])).toEqual("USAYC")
})

test("Encrypting works",()=> {
    expect(encryptVigenere("HELLO", "NOP")).toEqual("USAYC")
    expect(encryptVigenere("hello", "nop")).toEqual("USAYC")
    expect(encryptVigenere("hello bitch", "nop")).toEqual("USAYCQVHRU")
    // todo preserve spaces????
})

test("Decrypting works", ()=>{
    expect(decryptVigenere("USAYC", "NOP")).toEqual("HELLO")
    expect(decryptVigenere("usayc", "nop")).toEqual("HELLO")
    expect(decryptVigenere("USAYC QVHRU", "NOP")).toEqual("HELLOBITCH")
    // todo preserve spaces????

})