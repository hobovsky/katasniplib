```lua
local message = string.format("Incorrect answer for input = %d", input)
assert.are.same(expected, actual, message)
```

Custom message should contain only some additional information about a reason of a failure. `luassert` provides basic information, such as `actual` and `expected` values, kind of a failed assertion, etc.

### Additional info:

- [`lunarmodules/luassert` GitHub repository](https://github.com/lunarmodules/luassert)
- [Assertions in documentation of Busted](https://lunarmodules.github.io/busted/#asserts)