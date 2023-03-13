```ocaml
assert_equal expected actual 
  ~msg:     ("Incorrect answer for input=" ^ string_of_int input) 
  ~printer: (Printf.sprintf {|"%s"|})
```

### Related snippets

- "Informative assertions"
- "Printers for assertions"

### Additional info

- [Improving OUnit Output](https://cs3110.github.io/textbook/chapters/data/ounit.html#improving-ounit-output)
- [OUnit: xUnit testing framework for OCaml](https://ocaml.org/p/ounit2/2.2.3/doc/index.html#error-reporting)