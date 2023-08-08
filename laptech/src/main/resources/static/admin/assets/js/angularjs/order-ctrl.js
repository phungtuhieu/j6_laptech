const host = "http://localhost:8081/api/order";
const app = angular.module("app", []);

app.controller("list", list)

function list ($scope, $http,$location) {
    var pageName = "pending";
    $scope.isLoading = true;
    var urlString = $location.absUrl();
    const parts = urlString.split("/"); 
     pageName = parts[parts.length - 2];
    console.log(pageName);
    var  getUrl = (url) => {
        return `${host}/${url}`;
      };
    var status
    switch(pageName) {
        case "pending":
            status  = "pending";
          break;
        case "shipping":
            status  = "shipping";
          break;
        case "shipped":
            status  = "completion";
          break;
        case "canceled":
            status  = "canceled";
          break;
        default:
            break;
      }
      var  getUrl = (url) => {
        return `${host}/${url}`;
      };
    var url = "";

    var load_all = () => {
        url = getUrl(status);
        $http.get(url).then(resp => {
            console.log(resp.data)
            $scope.page = resp.data;
            $scope.isLoading = false;
        }).catch(err => {
            
        })
    }
    load_all();
} 