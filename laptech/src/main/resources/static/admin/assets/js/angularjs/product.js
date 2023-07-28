
const host = "http://localhost:8081/api";
const app = angular.module("app", []);
app.controller("list", list)
    .controller("form", form)

    // Controller List
function list($scope, $http) {

  const url = `${host}/product`;
  $scope.isLoading = true;
  $scope.items = [];
  $scope.load_all = () => {
    $http.get(url).then(
      (resp) => {
        $scope.items = resp.data;
        console.log("Success", resp);
        $scope.isLoading = false;
      },
      (err) => {
        console.log("Errors", err);
        $scope.isLoading = false;
      }
    );
  };

  $scope.edit = (id) => {
    window.sessionStorage.setItem("id", id);
    window.location.href = "/admin/product/update";
  };

  $scope.load_all();
};
// /Controller List

// Controller form
function form ($scope, $http,$location) {
  $scope.isLoading = false;
  $scope.form = {};
  $scope.isEdit = $location.absUrl().includes('update');
 
  $scope.load_form = () => {
    getOptions("/category").then(dataOptions => {
      $scope.optionsCat = dataOptions;
    });
    getOptions("/cpu").then((dataOptions) => {
      $scope.optionsCPU = dataOptions;
    });
    getOptions("/brand").then((dataOptions) => {
      $scope.optionsBrand = dataOptions;
    });
    getOptions("/ram").then((dataOptions) => {
      $scope.optionsRAM = dataOptions;
    });
    getOptions("/storage").then((dataOptions) => {
      $scope.optionsStorage = dataOptions;
    });
    getOptions("/screen-size").then((dataOptions) => {
      $scope.optionsScreen = dataOptions;
    });
    getOptions("/graphics-card").then((dataOptions) => {
      $scope.optionsGraph = dataOptions;
    });
    getOptions("/operating-system").then((dataOptions) => {
      $scope.optionsOS = dataOptions;
    });
  
  }
  function getUrl (url) {
    return `${host}${url}`;
  };

  function getOptions(url) {
   
      return $http.get(getUrl(url)).then(
        (resp) => {
          return resp.data;
        }
      ).catch(err => {
        console.log("Error-Options",err);
        return [];
      });
  }
  $scope.edit = () => {
    const id = window.sessionStorage.getItem("id");
    var url = getUrl(`/product/${id}`);
    $http.get(url).then(resp => {
      $scope.form = resp.data;
      $scope.form.createDate = new Date($scope.form.createDate);
      console.log("Success", resp);
      $scope.isLoading = false;
    }).catch(err => {
      console.log("Err", err);
    })
  }
  if( $scope.isEdit) {
    $scope.isLoading = true;
    $scope.edit();
  }
  $scope.create = (data) => {
    $http.get(url).then(resp => {
      $scope.form = resp.data;
      $scope.form.createDate = new Date($scope.form.createDate);
      console.log("Success", resp);
      $scope.isLoading = false;
    }).catch(err => {
      console.log("Err", err);
    })
  }
$scope.load_form();
}
// /Controller form

