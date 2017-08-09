var mongoose = require('mongoose');
var q = require('q');
var pageSchema = require('./page.schema.server.js')();
var pageModel = mongoose.model('Page', pageSchema);

module.exports = function () {

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };

    return api;

    function createPage(wid, page) {
        var deferred = q.defer();
        page._website = wid;
        pageModel
            .create(page, function(err, doc) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findAllPagesForWebsite(wid) {
        var deferred = q.defer();
        pageModel
            .find({_website: wid}, function(err, pages) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(pages);
                }
            });
        return deferred.promise;
    }

    function findPageById(pid) {
        var deferred = q.defer();
        pageModel
            .findOne({_id: pid}, function (err, page) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(page);
                }
            });

        return deferred.promise;
    }

    function updatePage(pid, page) {
        var deferred = q.defer();
        pageModel
            .findOneAndUpdate({_id: pid}, page, function(err, page) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(page);
                }
            });

        return deferred.promise;
    }

    function deletePage(pid) {
        var deferred = q.defer();
        pageModel
            .remove({_id: pid}, function(err, doc) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
};