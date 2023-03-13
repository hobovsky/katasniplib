```scala
// `assertResult`
assertResult(expected, s"\nIncorrect answer for input = $input") { actual }

// `should` matcher and `withClue`
withClue(s"Incorrect answer for input = $input\n")  { actual should be (expected) }

// `shoudBe` and `AppendedClues.withClue`
actual shouldBe expected withClue s"\nIncorrect answer for input = $input" // with AppendedClues
```

ScalaTests allows for a variety of testing techniques and assertions, and this snippet presents only a small selection of them. Custom message should contain only some additional information about a reason of a failure. ScalaTest provides basic information, such as `actual` and `expected` values, kind of a failed assertion, etc.

In context of Codewars kata, the `assertResult(expected, message)` seems to give the most reasonable built-in message.
