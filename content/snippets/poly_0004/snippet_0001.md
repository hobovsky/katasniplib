```crystal
describe "Submission tests" do
  
  do_test = ->(year : Int32, expected : Bool) {
    actual = is_leap_year year
    actual.should (eq expected), "Incorrect answer for year = #{year}.\nExpected #{expected}, but got #{actual}."
  }
  
  describe "Fixed tests" do  
    it "Leap years divisible by 4" do
       [2020, 1824, 2152].each { |year| do_test.call(year, true) }
    end

    it "Leap years divisible by 400" do
       [1600, 2000, 2400].each { |year| do_test.call(year, true) }
    end

    it "Non-leap years divisible by 100" do
        [1800, 1900, 2100, 2200].each { |year| do_test.call(year, false) }
    end

    it "Regular non-leap years" do
        [1821, 1942, 2113, 2254].each { |year| do_test.call(year, false) }
    end
  end
  
  describe "Random tests" do
    
    rnd = Random.new
    
    years_mul_400   = (0..6).map { |n| 1600 + n * 400 }.to_a
    years_mul_100   = years_mul_400.map { |y| [y + 100, y + 200, y + 300] }.flatten.to_a
    years_mul_4     = (1..50).map { |_| 1600 + rnd.rand(0..15) * 100 + rnd.rand(1..24) * 4 }.to_a
    years_non_mul_4 = years_mul_4.map { |year| year + rnd.rand(1..3) }.to_a
    
    test_cases = (
      (years_mul_400 + years_mul_4    ).map {|y| {y, true }} + 
      (years_mul_100 + years_non_mul_4).map {|y| {y, false}}
    )
    
    test_cases.shuffle(rnd).each { |test_case|
      it "Year #{test_case[0]}" do
        do_test.call(test_case[0], test_case[1])
      end
    }
  end
end
```