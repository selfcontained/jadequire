jadequire
=========

require jade files in node (synchronously)

---

Uses `require.extensions[]` internally, and `fs.readFileSync`, so be aware of the synchronous i/o happening if you use this (i.e. not in a request handler).

```
npm install jadequire
```

### register handler
```javascript
var jadequire = require('jadequire');

jadequire({
  extension: '.jade', // default
  encoding: 'utf8', // default
  compileDebug: false, // default
  // ... any other options you can pass into jade.compile()
});
```
...and require your jade files

```jade
//template.jade
h1 {#name}
h2 I was the turkey the whole time! 
```

```javascript
// yes, this is synchronous i/o, so be careful where you use it
var tpl = require('template.jade');

tpl({name:'Zim'});
```

```html
<h1>Zim</h1>
<h2>I was the turkey the whole time!</h2>
```

### unregister handler

```javascript
jadequire.remove(); // removes '.jade' extension handler

jadequire.remove('.jd') // specify handler to remove

// jadequire also returns a handler that can be removed
var handler = jadequire({
  extension: '.jd'
});

handler.remove(); // removes the .jd extension handler
```
