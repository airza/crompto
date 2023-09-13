# the crypto project

#Why is excel nice?
- we have data, but we want to transform in various ways to figure out stuff about it
  - take elements in an array and transform them. multiply hours by time per hour, take every element and roundup, etc ("map") (this is so deeply built into excel's DNA that there's not really a function for it)
  - take a list of elements and combine them in some way, sometimes as simple as adding, sometimes vastly more complex, but reducing them to fewer more useful figures ("reduce", "SUM",part of SUMIF)
  - excluding elements from these computations where applicable so we can only use further computations down the line ("filter")
- all of this happens in the context of cells: every cell can either be a "literal" value, or a result of a computation derived from other cells
- we also have control flow, which we can use to have different logic based on the other values. (mostly every flavor of IF)
- we also have some things that are aimed towards making this less painful:
  -error handling (IFERROR)
  - references to let us handle control flow (INDIRECT)
  - all of these things are incredibly powerful together (no explanation needed)
# b u t
there are just problems which become insurmountable as the project grows (not your fault)
  - our first big problem is that all of this just takes place on more or less an ad-hoc basis
    - collaborators can't tell what is a literal and what is a function just by looking
    - the control flow of the spreadsheet is not super obvious either- data can go from anywhere to anywhere at any time
    - if we want complex datatypes (name, creators, premiere date, etc)
    - if you simply hold everything in your short term memory, it works for you, but it doesn't necessarily work for everyone
  - it's not composable
    - if we come up with a useful function for one thing... we just copy and paste it to another thing! hope it never changes
    - if we would like to use someone else's function, we are often forced to just... use their spreadsheet
    - everything can go everywhere at any time, so even if we wanted to build on someone else's sheet, they can just change the inside layout at any time and it breaks everything we wanted to do
  - concerns are not separated
    - we are using this to store data, to perform computation on this data, and also to render this data
    - this is very good for small projects: can just be sent over in a small package and in modern times it's better than it used to be for reading
    - but now there is tension between laying things out in a nice way, and changes to layout require changes to logic, which means layout doesn't get changed
    - bad for accessibility
    - doesn't matter for our concerns but also not super efficient if you need to have several thousand users thoomin on your site at the same time
# thus
many ways to solve the same problem, but
    - store data in a data store (almost always SQL)
    - operate on data with a programming language (today, typescript)
    - render data with... a horrible rat's nest of baroque languages, but increasingly these days a web browser
    - SQL is EZ
    - HTML is easy, client side is c o m p l e x
    - but we will be using typescript, which is also the way that the client works
        - except that it actually compiles to javascript, which is what the browser actually runs
# lab
we have this code, it is broken
we known this test is broken because the unit tests don't work
    - are they broken?
    - can the tests still work on broken code?
the function is the most noble of all things
    - encapsulation
    - referential transparency
other types
    - string
    - array
    - map
    - number
        - float
        - integer
        - more baroque stuff
    - boolean
    - null (but also undefined, and a thousand other things here)
```
bun test
```
```
bun test --inspect-brk
```
```
bun test --inspect-wait
```
    test in repl
	