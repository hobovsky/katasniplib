```python
import codewars_test as test

@test.describe("Group 1")
def group1():
    
    @test.it("test1")
    def test1():
        pass # ...
    
    @test.it("test2")
    def test2():
        pass # ...

@test.describe("Group 2")
def group2():
    
    @test.it("test1")
    def test1():
        pass # ...
```

Python Testing Framework for Codewars allows nested `@test.describe` groups, and top-level `@test.it` test cases.

### More information:

- [Decorated functions](https://docs.codewars.com/languages/python/authoring#decorated-functions) in Codewars authoring guide for Python.
- [Organization of tests](https://docs.codewars.com/languages/python/codewars-test#organization-of-tests) in Codewars Python Testing Framework reference.
