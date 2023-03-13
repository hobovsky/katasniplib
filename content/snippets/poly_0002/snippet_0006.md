```julia
@fact odd_or_even(input) --> expected "Incorrect answer for input = $(input)"
```

Handling of FactCheck output in context of Codewars is unfortunately not ideal and may require fine tuning for every test suite. It's recommended to review an output of failing FactCheck tests and modify layout of contexts, facts, and custom messages until they result in a reasonably clear output.


### Additional info:

- [JuliaAttic/FactCheck.jl Github repository](https://github.com/JuliaAttic/FactCheck.jl)