```julia
# FactCheck example:
# TODO: replace with your own tests (TDD), these are just how-to examples.
using FactCheck

facts("leap year") do
    context("Leap years divisible by 4") do
      @fact isleapyear(1824) --> true "isleapyear(1824) should be true"
    end

    context("Leap years divisible by 400") do
      @fact isleapyear(2000) --> true "isleapyear(2000) should be true"
    end

    context("Non-leap years divisible by 100") do
      @fact isleapyear(1900) --> false "isleapyear(1900) should be false"
    end

    context("Regular non-leap years") do
      @fact isleapyear(1942) --> false "isleapyear(1900) should be false"
    end
end

```

### More info

- [JuliaAttic / FactCheck.jl](https://github.com/JuliaAttic/FactCheck.jl) on GitHub.