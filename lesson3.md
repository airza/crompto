## Lesson 3: In the weeds
### Why are we changing already existing code?
- it's surprisingly easy to write the wrong code in a for loop. it's surprisingly easy to write the wrong code all the time
- if we are instead performing a map or reduce, we can write _tests_ for the function we are using to map or reduce in the event it doesn't work
- we can also leverage the type system to try and prevent errors, which is more challenging
### Some of these functions depend on variables that aren't in their scope. I am calling the fucking police
```
function isGoodLetter(e:string):boolean {
return alphabet.includes(e)
}
```
There are many correct ways to express the same computation.
Our goal is to choose one that is the least likely to be subtly broken:
- Maximize use of the typing system
- Write functions that are testable, if we need to test them
- DRY: Don't repeat yourself: pasting the same line of code repeatedly makes it harder to modify
- KISS: "keep it simple, stupid"
- Performance: not as big of a deal these days, but sometimes a big deal
- Keep messy state inside of functions, so we can reason about it only in an emergency
#### Hands-on
rewrite functions above
#### What to do?
- We currently have `isDutchOrEnglish`, a function that (due to our changes) only works on unencrypted language
- Should we make changes?
- What is the *purpose* of this code?
    - need to choose how to decrypt a given rotated ciphertext
    - what functions would we need to carry this out?
- Decompose this task into steps we can individually carry out here
    - can either write this out or write some functions that would do the trick
#### The Vigenère cipher
- extension of the caesar cipher
- uses a secret code word
- code word converted to letters (ABBA -> 0,1,1,0) 
- used like a caesar cipher on each letter
```
SPHINX OF BLACK QUARTZ, JUDGE MY VOW

SPHINXOFBLACKQUARTZJUDGEMYVOW
ABBAABBAABBAABBAABBAABBAABBAA
SQIINYPFBMBCKRVARUAJUEHEMZWOW
```
- given a very long ciphertext, how would we attack this?
- how could we determine the length of a key?
- determine length of key, 