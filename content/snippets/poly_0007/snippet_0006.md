In Go, `Shuffle` requires an implementation of `swapfunc` to be passed in.

```go
import (
    "math/rand"
    "time"
)
rand.Seed(time.Now().UnixNano()) // seed RNG


rand.Shuffle(len(cases), func(i, j int) {
    cases[i], cases[j] = cases[j], cases[i]
})
```