var git = require('../.');

var url = process.argv[2] || "git://github.com/creationix/conquest.git";

var remote = git.remote(url);
remote.discover(function (err, refs) {
  if (err) throw err;
  Object.keys(refs).forEach(function (ref) {
    console.log(refs[ref] + "\t" + ref);
  });
  remote.close(function (err) {
    if (err) throw err;
  });
});
