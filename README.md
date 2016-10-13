Browser tests for analyzing and verifying Hovercards behavior.

Needs node 6+, npm 3+

Example of one of the latest test runs:
https://gist.github.com/joakin/3f876fc007758bd8c8f7e5e8bbae84ff

```
npm install
export WAIT_TIME=3000
export TEST_URL=http://localhost:8888/w/index.php/Test_hovercards
node index.js
```

If you want to see the browser windows open `index.js` and change `show: false`
to `show: true`.

