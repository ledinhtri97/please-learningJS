function countdown(duration) {
  return new Promise(function(resolve, reject) {
    var interval = setInterval(function() {
      console.log(duration--);
      if (!duration) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}
countdown(5).then(function() { console.log("DONE"); });