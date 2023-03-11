```ocaml
assert_equal expected actual 
  ~msg:     ("Incorrect answer for input=" ^ string_of_int input) 
  ~printer: (Printf.sprintf {|"%s"|})
```

### Related snippets

- "Informative assertions"
- "Printers for assertions"