var feedbackApp = angular.module('myFeedback', ['ngAnimate', 'ui.bootstrap']);

feedbackApp.directive('myDirective', function () {
    return {
      restrict: 'A',
      scope: {
        attr: '=',
      },
      link: function(scope, element) {
        //console.log('directive triggered');
        scope.$watch('attr', function(attr) {
            //console.log('attr: ', attr);
            // console.log('scope: ', scope)
            // console.log('element: ', element);
            //console.log('element.span: ', element[0]);
        //   if (shown) {
        //     element.popover('show');
        //   } else {
        //     element.popover('hide');
        //   }
        });
      }
    };
});

feedbackApp.controller('feedbackCtrl', function($scope, $sce) {

    $scope.title = 'Feedback simulation';
    $scope.subTitle = 'Reason why bad:'
    $scope.results = [{ id: 1},{ id: 2},{ id: 3},{ id: 4}];
    $scope.feedbackIsBadCollection = [];
    $scope.feedbackUpTogglerList = [];

    $scope.template =  $sce.trustAsResourceUrl("template.html");
    $scope.thanks =  $sce.trustAsResourceUrl("thanks.html");

    $scope.templates = [];
    for(let i = 1; i <= 4; i++){
        //$scope.templates[i] = $scope.template;
        $scope.templates[i] = $sce.trustAsResourceUrl("template.html");
    }

    $scope.sendFeedback = (isBad, id, reason = '') => {
        console.log('Triggered: ', id);
            
        if (isBad) {
            $scope.feedbackIsBadCollection[id] = true;
        } else {
            $scope.feedbackUpTogglerList[id] = !$scope.feedbackUpTogglerList[id];
            $scope.feedbackIsBadCollection[id] = false;
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
        console.log('feedback: ', feedback);
    }

    $scope.submit = (reason, id) => {
        $scope.templates[id] = $sce.trustAsResourceUrl("thanks.html");
        //$scope.templates[id] = $scope.thanks;
        $scope.sendFeedback(true, id, reason);
    }
});