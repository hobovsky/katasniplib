```c
cr_assert_eq(actual, expected,
            "Incorrect answer for input = %d\n"
            "Expected: \"%s\"\n"
            "  Actual: \"%s\"", 
            input, expected, actual);
```

When a custom message is provided, it completely replaces the default message. User has to provide all required information, like `expected` and `actual` values etc.

**Important:** If the `actual` value is meant be printed on failure, it should be sanitized before being formatted. Otherwise, an incorrect answer (for example, an incorrectly null-terminated string returned by a user solution) can cause tests to crash when the failure message is being formatted.

**Note:** Currently, Codewars uses not the most up to date version of the Criterion library, and new style Criterion assertions are currently not suppported.

### Additional info:

- [Criterion documentation](https://criterion.readthedocs.io/en/master/assert_old.html#old-assertions-ref)
- [Codewars C authoring guide](https://docs.codewars.com/languages/c/authoring#calling-assertions)