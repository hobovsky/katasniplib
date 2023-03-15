Since the submission tests snippet is saved to a single Java file, there can be at most one top level, public class. Fortunately, JUnit works well also with package-visible classes:

```java
class Group1Test {
  @Test
  void testMethod1() {
    // ...
  }
  
  @Test
  void testMethod2() {
    // ...
  }
}

class Group2Test {
  @Test
  void testMethod1() {
    // ...
  }
}
```

Nesting of groups can be achieved with the `@org.junit.jupiter.api.Nested` annotation:

```java
class Outer {
  
  @Nested
  class Group1Test {
    @Test
    void testMethod1() {
      // ...
    }

    @Test
    void testMethod2() {
      // ...
    }
  }

  @Nested
  class Group2Test {
    @Test
    void testMethod1() {
      // ...
    }
  }
}
```

### More information:

- [Nested tests](https://junit.org/junit5/docs/current/user-guide/#writing-tests-nested) in JUnit User Guide
- [Writing Nested Tests](https://www.petrikainulainen.net/programming/testing/junit-5-tutorial-writing-nested-tests/) in Petri Kainulainen's blog.
