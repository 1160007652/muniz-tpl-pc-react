
### Tips
#### Unexpected array conversion in Chrome.storage
> Example
```js
{ data: [1,2,3,4] }
// Becomes
{ data: [{0:1}, {1: 2}, {2:3}, {3:4}] }
```

> Solution

1. Convert Object into string using `JSON.string()`.
2. Call `Chrome.storage.sync.set` to store data.
```js
{ data: [1,2,3,4] }
// Stays the same
{ data: [1,2,3,4] }
```
