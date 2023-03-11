# Hi

```swift
import XCTest

class FixedTests: XCTestCase {
  
  static var fixedTests = [
    ("Examples",                         testExamples           ),  
    ("Tests for one type of inputs",     testSomeTypeOfInputs   ),
    ("Tests for another type of inputs", testAnotherTypeOfInputs),
    ("Tests for edge cases" ,            testEdgeCases          )
  ]

  func testExamples() {
    // Examples from description
    VerifySolution(1, "Odd" )
    // ...
  }

  func testSomeTypeOfInputs() {
    VerifySolution(2, "Even")
    // ...
  }

  func testAnotherTypeOfInputs() {
    VerifySolution(7, "Odd")
    // ...
  }
  
  func testEdgeCases() {
    VerifySolution(0, "Even")
    // ...
  }
}

class RandomTests: XCTestCase {

  static var randomTests = [
    ("Random tests", testRandom)
  ]  
  
  func testRandom() {    
    let randomCases = ...             // generate random inputs
    for randomCase in randomCases {
      let input    = ...              // input of the test case
      let expected = ...              // expected answer for this test case
      VerifySolution(input, expected)
    }
  }
}

func VerifySolution(_ input: Int, _ expected: String) {
  let actual = solution(n: input)
  XCTAssertEqual(actual, expected, "Incorrect answer for n=\(input)")
}

XCTMain([
  testCase( FixedTests.fixedTests),
  testCase(RandomTests.randomTests)
])
```