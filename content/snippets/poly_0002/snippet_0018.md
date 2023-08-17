Custom message replaces whole contents of failure messages, so authors have to present `actual` and `expected` explicitly if necessary.

```ruby
expect(actual).to eq(expected), "Incorrect answer for input = #{input}\nActual: #{actual}\nexpected: '#{expected}'\n     got: '#{actual}'"
```

### More information:

- [Method: RSpec::Expectations::ExpectationTarget::InstanceMethods#to](https://rubydoc.info/gems/rspec-expectations/RSpec%2FExpectations%2FExpectationTarget%2FInstanceMethods:to) in RSpec documentation.
