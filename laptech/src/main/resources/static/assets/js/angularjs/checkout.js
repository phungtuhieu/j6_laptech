app.controller("checkout", checkout)

const BANK = {
    NCB : 1,
    ACB : 2,
    MBBANK : 3,
}
function checkout($scope,$http) {
    $scope.paymentSelect = false;
    
    
    $scope.$watch('paymentSelect', function(newValue, oldValue) {
        if (newValue === false) {
          $scope.optionBank = -1;
        }
      });
   
}