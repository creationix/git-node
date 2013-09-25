var git = require('../.');

// Create a filesystem backed bare repo
var repo = git.repo(process.argv[2] || "test.git");
repo.logWalk(process.argv[3] || "HEAD", function (err, log) {
  if (err) throw err;
  var shallow;
  return log.read(onRead);

  function onRead(err, commit) {
    if (err) throw err;
    if (!commit) return logEnd(shallow);
    if (commit.last) shallow = true;
    logCommit(commit);
    repo.treeWalk(commit.tree, function (err, tree) {
      if (err) throw err;
      tree.read(onEntry);
      function onEntry(err, entry) {
        if (err) throw err;
        if (!entry) {
          return log.read(onRead);
        }
        logEntry(entry);
        return tree.read(onEntry);
      }
    });
  }
});

function logCommit(commit) {
  var author = commit.author;
  var message = commit.message;
  console.log("\n\x1B[33mcommit %s\x1B[0m", commit.hash);
  console.log("Author: %s <%s>", author.name, author.email);
  console.log("Date:   %s", author.date);
  console.log("\n    \x1B[32;1m" + message.trim().split("\n").join("\x1B[0m\n    \x1B[32m") + "\x1B[0m\n");
}

function logEntry(entry) {
  var path = entry.path.replace(/\//g, "\x1B[1;34m/\x1B[0;34m") + "\x1B[0m";
  console.log(" %s %s", entry.hash, path);
}

function logEnd(shallow) {
  var message = shallow ? "End of shallow record." : "Beginning of history";
  console.log("\n\x1B[30;1m%s\x1B[0m\n", message);
}