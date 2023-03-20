```lua
local s = require 'solution'
describe("group1", function()
  it("test1", function()
    -- ...
  end)
  it("test2", function()
    -- ...
  end)
end)

describe("group", function()
  it("test1", function()
    -- ...
  end)
end)
```

Busted allows for nested `describe` blocks:

```lua
describe("Outer group", function()
    
  describe("Inner group", function()
    it("Inner test", function()
      -- ...
    end)
  end)
    
  it("Outer tests", function()
    -- ...
  end)
end)
```

### More information:

- [Defining tests](https://lunarmodules.github.io/busted/#defining-tests) in Busted documentation.