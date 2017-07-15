;(function() {

  'use strict';

  angular.module('boilerplate')
    .directive('boilerplateFooter', boilerplateFooter);

  function boilerplateFooter () {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'components/directives/footer.html'
    };

    return directiveDefinitionObject;
  }

})();