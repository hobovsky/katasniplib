```swift
import XCTest
// XCTest Spec Example:
// TODO: replace with your own tests (TDD), these are just how-to examples to get you started

class SampleTest: XCTestCase {
  
    static var sampleTests = [
        ("Tests for even numbers",   testEven),
        ("Tests for odd numbers" ,   testOdd )
    ]

    func testEven() {
        XCTAssertEqual(solution(n:  2), "Even")
        XCTAssertEqual(solution(n: -6), "Even")
    }
    
    func testOdd() {
        XCTAssertEqual(solution(n:  1), "Odd")
        XCTAssertEqual(solution(n: -7), "Odd")
    }
}

XCTMain([
    testCase(SampleTest.sampleTests)
])
```