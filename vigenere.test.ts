import { expect, test } from "bun:test";
import {
    decryptVigenereSimple,
    encryptVigenere,
    getEncryptRotations,
    splitTextCodeletterwise,
    rotatingLetters,
    splitTextCodewordLengthwise,
    prepareText,
    prepareCodeword,
    calculateCodewordLength, decryptVigenereComplex
} from "./vigenere.ts"
import english from "./references/english.txt";
import simonSingh from "./ciphertexts/vigenere/simonSingh.txt"
import textttt from "./ciphertexts/vigenere/textttt.txt"
import squid from "./ciphertexts/vigenere/squid.txt"

// todo import english from "./references/english.txt";
// todo import dutch from "./references/dutch.txt";
// todo SIMON SINGH

console.log("----------------------------------------------------")

test("Preparing text for processing works", ()=>{
    expect(prepareText("OFFYOUGO")).toEqual(["O", "F", "F", "Y", "O", "U", "G", "O"])
    expect(prepareText("OFF YOU GO")).toEqual(["O", "F", "F", "Y", "O", "U", "G", "O"])
    expect(prepareText("OFF YOU GO!")).toEqual(["O", "F", "F", "Y", "O", "U", "G", "O"])
    expect(prepareText("off you go!")).toEqual(["O", "F", "F", "Y", "O", "U", "G", "O"])
})

test("Preparing codeword for processing works", ()=>{
    expect(prepareCodeword("CODEWORD")).toEqual(["C", "O", "D", "E", "W", "O", "R", "D"])
    expect(prepareCodeword("CODE WORD")).toEqual(["C", "O", "D", "E", "W", "O", "R", "D"])
    expect(prepareCodeword("code word")).toEqual(["C", "O", "D", "E", "W", "O", "R", "D"])
    expect(()=>{
        prepareCodeword("CODE WORD!")
    }).toThrow('evil')
    expect(()=>{
        prepareCodeword("C")
    }).toThrow('caesar')
})

test("Getting encryption rotations works",()=>{
    expect(getEncryptRotations("CODEWORD")).toEqual([2, 14, 3, 4, 22, 14, 17, 3])
    expect(getEncryptRotations("CODE WORD")).toEqual([2, 14, 3, 4, 22, 14, 17, 3])
    expect(getEncryptRotations("code word")).toEqual([2, 14, 3, 4, 22, 14, 17, 3])
    expect(()=>{
        getEncryptRotations("CODE WORD!")
    }).toThrow('evil')
    expect(()=>{
        getEncryptRotations("C")
    }).toThrow('caesar')
})

test("Rotating letters works",()=>{
expect(rotatingLetters("OFFYOUGO", [2, 14, 3, 4, 22, 14, 17, 3])).toEqual("QTICKIXR")
expect(rotatingLetters("OFF YOU GO", [2, 14, 3, 4, 22, 14, 17, 3])).toEqual("QTICKIXR")
expect(rotatingLetters("OFF YOU GO!", [2, 14, 3, 4, 22, 14, 17, 3])).toEqual("QTICKIXR")
expect(rotatingLetters("off you go!", [2, 14, 3, 4, 22, 14, 17, 3])).toEqual("QTICKIXR")
})

test("Encrypting works",()=> {
    expect(encryptVigenere("OFFYOUGO", "CODEWORD")).toEqual("QTICKIXR")
    expect(encryptVigenere("OFF YOU GO", "CODEWORD")).toEqual("QTICKIXR")
    expect(encryptVigenere("OFF YOU GO!", "CODEWORD")).toEqual("QTICKIXR")
    expect(encryptVigenere("off you go!", "CODEWORD")).toEqual("QTICKIXR")
    expect(encryptVigenere("OFFYOUGO", "CODE WORD")).toEqual("QTICKIXR")
    expect(encryptVigenere("OFFYOUGO", "code word")).toEqual("QTICKIXR")
    expect(()=>{
        encryptVigenere("OFFYOUGO", "CODE WORD!")
    }).toThrow('evil')
    expect(()=>{
        encryptVigenere("OFFYOUGO", "C")
    }).toThrow('caesar')
})

test("Decrypting with known codeword works", ()=>{
    expect(decryptVigenereSimple("QTICKIXR", "CODEWORD")).toEqual("OFFYOUGO")
    expect(decryptVigenereSimple("QTI CKI XR", "CODEWORD")).toEqual("OFFYOUGO")
    expect(decryptVigenereSimple("QTI CKI XR!", "CODEWORD")).toEqual("OFFYOUGO")
    expect(decryptVigenereSimple("qti cki xr!", "CODEWORD")).toEqual("OFFYOUGO")
    expect(decryptVigenereSimple("QTICKIXR", "CODE WORD")).toEqual("OFFYOUGO")
    expect(decryptVigenereSimple("QTICKIXR", "code word")).toEqual("OFFYOUGO")
    expect(()=>{
        decryptVigenereSimple("QTICKIXR", "CODE WORD!")
    }).toThrow('evil')
    expect(()=>{
        decryptVigenereSimple("QTICKIXR", "C")
    }).toThrow('caesar')
})

test("Splitting the text into a single subset based on one codeword character codeword works", ()=>{
    expect(splitTextCodeletterwise("OFFYOUGO", 4, 0)).toEqual("OO")
    expect(splitTextCodeletterwise("OFF YOU GO", 4, 1)).toEqual("FU")
    expect(splitTextCodeletterwise("OFF YOU GO!", 4, 2)).toEqual("FG")
    expect(splitTextCodeletterwise("off you go!", 4, 3)).toEqual("YO")
    expect(splitTextCodeletterwise("OFFYOUGO", 3, 0)).toEqual("OYG")
    expect(splitTextCodeletterwise("OFFYOUGO", 10, 0)).toEqual("O")
})

test("Splitting the text into all subsets based on codeword length works", ()=> {
    expect(splitTextCodewordLengthwise("OFFYOUGO", 8)).toEqual(["O", "F", "F", "Y", "O", "U", "G", "O"])
    expect(splitTextCodewordLengthwise("OFF YOU GO", 8)).toEqual(["O", "F", "F", "Y", "O", "U", "G", "O"])
    expect(splitTextCodewordLengthwise("OFF YOU GO!", 6)).toEqual(["OG", "FO", "F", "Y", "O", "U"])
    expect(splitTextCodewordLengthwise("off you go!", 4)).toEqual(["OO", "FU", "FG", "YO"])
    //doesn't throw for caesar bc doesn't call on prepareCodeword
    expect(splitTextCodewordLengthwise("OFFYOUGO", 1)).toEqual(["OFFYOUGO"])
})

test("Calculating code word length works", ()=>{
    expect(calculateCodewordLength(textttt)).toEqual(7)
})

//todo actually write this test
test("Decrypting vigenere with unknown codeword works", ()=>{
    expect(decryptVigenereComplex(squid, "english")).toEqual("THEVAMPIRESQUIDVAMPYROTEUTHISINFERNALISLITVAMPIRESQUIDFROMHELLISASMALLCEPHALOPODFOUNDTHROUGHOUTTEMPERATEANDTROPICALOCEANSINEXTREMEDEEPSEACONDITIONSTHEVAMPIRESQUIDUSESITSBIOLUMINESCENTORGANSANDITSUNIQUEOXYGENMETABOLISMTOTHRIVEINTHEPARTSOFTHEOCEANWITHTHELOWESTCONCENTRATIONSOFOXYGENITHASTWOLONGRETRACTILEFILAMENTSLOCATEDBETWEENTHEFIRSTTWOPAIRSOFARMSONITSDORSALSIDEWHICHDISTINGUISHITFROMBOTHOCTOPUSESANDSQUIDSANDPLACESITINITSOWNORDERVAMPYROMORPHIDAALTHOUGHITSCLOSESTRELATIVESAREOCTOPODSASAPHYLOGENETICRELICTITISTHEONLYKNOWNSURVIVINGMEMBEROFITSORDERTHEFIRSTSPECIMENSWERECOLLECTEDONTHEVALDIVIAEXPEDITIONANDWEREORIGINALLYDESCRIBEDASANOCTOPUSINBYGERMANTEUTHOLOGISTCARLCHUNBUTLATERASSIGNEDTOANEWORDERTOGETHERWITHSEVERALEXTINCTTAXADISCOVERYTHEVAMPIRESQUIDWASDISCOVEREDDURINGTHEVALDIVIAEXPEDITIONLEDBYCARLCHUNCHUNWASAZOOLOGISTWHOWASINSPIREDBYTHECHALLENGEREXPEDITIONANDWANTEDTOVERIFYTHATLIFEDOESINDEEDEXISTBELOWFATHOMSMETERSCHUNLATERCLASSIFIEDTHEVAMPIRESQUIDINTOITSFAMILYVAMPYROTEUTHIDAETHISEXPEDITIONWASFUNDEDBYTHEGERMANSOCIETYGESELLSCHAFTDEUTSCHERNATURFORSCHERUNDRZTEAGROUPOFGERMANSCIENTISTSWHOBELIEVEDTHEREWASLIFEATDEPTHSGREATERTHANMETERSCONTRARYTOTHEABYSSUSTHEORYVALDIVIAWASFITTEDWITHEQUIPMENTFORTHECOLLECTIONOFDEEPSEAORGANISMSASWELLASLABORATORIESANDSPECIMENJARSINORDERTOANALYZEANDPRESERVEWHATWASCAUGHTTHEVOYAGEBEGANINHAMBURGGERMANYFOLLOWEDBYEDINBURGHANDTHENTRACEDAROUNDTHEWESTCOASTOFAFRICAAFTERNAVIGATINGAROUNDTHESOUTHERNPOINTOFAFRICATHEEXPEDITIONSTUDIEDDEEPAREASOFTHEINDIANANDANTARCTICOCEANRESEARCHERSHADNOTBEFOREDISCOVEREDANYSPECIESFROMTHISFAMILYTHATCOULDBETRACEDBACKTOTHECENOZOICTHISSUGGESTSTWOIDEASWHICHINCLUDEANOTABLEPRESERVATIONBIASCALLEDTHELAZARUSEFFECTMAYEXISTORANINACCURATEDETERMINATIONOFWHENVAMPIRESQUIDSORIGINALLYSETTLEDINTHEDEEPOCEANSTHELAZARUSEFFECTMAYRESULTFROMTHESCARCITYOFPOSTCRETACEOUSRESEARCHREGIONSORFROMTHEREDUCEDABUNDANCEANDDISTRIBUTIONOFVAMPIRESQUIDSINANYCASEEVENWHILETHESEARCHREGIONSREMAINTHESAMEITISMOREDIFFICULTTOLOCATEANDANALYZETHEMDESCRIPTIONTHEVAMPIRESQUIDCANREACHAMAXIMUMTOTALLENGTHAROUNDCMFTITSCENTIMETREINGELATINOUSBODYVARIESINCOLOURFROMVELVETYJETBLACKTOPALEREDDISHDEPENDINGONLOCATIONANDLIGHTINGCONDITIONSAWEBBINGOFSKINCONNECTSITSEIGHTARMSEACHLINEDWITHROWSOFFLESHYSPINESORCIRRITHEINNERSIDEOFTHISCLOAKISBLACKONLYTHEDISTALHALVESFARTHESTFROMTHEBODYOFTHEARMSHAVESUCKERSITSLIMPIDGLOBULAREYESWHICHAPPEARREDORBLUEDEPENDINGONLIGHTINGAREPROPORTIONATELYTHELARGESTINTHEANIMALKINGDOMATCMININDIAMETERTHENAMEOFTHEANIMALWASINSPIREDBYITSDARKCOLOURANDCLOAKLIKEWEBBINGRATHERTHANHABITITFEEDSONDETRITUSNOTBLOOD")
})