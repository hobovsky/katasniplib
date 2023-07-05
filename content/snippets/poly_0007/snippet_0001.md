C# does not provide a standard method for random shuffling, but for kata purposes, a LINQ-based "sort by random key" should be good enough.

```csharp
IEnumerable<T> Shuffle<T>(IEnumerable<T> col) =>
    col.Select(e => (Elem: e, Key: rnd.Next())).OrderBy(t => t.Key).Select(t => t.Elem);
}
```