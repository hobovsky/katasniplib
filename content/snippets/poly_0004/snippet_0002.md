```javascript
const { assert } = require('chai');
const _ = require('lodash');

describe("Submission tests", () => {
  
  function doTest(input, expected) {
    const actual = user_solution(input);
    assert.strictEqual(actual, expected, `Incorrect answer for input ${input}`);
  }
  
  describe("Fixed tests", function() {
    it("Test scenario 1", () => {
      doTest(input1, true);
      doTest(input2, true);
    });

    it("Test scenario 2", () => {
      doTest(input1, false);
      doTest(input2, false);
    });
  });  
  
  describe("Random tests", function() {
    it("Random tests", function() {
      let testCases = [];
      for(let i=0; i<25; ++i) {
        let inputScenario1  = ...;
        let inputScenario2  = ...;
        testCases.push([inputScenario1,  expected_1]);
        testCases.push([inputScenario1,  expected_2]);
      }

      for(let [input, expected] of _.shuffle(testCases)) {
        doTest(input, expected);
      }
    });
  });    
});
```