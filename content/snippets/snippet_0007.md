```c
void shuffleFisherYates(T* items, int n) {
     for (int i = n - 1; i > 0; i--) {
         int j = rand() % (i + 1);
         T tmp = items[j];
         items[j] = items[i];
         items[i] = tmp;
     }
}
```