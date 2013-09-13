var platform = require('git-node-platform');
var fsDb = require('git-fs-db')(platform);
var jsGit = require('js-git')(platform);
var gitRemote = require('git-net')(platform);
var fs = platform.fs;

module.exports = {
  repo: createRepo,
  remote: createRemote
};

function createRepo(path) {
  return jsGit(fsDb(fs(path)));
}

function createRemote(url) {
  var repo = jsGit({});
  var remote = gitRemote(url);
  remote.ls = function (callback) {
    return repo.lsRemote(remote, callback);
  };
  return remote;
}
