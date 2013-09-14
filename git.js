var platform = require('git-node-platform');
var fsDb = require('git-fs-db')(platform);
var jsGit = require('js-git')(platform);
var gitRemote = require('git-net')(platform);
var fs = platform.fs;

exports.version = require('js-git/package.json').version;

exports.repo = createRepo;
function createRepo(path) {
  return jsGit(fsDb(fs(path)));
}

exports.remote = createRemote;
function createRemote(url) {
  return gitRemote(url);
}
