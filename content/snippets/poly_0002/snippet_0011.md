```rust
assert_eq!(actual, expected, "\nYour result (left) does not match the expected output (right) for the input {input:?}");
```

`assert_eq!` provides a somewhat verbose failure message, which does not explain the reason of a failure very clearly. It cannot be replaced either. It seems that the only way to provide explicit information on failure is to compose own message and present it additionally to the default one. Getting a nice layout requires some newlines too.
