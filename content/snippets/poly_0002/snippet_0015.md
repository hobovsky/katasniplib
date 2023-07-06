Custom message replaces whole contents of failure messages, so authors have to present `actual` and `expected` explicitly if necessary.

```crystal
actual.should (eq expected), "Incorrect answer for input = #{input}\nActual: #{actual}\nExpected: #{expected}"
```

### More information:

- [Object Extensions](https://crystal-lang.org/api/1.0.0/Spec/ObjectExtensions.html) in Spec documentation.
