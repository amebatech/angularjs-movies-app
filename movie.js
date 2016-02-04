// JavaScript source code
var myApp = angular.module('myApp', []);

function MyCtrl($scope) {
    $scope.movies = [
              { title: 'The Matrix', description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", imageUrl: "http://ia.media-imdb.com/images/M/MV5BMTkxNDYxOTA4M15BMl5BanBnXkFtZTgwNTk0NzQxMTE@._V1_SX640_SY720_.jpg", rating: 7.5, category: 'Action' },
          { title: 'Focus', description: "In the midst of veteran con man Nicky's latest scheme, a woman from his past - now an accomplished femme fatale - shows up and throws his plans for a loop.", imageUrl: "http://ia.media-imdb.com/images/M/MV5BMTUwODg2OTA4OF5BMl5BanBnXkFtZTgwOTE5MTE4MzE@._V1_SX640_SY720_.jpg", rating: 6.9, category: 'Comedy' },
          { title: 'The Lazarus Effect', description: "A group of medical students discover a way to bring dead patients back to life.", imageUrl: "http://ia.media-imdb.com/images/M/MV5BMjM2ODM1OTA0M15BMl5BanBnXkFtZTgwMDMxMDI5MzE@._V1_SX640_SY720_.jpg", rating: 6.4, category: 'Thriller' },
          { title: 'Everly', description: "An action/thriller centered on a woman who faces down hitmen sent by her ex, a mob boss, while holed up in her apartment.", imageUrl: "http://ia.media-imdb.com/images/M/MV5BMjEyNTU4NTE5NV5BMl5BanBnXkFtZTgwNzY4NzIxNDE@._V1_SX640_SY720_.jpg", rating: 5.0, category: 'Action' },
          { title: 'Maps to the Stars', description: "A tour into the heart of a Hollywood family chasing celebrity, one another and the relentless ghosts of their pasts.", imageUrl: "http://ia.media-imdb.com/images/M/MV5BMTY3MjQwNzYyNV5BMl5BanBnXkFtZTgwNTY3NDQ5MzE@._V1_SX640_SY720_.jpg", rating: 7.5, category: 'Drama' }
    ];
}

var uniqueItems = function (data, key) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var value = data[i][key];
        if (result.indexOf(value) == -1) {
            result.push(value);
        }
    }
    return result;
};

myApp.filter('groupBy',
  function () {
      return function (collection, key) {
          if (collection === null) return;
          return uniqueItems(collection, key);
      };
  });


myApp.controller('RatingCtrl', function ($scope) {
    $scope.rating = 5;
    $scope.rateFunction = function (rating) {
        alert('Rating selected - ' + rating);
    };
})
  .directive('starRating',
    function () {
        return {
            restrict: 'A',
            template: '<ul class="rating">' + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' + '\u2605' + '</li>' + '</ul>',
            scope: {
                ratingValue: '=',
                max: '=',
                onRatingSelected: '&'
            },
            link: function (scope, elem, attrs) {
                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };

                scope.toggle = function (index) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                scope.$watch('ratingValue',
                  function (oldVal, newVal) {
                      if (newVal) {
                          updateStars();
                      }
                  }
                );
            }
        };
    }
  );

