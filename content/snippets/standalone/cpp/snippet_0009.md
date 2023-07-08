Example of a stringizer for `std::pair<F,S>`:

```cpp
namespace snowhouse
{
  template<typename F, typename S>
  struct Stringizer<std::pair<F, S>>
  {
    static std::string ToString(const std::pair<F, S>& a)
    {
      std::stringstream stream;
      stream << '(' << a.first << ", " << a.second << ')';
      return stream.str();
    }
  };
}
```

### More info:

- [Adding Custom Stringizers](https://docs.codewars.com/languages/cpp/igloo/stringizers) in C++ authoring recipes.
