import english from "./references/english.txt";
import {Frequencies, frequencyAnalysis} from "./caesar.ts";
debugger;
function go() {
    let someNumber = 12
    let twelve = someNumber
    someNumber += 1
// what is twelve?

    let letters = ["w", "e", "p", "p", "i", "s"];
    let letters2 = letters;
    letters[0] = "a";
// what is the value of 'letters'?

    let coolString = "weppis"
    let weppis = coolString
    coolString += "!"
// what is weppis?
// coolString[0] = "aaaa";


    let object: any = {a: 1, b: 2, c: 3};
    object['self'] = object;

//working with strings
    let arr = english.split("")
    let backToString = arr.join("")

    function ourMap(_this_: any[], func: (e: any) => any): any[] {
        let result = [];
        for (let e of _this_) {
            result.push(func(e));
        }
        return result;
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numbers = arr.map((e) => {
        return alphabet.indexOf(e);
    })
    console.log(numbers);

    function ourFilter(_this_: any[], func: (e: any) => boolean): any[] {
        let result = [];
        for (let e of _this_) {
            if (func(e)) {
                result.push(e);
            }
        }
        return result;
    }

//let frequencies:[string,number][]
    let frequencies: Frequencies = frequencyAnalysis(english)
    console.log(ourFilter(frequencies, (e) => {
        return "AEIOU".indexOf(e[0]) !== -1;
    }));
    console.log(frequencies.filter(e => {
        return "AEIOU".indexOf(e[0]) !== -1;
    }));

    function letterIsVowel(e: [string, number]): boolean {
        return "AEIOU".indexOf(e[0]) !== -1;
    }

    const letterIsVowel2 = (e: [string, number]): boolean => {
        return "AEIOU".indexOf(e[0]) !== -1;
    }
    console.log(frequencies.filter(letterIsVowel));
    console.log(frequencies.filter(letterIsVowel2));

    let firstFiveFrequencies = frequencies.filter(e => "ABCDE".indexOf(e[0]) !== -1)
        .map(e => e[1])

    function ourReduce(_this_: any[], func: (acc: any, e: any) => any, init: any = 0): any {
        let acc = init;
        for (let e of _this_) {
            acc = func(acc, e);
        }
        return acc;
    }

    console.log(ourReduce(firstFiveFrequencies, (acc, e) => {
        return acc + e
    }, 0));
    console.log(ourReduce(firstFiveFrequencies, (acc, e) => {
        return Math.max(acc,e);
    }, 0));
    console.log(ourReduce(firstFiveFrequencies, (acc, e) => {
        return acc + e[1]
    }));
}
go()