```ocaml
(* TODO: replace with your own tests, these are just how-to examples.
 * OUnit Spec example:
 * See https://ocaml.org/p/ounit2/2.2.3/doc/index.html for documentation
 * Available packages: https://docs.codewars.com/languages/ocaml
 *)

open Solution
open OUnit
let suite = [
    "Example tests" >:::
        [
            "Testcase A" >:: (fun _ ->
                assert_equal expected  (my_solution inputA) ~printer:string_of_bool ~msg:"Incorrect answer for input = AAAA"
            );
            "Testcase B" >:: (fun _ ->
                assert_equal expected  (my_solution inputB) ~printer:string_of_bool ~msg:"Incorrect answer for input = BBBB"
            );
        ]
    ]

```
