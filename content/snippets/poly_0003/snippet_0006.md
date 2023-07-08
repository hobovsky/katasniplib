```javascript
const { assert } = require('chai');
describe("Example tests", () => {  
  it("Test case 1", () => {
      assert.strictEqual(user_solution(42), true, "Incorrect answer for input = 42");
  });
  it("Test case 2", () => {
      assert.strictEqual(user_solution(13), true, "Incorrect answer for input = 13");
  });
});
```
