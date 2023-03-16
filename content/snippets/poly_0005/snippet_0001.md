Two test groups, each of them with two tests:

```c
#include <criterion/criterion.h>

Test(group1, test1) {
  // ...
}

Test(group1, test2) {
  // ...
}

Test(group2, test1) {
  // ...
}
```

Criterion framework does not allow for nested groups.

### More information:

- [Adding tests](https://criterion.readthedocs.io/en/master/starter.html#adding-tests) in Criterion reference.