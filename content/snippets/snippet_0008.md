```python
#import modules explicitly
import codewars_test as test
import preloaded
from solution import user_solution

@test.describe('Fixed tests')
def fixed_tests():

    @test.it('Regular cases')
    def regular_cases():
        test.assert_equals(user_solution([1, 2, 3]), 6)
        test.assert_equals(user_solution([2, 3]), 5)

    @test.it('Edge cases')
    def edge_cases():
        test.assert_equals(user_solution([]), 0, "Invalid answer for empty list")
        test.assert_equals(user_solution([2]), 2, "Invalid answer for one element list")

    @test.it('Input should not be modified')
    def do_not_mutate_input():
        source_arr = list(range(100))
        random.shuffle(source_arr)
        arr_copy = source_arr[:]
        #call user solution and ignore the result
        user_solution(arr_copy)
        #arr_copy should not be modified
        test.assert_equals(arr_copy, source_arr, 'Input list was modified')


@test.describe('Random tests')
def random_tests():

    #non-global reference solution
    def reference_solution(arr):
        # calculate and return reference answer

    #generate data for test cases with small inputs
    #this test case generator combines a few types of input
    #in one collection
    def generate_small_inputs():    
        test_cases = []
        
        #first type of input: regular list of small inputs (many of them)
        for _ in range(50):
            test_cases.append(generate_small_test_case())
        
        #another type of input: list with potentially tricky numbers
        #(possibly many of them)
        for _ in range(50):
            test_cases.append(generate_small_tricky_test_case())

        #potential edge case of single element list (a few of them)
        for _ in range(10):
            test_cases.append(generate_single_element_edge_case())

        #another edge case: empty list
        #Not always necessary, usually fixed test is enough.
        #If present, there's no need for more than one.
        test_cases.append([])

        #randomly shuffle test cases to make their order unpredictable
        random.shuffle(test_cases)

        return test_cases

    #Generator for large test cases, can be used for performance tests.
    #Can generate structure and types of test cases similar to the
    #generate_small_test_cases, but can also add more tricky cases,
    #or skip on edge cases if they were sufficiently tested in the smaller set.
    def generate_large_cases():
        #... actual implementation

    @test.it('Small inputs')
    def small_inputs():
        
        inputs = generate_small_inputs()
        for input in inputs:

            #call reference solution first, in separate statement.
            #we know it does not mutate the list, so no copy is needed
            expected = reference_solution(input)

            #call user solution and get actual answer.
            #since the input is used after this call to compose
            #the assertion message, a copy is passed
            actual = user_solution(input[:])
            
            #Call assertion function.
            #Custom assertion message is used to help users with diagnosing failures.
            #Assertion message uses original, non-modified input.
            test.assert_equals(actual, expected, f'Input: {input}')

    @test.it('Large random tests')
    def large_random_tests():
        
        large_inputs = generate_large_cases()
        
        for input in large_inputs:
            
            #expected answer calculated first, on separate line
            expected = reference_solution(input)
            
            #assertion message composed before the user solution has a chance
            #to mutate the input list
            message = f'Invalid answer for list of length {len(input)}'

            #actual answer calculated as second.
            #no copy is made because input is not used anymore
            test.assert_equals(user_solution(input), expected, message)
```

More info:

- [Python authoring guide](https://docs.codewars.com/languages/python/authoring#example-test-suite) in Codewars documentation.",
