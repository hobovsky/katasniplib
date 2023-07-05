```rust
#[cfg(test)]
mod tests {
    use super::my_solution;

    #[test]
    fn test_case_1() {
        // ...
    }
    
    #[test]
    fn test_case_2() {
        // ...
    }    
}
```

Test modules can be nested, but on Codewars they do not result in a nicely nested collapsible groups in the test output panel.

### More information:

- [Test Organization](https://doc.rust-lang.org/book/ch11-03-test-organization.html) in Rust documentation.
