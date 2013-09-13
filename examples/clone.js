var git = require('../.');
var basename = require('path').basename;

// Create a remote repo
var url = process.argv[2] || "git://github.com/creationix/conquest.git";
var remote = git.remote(url);

// Create a local repo
var path = process.argv[3] || basename(remote.pathname);
var repo = git.repo(path);

console.log("Cloning %s to %s", url, path);

var opts = {
  onProgress: function (progress) {
    process.stderr.write(progress);
  }
};

if (process.env.DEPTH) {
  opts.depth = parseInt(process.env.DEPTH, 10);
}

repo.fetch(remote, opts, function (err) {
  if (err) throw err;
  console.log("Done");
});
