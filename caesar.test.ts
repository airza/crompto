import { expect, test } from "bun:test";
import cipherText from "./cipher.txt";
import cipherText2 from "./cipher2.txt";
import longEnglish from "./longEnglish.txt";
import longDutch from "./longDutch.txt";
import {encryptCaesar,decryptByFrequency,isDutchOrEnglish} from "./caesar.ts";
test("english detection works good",()=>{
    expect(isDutchOrEnglish(longEnglish)).toEqual("english");
});
test("dutch detection works good",()=>{
    expect(isDutchOrEnglish(longDutch)).toEqual("dutch");
});
test("ceasar cipher works good",()=>{
    //this should be plenty of tests
    expect(encryptCaesar("abc",1)).toEqual("BCD");
    expect(encryptCaesar("xyz",1)).toEqual("YZA");
    expect(encryptCaesar("aaa",26)).toEqual("AAA");
});
test("english detection still works on encrypted ciphertexts",()=>{
    for (let i = 1; i < 26; i++) {
        let encryptedText = encryptCaesar(longEnglish,i);
        expect(isDutchOrEnglish(encryptedText)).toEqual("english");
    }
});
test("dutch detection still works on encrypted ciphertexts",()=> {
    for (let i = 1; i < 26; i++) {
        let encryptedText = encryptCaesar(longDutch, i);
        expect(isDutchOrEnglish(encryptedText)).toEqual("dutch");
    }
})
test("decrypt by frequency works good",()=>{
    expect(decryptByFrequency(cipherText,"english").slice(0,10)).toEqual("ITHINKANDM");
    expect(decryptByFrequency(cipherText2,"dutch").slice(0,10)).toEqual("WIJMOETENM");
});
console.log(decryptByFrequency(cipherText,"english"))