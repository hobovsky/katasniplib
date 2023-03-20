Ruby tests use RSpec, but support also Codewars Testing Framework for Ruby for backward compatibility. Both global `describe` and `RSpec.describe` can be used:

```ruby
describe "Group 1" do
  it "Test 1" do
    # ...
  end
  it "Test 2" do
    # ...
  end  
end

RSpec.describe "Group 2" do
  it "Test 1" do
    # ...
  end
end
```

RSpec does not allow for nesting of `RSpec.describe` groups. Nested groups have to be introduced with `context`:

```ruby
RSpec.describe "Outer group" do
  context "Inner group" do
    it "Inner test" do
      # ...
    end
  end
  it "Outer test" do
    # ...
  end  
end
```

Codewars Framework `describe` groups can be arbitrarily nested:

```ruby
describe "Outer group" do
  describe "Inner group" do
    it "Inner test" do
      # ...
    end
  end
  it "Outer test" do
    # ...
  end  
end
```

### More informaiton:

- [Basic Structure](https://rspec.info/documentation/3.12/rspec-core/#basic-structure) in RSpec documentation.