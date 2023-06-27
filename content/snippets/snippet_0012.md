Criterion testing framework provides possibility of setting titles to tests and test cases:

```c
Test(FixedTests, testLeapMul4, .description = "Leap years divisible by 4") {
    // ...
}
```

*Note: * `TestSuite` macro is documented to accept the `.description ` parameter, but it does not seem to have an effect in Codewars setup.

### More info

- [Configuring tests](https://criterion.readthedocs.io/en/master/starter.html#configuration-reference) in Criterion docs.