NUnit uses C# namespaces and test classes for grouping:

```csharp
namespace OuterNamespace.InnerNamespace {

  [TestFixture]
  public class TestClass1
  {
    [Test]
    public void TestMethod1()
    {
      // ...
    }

    [Test]
    public void TestMethod2()
    {
      // ...
    }
  }

  [TestFixture]
  public class TestClass2
  {
    [Test]
    public void TestMethod1()
    {
      // ...
    }

    [Test]
    public void TestMethod2()
    {
      // ...
    }
  }
}
```

### More information:

- [NUnit docs](https://docs.nunit.org/articles/nunit/intro.html)
