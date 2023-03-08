```python
# equality with a custom failure message
test.assert_equals(actual, expected, f'Incorrect answer for input={input}')

# equality with tolerance for floating point values
test.assert_approx_equals(actual, expected, f'Incorrect answer for input={input}')
```