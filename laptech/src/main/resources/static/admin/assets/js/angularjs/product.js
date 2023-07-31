
const host = "http://localhost:8081/api";
const urlImg = "/files/images";
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
  $scope.delete = (id) => {
    var urlDel = url+`/${id}`;
    $http.delete(urlDel).then(resp => {
      var i = $scope.items.findIndex(item => item.id == id);
      $scope.items.splice(i,1);
      console.log("Success-delete", resp);
    }).catch(err => {
      console.log("Err", err);
    })
  }
  $scope.load_all();
};
// /Controller List

// Controller form
function form ($scope, $http,$location,$filter) {
  $scope.isLoading = false;
  $scope.form = {};
  $scope.checkMainImg = 0;
  $scope.isEdit = $location.absUrl().includes('update');
  
  $scope.optionsStatus = [
    {
      id: 1,
      name: "Còn hàng"
    },
    {
      id: 2,
      name: "Hết hàng"
    },
    {
      id: 3,
      name: "Ngừng kinh doanh"
    },
  ]
  $scope.form.status = $scope.optionsStatus[0].id;
  $scope.form.createDate = new Date();
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
  $scope.create = () => {
    var url = getUrl(`/product`);
    var item = angular.copy($scope.form);
    $http.post(url,item).then(resp => {
      console.log("Success-save", resp);
      $scope.form = resp.data;
      saveProdImg($scope.filenames, $scope.form);
      $scope.form = {};
    }).catch(err => {
      console.log("Err", err);
    })
  }
  $scope.update = ()  => {
    var item = angular.copy($scope.form);
    var url = getUrl(`/product/${item.id}`);
   
    $http.put(url,item).then(resp => {
      $scope.form = resp.data;
      console.log("Success-err", resp);
    }).catch(err => {
      console.log("Err", err);
    })
  }
  $scope.delete = (id) => {
    var url = getUrl(`/product/${id}`);
    $http.delete(url).then(resp => {
      $scope.form = {};
      console.log("Success-err", resp);
    }).catch(err => {
      console.log("Err", err);
    })
  }
  if( $scope.isEdit) {
    $scope.isLoading = true;
    $scope.edit();
  }
  // HÌNH ẢNH ------------------------
  $scope.urlImg = function(filename){
    return `${urlImg}/${filename}`;
  }
  $scope.listImg = () => {
    var url = getUrl(`${"/product"}${urlImg}`);
      $http.get(url).then(resp => {
          $scope.filenames = resp.data;
      }).catch(err => {
          console.log("Errors",err);
      })
  }
  $scope.upload = (files) => {
  
    var maxFiles = 5;
    if (files.length > maxFiles) {
        alert("Chỉ được phép chọn tối đa 5 ảnh.");
        files = Array.prototype.slice.call(files).slice(0, maxFiles);
    }
    var emptyImages = maxFiles - $scope.filenames.length;
    if (files.length > emptyImages) {
      alert(`Bạn chỉ có thể chọn thêm ${emptyImages} ảnh nữa.`);
      files = Array.prototype.slice.call(files).slice(0, emptyImages);
    }
      var form = new FormData();
    for(var i = 0; i < files.length;i++){
      form.append("files",files[i]);
    }
    var url = getUrl(`${"/product"}${urlImg}`);
    $http.post(url,form, {
      transformRequest: angular.identity,
      headers: {'Content-Type' : undefined}
    }).then(resp=> {
      $scope.filenames.push(...resp.data);
    }).catch(err => {
      console.log("Errors",err);
    })
  }
  $scope.removeImg = (filename) => {
    var url = getUrl(`${"/product"}${urlImg}`);
      $http.delete(`${url}/${filename}`).then(resp => {
        let i = $scope.filenames.findIndex(name => name == filename);
        $scope.filenames.splice(i,1);
        $scope.checkMainImg = 0;
      }).catch(err => {
          console.log("Errors",err);
      })
  }
  var saveProdImg = (filenames,product) => {
    var url = getUrl(`${"/product"}${urlImg}/save`);
    var productImages = {};
    var list = [];
    for(var i = 0; i < filenames.length;i++){
      productImages  = {
        name: filenames[i],
        main: $scope.checkMainImg == i,
        product:product
     }
     list.push(productImages);
     console.log("as",productImages);
    }
    $http.post(url,list).then(resp => {
      console.log("Success-save-img",resp);
    }).catch(err => {
      console.log("Err-save-img",err);
    })
  }
  
  $scope.selectMain = (index) => {
    $scope.checkMainImg = index;
    
  }
  // /HÌNH ẢNH ------------------------
$scope.listImg();
$scope.load_form();
}
// /Controller form

