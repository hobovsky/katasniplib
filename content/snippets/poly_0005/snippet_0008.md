Codewars setup requires that tests for OCaml kata are exposed as `suite` member of `Tests` module:

```ocaml
module Tests = struct  (* Module 'Tests' is required by Codewars setup *)
  open OUnit
  let suite = [        (* Variable 'suite' is required by Codewars setup *)
    "group 1" >:::
      [
        "test 1" >:: (fun _ ->
          ()(* ... assertions and checks ... *)
        );
        "test 2" >:: (fun _ ->
          ()(* ... assertions and checks ... *)
        )
      ];
    "group 2" >:::
      [
        "test 1" >:: (fun _ ->
          ()(* ... assertions and checks ... *)
        )
      ]            
    ]
end
```

Additionally, OUnit allows for many other possibilities of organization of tests: nested test groups, additional labels (also nested), unlabeled tests, etc. 

### More information:

- [Constructing tests](https://ocaml.org/p/ounit2/2.2.3/doc/OUnit2/index.html#constructing-tests) in OUnit reference.
- [Example kumite](https://www.codewars.com/kumite/620a7361d746e5000f36a021/?sel=620a7361d746e5000f36a021) showcasing various possibilities of OUnit.