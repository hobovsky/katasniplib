```ruby
describe '...' do
  let(:ref_sol) do
    lambda do |args|
      ...
    end
  end

  100.times do
    it '...' do
      expected = ref_sol.call(args)
      actual = ...

      expect(actual).to ...
    end
  end
end
```