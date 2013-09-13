var git = require('../.');

var url = process.argv[2] || "git://github.com/creationix/conquest.git";

git.remote(url).ls(function (err, refs) {
  if (err) throw err;
  Object.keys(refs).forEach(function (ref) {
    console.log(refs[ref] + "\t" + ref);
  });
});
