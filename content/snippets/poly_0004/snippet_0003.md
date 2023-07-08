```clojure
;; TODO: TDD using clojure.test framework
(ns kata-test
  (:require [clojure.test :refer :all]
            [kata :refer [user-solution]]))

(defn do-test "Execute a single test case" [input expected]
  (is 
   (= (user-solution input)  expected) 
   (str "Incorrect answer for input = " input)))

(deftest fixed-tests
  (deftest test-scenario-1
    (testing "Test case"
     (do-test input1 expected1)))
  (deftest test-scenario-2
    (testing "Test case"
     (do-test input2 expected2)))
  (test-scenario-1)
  (test-scenario-2))

(deftest random-tests
  (def test-cases-scenario-1  (... generate test cases ...)) ;; test cases are of form
  (def test-cases-scenario-2  (... generate test cases ...)) ;; { :input :expected }
  
  (def all-test-cases (shuffle (concat test-cases-scenario-1 test-cases-scenario-2)))
  (testing "Test case"
    (doseq [{input :input expected :expected} all-test-cases] (do-test input expected)))
)

(defn test-ns-hook []
  (fixed-tests )
  (random-tests))
```

### More information:

- [`clojure.test`](https://clojuredocs.org/clojure.test) in Clojure documentation.
