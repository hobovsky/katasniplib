```fsharp
module ExampleTests

  open KataModule
  // NUnit is used to test F# 6.0.
  open NUnit.Framework

  [<Test>]
  let testCase1() =
      Assert.AreEqual(true, isLeapYear(2020));

  [<Test>]
  let testCase2() =
      Assert.AreEqual(true, isLeapYear(2000));
```
