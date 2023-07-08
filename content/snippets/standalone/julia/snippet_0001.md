Example test suite in Julia using `@facts`, `@context` and `@fact`:

```julia
using FactCheck
using Random

facts("leap year") do

    context("Leap years divisible by 4") do
      @fact isleapyear(2020) --> true "isleapyear(2020) should be true"
      @fact isleapyear(1824) --> true "isleapyear(1824) should be true"
      @fact isleapyear(2152) --> true "isleapyear(2152) should be true"
    end
  
    context("Leap years divisible by 400") do
      @fact isleapyear(1600) --> true "isleapyear(1600) should be true"
      @fact isleapyear(2000) --> true "isleapyear(2000) should be true"
      @fact isleapyear(2400) --> true "isleapyear(2400) should be true"
    end

    context("Non-leap years divisible by 100") do
      @fact isleapyear(1800) --> false "isleapyear(1800) should be false"
      @fact isleapyear(1900) --> false "isleapyear(1900) should be false"
      @fact isleapyear(2100) --> false "isleapyear(2100) should be false"
      @fact isleapyear(2200) --> false "isleapyear(2200) should be false"
    end

    context("Regular non-leap years") do
      @fact isleapyear(1821) --> false "isleapyear(1800) should be false"
      @fact isleapyear(1942) --> false "isleapyear(1900) should be false"
      @fact isleapyear(2113) --> false "isleapyear(2100) should be false"
      @fact isleapyear(2254) --> false "isleapyear(2200) should be false"
    end
  
    context("Random tests") do
    
      function gencases(_)
        yearMul400  = 1600       + rand(0 : 5 ) * 400
        yearMul100  = yearMul400 + rand(1 : 3 ) * 100
        yearMul4    = 1600       + rand(0 : 15) * 100 + rand(1 : 24) * 4
        yearNonMul4 = yearMul4   + rand(1 : 3 )
        return [(yearMul400, true), (yearMul100, false), (yearMul4, true), (yearNonMul4, false)]
      end
      cases = shuffle(vcat(map(gencases, 1:25)...))    
      for (year, expected) in cases
        actual = isleapyear(year)
        @fact actual --> expected  "isleapyear($(year)) should be $(expected)"
      end
    end
end
```

### More info

- [JuliaAttic / FactCheck.jl](https://github.com/JuliaAttic/FactCheck.jl) on GitHub.