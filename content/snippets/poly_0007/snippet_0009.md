```python
from random import shuffle

shuffle(my_list)  # shuffles a list in place
```

To get a shuffled copy of a list instead of shuffling in-place, `sample` can be used:

```python
random.sample(my_list, k=len(my_list))
```

### More info

- [`random.shuffle`](https://docs.python.org/3/library/random.html#random.shuffle) in Python docs.