NUnit provides a couple of ways of generating test cases out of a single test method:

### `[TestCaseSource]` attribute

```csharp
[TestFixture]
public class SubmissionTests
{
    [TestCaseSource(nameof(GenerateTestCases))]
    public string TestRandom(int arg1, string arg2) =>
        Kata.SolutionFunction(arg1, arg2);

    static IEnumerable<TestCaseData> GenerateTestCases() {
        
        IList<TestCaseData> tests = new List<TestCaseData>();        
        for( ... )
        {
            int arg1 = ...
            string arg2 = ...
            string expected = ...
            string title = $"Should return \"{expected}\" for arg1={arg1}, arg2=\"{arg2}\"";
            tests.Add(TestCaseData(arg1, arg2).Returns(expected).SetDescription(title));
        }
        return tests;
    }
}  
```