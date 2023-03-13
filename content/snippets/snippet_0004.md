```python
import sys
sys.set_int_max_str_digits(0)
```

In Python 3.11, whenever a large integer (above ~4300 digits) is about to be stringified, an exception is thrown. This causes crashes in tests which present large integers, for example `actual` and `expected` values, in assertion messages. This snippet prevents the exception and enables stringification of all integers, regardless their magnitude.
