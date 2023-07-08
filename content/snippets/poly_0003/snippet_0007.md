```clojure
;; TODO: TDD using clojure.test framework
(ns kata-test
  (:require [clojure.test :refer :all]
            [kata :refer [user-solution]]))

(deftest example-test
 (testing "Test case 1"
   (is (= (user-solution input1)  true ) "Incorrect answer for input = input1"))
 (testing "Test case 2"
   (is (= (user-solution input2)  false) "Incorrect answer for input = input2")))
```

### More information:

- [`clojure.test`](https://clojuredocs.org/clojure.test) in Clojure documentation.
