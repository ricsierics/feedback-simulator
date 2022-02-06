var feedbackApp = angular.module('myFeedback', ['ngAnimate', 'ui.bootstrap']);

feedbackApp.directive('myDirective', function () {
    return {
      restrict: 'A',
      scope: {
        shown: '=',
      },
      link: function(scope, element, attrs) {
        scope.$watch('shown', function(shown) {
            if (shown) {
                console.log('shown: ', shown);
                attrs.$set('popover-trigger', "none");
            }
        });
      }
    };
});

feedbackApp.controller('feedbackCtrl', function($scope, $sce, $timeout) {

    $scope.title = 'Feedback simulation';
    $scope.subTitle = 'Reason why bad:'
    $scope.results = [{ id: 1},{ id: 2},{ id: 3},{ id: 4}];
    $scope.feedbackIsBadCollection = [];
    $scope.feedbackUpTogglerList = [];

    $scope.template =  $sce.trustAsResourceUrl("template.html");
    $scope.thanks =  $sce.trustAsResourceUrl("thanks.html");

    $scope.templates = [];
    $scope.shown = [];

    $scope.sendFeedback = (isBad, id, reason = '') => {
        //console.log('Triggered: ', id);
            
        if (isBad) {
            $scope.feedbackIsBadCollection[id] = true;
        } else {
            $scope.feedbackUpTogglerList[id] = !$scope.feedbackUpTogglerList[id];
            $scope.feedbackIsBadCollection[id] = false;
            $scope.shown[id] = !$scope.shown[id];
        }

        //Code property/field will be used to represent reverted thumbs up.
        //Sum of +1 and -1 will cancel out the thumbs up made
        let code;
        if (isBad) {
            code = 0;
        } else {
            code = $scope.feedbackUpTogglerList[id] ? 1 : -1
        }

        //Call API with this payload:
        const feedback = {
            id: id,
            isBad: isBad,
            code: code,
            reason: reason
        };
        //console.log('feedback: ', feedback);
    }

    $scope.submit = (reason, id) => {
        $timeout(() => $scope.templates[id] = true, 50);
        $scope.sendFeedback(true, id, reason);
    }
});
  