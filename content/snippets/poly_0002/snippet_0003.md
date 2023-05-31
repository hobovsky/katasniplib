```csharp
// Use string interpolation
Assert.AreEqual(expected, actual, $"Incorrect answer for input = {input}");

// Use NUnit formatting
Assert.AreEqual(expected, actual, "Incorrect answer for input = {0}", input);
```

Custom message should contain only some additional information about a reason of a failure. NUnit provides basic information, such as `actual` and `expected` values, kind of a failed assertion, etc.

### Additional info:

- [NUnit assertions reference](https://docs.nunit.org/articles/nunit/writing-tests/assertions/assertions.html)