In F#, tests can be organized either with namespaces, or with modules.

Namespaces tend to result in a better grouping in the test output panel.

```fsharp
namespace GroupOuter
  open ExampleKata
  open NUnit.Framework

  [<TestFixture>]
  type Type1Test() =
  
      [<Test>]
      member this.TestMethod1() =
          // ...

      [<Test>]
      member this.TestMethod2() =
          // ...


namespace GroupOuter.GroupInner
  open ExampleKata
  open NUnit.Framework

  [<TestFixture>]
  type Type2Test() =
  
      [<Test>]
      member this.TestMethod1() =
          // ...

      [<Test>]
      member this.TestMethod2() =
          // ...
```

Modules and nested modules also work, but usually result in a more cluttered test output:

```fsharp
module GroupOuter

  open ExampleKata
  open NUnit.Framework

  [<Test>]
  let TestMethodModuleLevel() =
      // ...

  [<TestFixture>]
  type Type1Test() =
  
      [<Test>]
      member this.TestMethod1() =
          // ...

      [<Test>]
      member this.TestMethod2() =
          // ...


  module GroupInner =

    [<TestFixture>]
    type Type2Test() =

        [<Test>]
        member this.TestMethod1() =
            // ...

        [<Test>]
        member this.TestMethod2() =
            // ...
```

### More information:

- [F# namespaces](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/namespaces)
- [F# modules](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/modules)
