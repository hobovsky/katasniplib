Two test groups, each of them with two tests:

```cpp
Describe(group1)
{
    It(test1)
    {
        // ...
    }

    It(test2)
    {
        // ...
    }
};

Describe(group2)
{
    It(test1)
    {
        // ...
    }
};
```

Snowhouse framework allows for nesting `Describe` blocks but it's not very useful in context of Codewars, because they are not reported as nested, but rather all `Describe` groups are flattened to a single level in test output.

### More information (but not much):

- [joakimkarlsson/igloo](https://github.com/joakimkarlsson/igloo) GitHub repoeitory.