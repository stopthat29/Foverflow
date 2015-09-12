/**
 *
 * Created by Malamute on 9/11/15.
 */
app.controller('pageController', ['$scope', '$http', 'commentSrv',
    function ($scope, $http, commentSrv) {
        $http.get('/page', {params: {pageName: "Photos Page"}}).
            sucess(function (data, status, headers, config) {
                $scope.page = data;
                $scope.loadComments();
            })
            .error(function (data, status, headers, config) {
                $scope.page = {};
            });
        $scope.addReply = function (parentCommentID, subject, body) {
            var newComment = {subject: subject, body: body};
            commentSrv.addComment($scope.commentThread._id,
                parentCommentId,
                newComment,
                function (err, comment) {
                    $scope.loadComments();
                });

        };
        $scope.loadComments = function () {
            commentSrv.getComment($scope.page.commentId,
                function (err, comment) {
                    if (err) {
                        $scope.commentThread = {};

                    } else {
                        $scope.commentThread = comment;
                    }
                });
        };

    }]);