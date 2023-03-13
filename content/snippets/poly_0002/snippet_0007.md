```cpp
Assert::That(actual, Equals(expected), ExtraMessage("Incorrect answer for n=" + std::to_string(input)));
```

`ExtraMessage` should contain only some additional information about a reason of a failure. Snowhouse library provides basic information, such as `actual` and `expected` values, kind of a failed assertion, etc.

### Additional info:

- [C++ authoring guide](https://docs.codewars.com/languages/cpp/authoring#custom-assertion-messages)