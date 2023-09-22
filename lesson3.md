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