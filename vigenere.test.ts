import { expect, test } from "bun:test";
import cipherText from "./ciphertexts/cipher.txt";
import cipherText2 from "./ciphertexts/cipher2.txt";
import english from "./references/english.txt";
import dutch from "./references/dutch.txt";
import {decryptVigenere, encryptVigenere, indexCodeword} from "./vigenere.ts"

console.log("----------------------------------------------------")

test("Indexing codeword works", ()=>{
    expect(indexCodeword(0, "NOP")).toEqual(0)
    expect(indexCodeword(2, "NOP")).toEqual(2)
    expect(indexCodeword(4, "NOP")).toEqual(1)
    expect(indexCodeword(0, "KILLME")).toEqual(0)
    expect(indexCodeword(2, "KILLME")).toEqual(2)
    expect(indexCodeword(6, "KILLME")).toEqual(0)
    expect(indexCodeword(6, "killme")).toEqual(0)
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