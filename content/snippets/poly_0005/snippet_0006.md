```javascript
describe("Group 1", function() {
  it("Test 1", function() {
    // ...
  });

  it("Test 2", function() {
    // ...
  });
});

describe("Group 2", function() {
  it("Test 1", function() {
    // ...
  });
});
```

Mocha allows for nesting `describe` blocks, and top-level `it`:

```javascript
it("Top level test", function() {
  // ...
});

describe("Group outer", function() {
  
  describe("Group inner", function() {
    it("Test inner", function() {
      // ...
    });
  });  
  
  it("Test outer", function() {
    // ...
  });
});
```

### More information:

- [Mocha documentation](https://mochajs.org/#getting-started)