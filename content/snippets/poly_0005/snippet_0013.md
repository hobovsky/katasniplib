```swift
import XCTest

class Group1Test: XCTestCase {

  static var allTests = [
    ("Test1", test1),
    ("Test2", test2),
  ]
  
  func test1() {
    // ...
  }
  func test2() {
    // ...
  }
}

class Group2Test: XCTestCase {

  static var allTests = [
    ("Test1", test1)
  ]
  
  func test1() {
    // ...
  }
}

XCTMain([
  testCase(Group1Test.allTests),
  testCase(Group2Test.allTests)
])
```

### More information:

- [Defining Test Cases and Test Methods](https://developer.apple.com/documentation/xctest/defining_test_cases_and_test_methods) in Apple Developer documentation.
