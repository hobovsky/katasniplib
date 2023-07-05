```cpp
#include <random>                              // necessary include for random utilities
std::mt19937 eng { std::random_device{}() };   // an instance of a properly seeded RNG


std::shuffle(testCases.begin(), testCases.end(), eng);
```