```python
from solution import user_solution
import codewars_test as test

@test.describe("Example tests")
def example_tests():
    
    @test.it("Test case 1")
    def test_case_1():
        test.assert_equals(user_solution(input1), True, "Incorrect answer for input = input1")
    
    @test.it("Test case 2")
    def test_case_2():
        test.assert_equals(user_solution(input2), False, "Incorrect answer for input = input2")
    
```

### More information:

- [Python Codewars Test Framework](https://docs.codewars.com/languages/python/codewars-test) in Codewars authoring docs.
