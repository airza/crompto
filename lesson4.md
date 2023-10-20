## Lesson 4: How did i even get here, son?
### Review
- What is KL Divergence?
- What was our strategy for breaking the caesar cipher?
- Walkthrough of first test function
### The Vigenère cipher
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
- write c o d e