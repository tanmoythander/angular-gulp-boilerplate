describe('LoginController', function() {
  beforeEach(module('unify'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('Login controller setup', function() {
    it('Check controller with default propery value', function() {
      var $scope = {};
      var controller = $controller('LoginController', { $scope: $scope });
      $scope.userID.should.be.empty;
      $scope.pwd.should.be.empty;
      $scope.errMsg.should.be.empty;
      $scope.hasErr.should.be.false;
    });
  });
});