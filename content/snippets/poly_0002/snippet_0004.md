```java
// Use a static import to reduce boilerplace code
import static org.junit.jupiter.api.Assertions.assertEquals;

...

// In JUnit 5, custom messages can be strings...
String message = String.format("Incorrect answer for input = %d", input);
assertEquals(expected, actual, message);

// ... or messages can be provided lazily, with a message supplier
// (an instance of java.util.function.Supplier<String>)
Supplier<String> messageSupplier = () -> "Incorrect answer for input = " + input;
assertEquals(expected, actual, messageSupplier);
```

Custom message should contain only some additional information about a reason of a failure. JUnit provides basic information, such as `actual` and `expected` values, kind of a failed assertion, etc.

### Additional info:

- [JUnit assertions reference](https://junit.org/junit5/docs/5.0.1/api/org/junit/jupiter/api/Assertions.html)