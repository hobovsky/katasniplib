```csharp
using System;
using NUnit.Framework;
using Kata;

namespace KataTest {
  
  [TestFixture]
  public class ExampleTests
  {
    
    [Test]
    [Description("Should return false for input=1")]    
    public void TestExample1()
    {
        bool actual = Kata.SolutionFunction(1);
        Assert.AreEqual(false, actual, $"Incorrect answer for input=1");
    }

    [TestCase(1,  ExpectedResult=false, Description="Should return false for input=1")]
    public bool TestExample2(int input) =>
      Kata.SolutionFunction(input);    
  }
}
```

### More information:

- [Writing tests](https://docs.nunit.org/articles/nunit/writing-tests/attributes.html) in NUnit docs.
