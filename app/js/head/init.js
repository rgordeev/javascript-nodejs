// use global variables, because head.js and main.js include different modules
window.initHandlers = {};
window.initWhenReadyCalled = {};

// Usage:
//  initWhenReady('login')
//    will trigger addInitHandler('login')
//    and wait if it doesn't exist yet

// if initWhenReady is first (from HTML)
//  -> initWhenReadyCalled[name] = true
//  -> then addInitHandler uses it

// if addInitHandler is first (from SCRIPT)
//  -> initHandlers[name] = handler
//  -> then initWhenReady uses it
function initWhenReady(name) {
//  console.log("initWhenReady", name);
  if (window.initHandlers[name]) {
    window.initHandlers[name]();
  } else {
    window.initWhenReadyCalled[name] = true;
  }
}

function addInitHandler(name, handler) {
//  console.log("addInitHandler", name, handler);
  if (window.initWhenReadyCalled[name]) {
    handler();
  } else {
    window.initHandlers[name] = handler;
  }
}

window.initWhenReady = initWhenReady;
window.addInitHandler = addInitHandler;
