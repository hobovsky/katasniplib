```ruby
expect(actual).to eq(expected), "Incorrect answer for input = #{input}\n  Actual: '#{actual}'\nExpected: '#{expected}'"
```

When a custom message is provided, it completely replaces the default message. User has to provide all useful information, like `expected` and `actual` values etc.
