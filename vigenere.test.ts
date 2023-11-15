import { expect, test } from "bun:test";
import {
    decryptVigenere,
    encryptVigenere,
    getEncryptRotation, getTextSubset, hasEvilCharacters,
    rotatingLetters,
    splitTextCodewordwise
} from "./vigenere.ts"

console.log("----------------------------------------------------")

test("Getting encryption rotation works",()=>{
    expect(getEncryptRotation("ABBA")).toEqual([0, 1, 1, 0])
    expect(getEncryptRotation("nop")).toEqual([13, 14, 15])
    expect(getEncryptRotation("DON'T")).toThrow('evil')
})

test("Rotating letters works",()=>{
    expect(rotatingLetters("HELLO", [13, 14, 15])).toEqual("USAYC")
})

test("Encrypting works",()=> {
    expect(encryptVigenere("HELLO", "NOP")).toEqual("USAYC")
    expect(encryptVigenere("hello", "nop")).toEqual("USAYC")
    expect(encryptVigenere("HELLO", "CODEWORD")).toEqual("JSOPK")
    expect(encryptVigenere("HELLO BITCH", "NOP")).toEqual("USAYCQVHRU")
    expect(encryptVigenere("HELLO", "KILL ME")).toThrow('evil')
    expect(encryptVigenere("H???", "DAY!")).toThrow('evil')
})

test("Decrypting with known codeword works", ()=>{
    expect(decryptVigenere("USAYC QVHRU", "NOP")).toEqual("HELLOBITCH")
})

test("Splitting text into subset based on a single codeword character works", ()=>{
    expect(getTextSubset("HELPO", 4, 0)).toEqual("HO")
    expect(getTextSubset("HELPO", 4, 2)).toEqual("L")
    expect(getTextSubset("HELPO", 3, 1)).toEqual("EO")
})

test("Splitting the text into all subsets based on full codeword works", ()=>{
    expect(splitTextCodewordwise("VIGNEREST", "HELP")).toEqual(["VET", "IR", "GE", "NS"])
    expect(splitTextCodewordwise("VIGNEREST", "KILLME")).toEqual(["VE", "IS", "GT", "N", "E", "R"])
    expect(splitTextCodewordwise("TSUKIMI", "KILLME")).toEqual(["TI", "S", "U", "K", "I", "M"])
    expect(splitTextCodewordwise("VIGNEREST", "X")).toThrow('ceasar')
})

test("Testing codeword for evil characters works?", ()=>{
    expect(hasEvilCharacters("KILLME")).toEqual(false)
    expect(hasEvilCharacters("KILLME?")).toEqual(true)

})