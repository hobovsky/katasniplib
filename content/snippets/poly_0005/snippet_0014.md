Testing framework allows for nested `describe` blocks, but not for top level `it`:

```coffeescript
Test.describe "Group 1", ->
  Test.it "Test 1", ->
    # ...
  Test.it "Test 2", ->
    # ...

Test.describe "Group2 outer", ->
  
  Test.describe "Group2 inner", ->
    Test.it "Test inner", ->
      # ...
    
  Test.it "Test outer", ->
    # ...
```
