import { expect, test } from "bun:test";
import {decryptVigenere, encryptVigenere, getEncryptRotation, rotatingLetters} from "./vigenere.ts"

console.log("----------------------------------------------------")

test("Getting encryption rotation works",()=>{
    expect(getEncryptRotation("ABBA")).toEqual([0, 1, 1, 0])
    expect(getEncryptRotation("nop")).toEqual([13, 14, 15])
    expect(getEncryptRotation("DON'T")).toEqual([3, 14, 13, 19])
})

test("Rotating letters works",()=>{
    expect(rotatingLetters("HELLO", [13, 14, 15])).toEqual("USAYC")
})

test("Encrypting works",()=> {
    expect(encryptVigenere("HELLO", "NOP")).toEqual("USAYC")
    expect(encryptVigenere("hello", "nop")).toEqual("USAYC")
    expect(encryptVigenere("HELLO", "CODEWORD")).toEqual("JSOPK")
    expect(encryptVigenere("HELLO BITCH", "NOP")).toEqual("USAYCQVHRU")
    expect(encryptVigenere("HELLO", "KILL ME")).toEqual("RMWWA")
    expect(encryptVigenere("H???", "DAY!")).toEqual("K")
})

test("Decrypting works", ()=>{
    expect(decryptVigenere("USAYC QVHRU", "NOP")).toEqual("HELLOBITCH")
})