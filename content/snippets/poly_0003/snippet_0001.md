```coffeescript
Test.describe "Example tests", ->
  Test.it "Tests for even numbers", ->
    Test.assertEquals (solution  2), "Even"
    Test.assertEquals (solution -6), "Even"
  Test.it "Tests for odd numbers", ->
    Test.assertEquals (solution  1), "Odd"
    Test.assertEquals (solution -7), "Odd"
```