### Single values

```ocaml
let string_of_bool = function false -> "false" | true -> "true"
let string_of_char c = String.make 1 c
let string_of_int = string_of_int
let string_of_float = string_of_float

(* ".2" means rounded to two decimals after the decimal point *)
let string_of_float_with_reduced_precision f = Printf.sprintf "%.2f" f
```

### Collections

```ocaml
let string_of_option elem_printer = function None -> "None" | Some e -> "Some (" ^ elem_printer e ^ ")"
let string_of_list elem_printer l = "[" ^ (String.concat "; " @@ List.map elem_printer l) ^ "]"
let string_of_array elem_printer t = "[" ^ (String.concat "; " @@ List.init (Array.length t) (fun i -> elem_printer t.(i))) ^ "]"
```

### Composite

```ocaml
let string_of_int_list = string_of_list string_of_int
let string_of_int_matrix = string_of_list string_of_int_list
let string_of_float_option = string_of_option string_of_float_with_reduced_precision
let string_of_float_option_array = string_of_array string_of_float_option
```

### Batteries

```ocaml
(* A printer for list of list of ints *)
let string_of_int_matrix = IO.to_string @@ List.print (List.print Int.print)

(* A printer for a set of strings *)
let string_of_string_set = IO.to_string @@ Set.print String.print_quoted
```