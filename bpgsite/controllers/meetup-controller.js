var myApp = angular.module('myApp', ['rmMeetup'])
    .config(
        [
            "rmConsumerProvider",
            function(rmConsumerProvider) {
                rmConsumerProvider.setKey('243d525232050616fcc4368743820');
                rmConsumerProvider.setRedirectURI('http://127.0.0.1:3000');
            }
        ]
    );

myApp.controller("MeetupController", ['$scope', 'rmMeetupOauthService', meetupController]);
 
function meetupController($scope, rmMeetupOauthService){
    $scope.refreshOauthAccess = function(){
        var oauthAccess = rmMeetupOauthService.getOauthAccess();
 
        $scope.token = oauthAccess.tokenAccess;
        $scope.expiresIn = oauthAccess.expiresIn;
    }
};

myApp.controller("MeetupController", ['$scope', 'rmMeetupMembersService', meetupController]);
 
function meetupController($scope, rmMeetupMembersService){
    $scope.getMember = function(token){
        rmMeetupMembersService.getLoggedMember(token).then(function(member){
            $scope.member = member;
        });
    }
};