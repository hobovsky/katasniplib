Clojure `is` macro accepts an optional assertion message to present additional information on failure. `is` also emits additional information about `expected` and `actual` expressions, but its presentation can be appreciated only by most hardcore Clojure users.

```clojure
(is (= (user-solution input)  expected) "Incorrect answer for input = input")
```

### More information:

- [`clojure.test`](https://clojuredocs.org/clojure.test) in Clojure documentation.
