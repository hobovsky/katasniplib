```python
from solution import user_solution
import codewars_test as test
import random

def do_test(test_input, expected):
    actual = user_solution(test_input)
    test.assert_equals(actual, expected, f'Incorrect answer for input {test_input}');

@test.describe("Fixed tests")
def fixed_test():
    @test.it("Test scenario 1")
    def test_scenario_1():
        do_test(input1, True)
        do_test(input2, True)
    @test.it("Test scenario 2")
    def test_scenario_2():
        do_test(input1, False)
        do_test(input2, False)

@test.it("Random tests")
def test_case():
    test_cases_scenario_1 = ... generate tests for scenario 1    
    test_cases_scenario_2 = ... generate tests for scenario 2
    test_cases = test_cases_scenario_1 + test_cases_scenario_2
    random.shuffle(test_cases)
    for test_input, expected in test_cases:
        do_test(test_input, expected)
```

### More information:

- [Python Codewars Test Framework](https://docs.codewars.com/languages/python/codewars-test) in Codewars authoring docs.
- [Authoring Python Content](https://docs.codewars.com/languages/python/authoring) in Codewars authoring docs.