```crystal
describe "Submission tests" do
  
  do_test = ->(input : Int32, expected : Bool) {
    actual = user_solution input
    actual.should (eq expected), "Incorrect answer for input = #{input}.\nExpected #{expected}, but got #{actual}."
  }
  
  describe "Fixed tests" do  
    it "Test scenario 1" do
       [input1, input2, ...].each { |input| do_test.call(input, expected) }
    end
    it "Test scenario 2" do
       [input1, input2, ...].each { |input| do_test.call(input, expected) }
    end
    it "Edge cases" do
       # ... test edge cases
    end
  end
  
  describe "Random tests" do    
    rnd = Random.new    
    inputs_scenario_1 = generate_inputs_scenario_1
    inputs_scenario_2 = generate_inputs_scenario_2    
    test_cases = inputs_scenario_1 + inputs.scenatio_2    
    
    test_cases.shuffle(rnd).each { |test_case|
      it "Input #{test_case[:input]}" do
        do_test.call(test_case[:input], test_case[:expected])
      end
    }
  end
end
```