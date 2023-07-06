**NOTE:** spaces around the colon in declaration of `arg` are important.

```crystal
def my_solution(arg : Int32): Bool
    false
end
```

In Crystal it's possible to omit types, but doing so may result in more confusing compilation errors if users get types incorrectly:

```crystal
def my_solution(arg)
    false
end
```