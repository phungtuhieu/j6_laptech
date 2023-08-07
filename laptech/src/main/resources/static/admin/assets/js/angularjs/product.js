
const host = "http://localhost:8081/api";
const urlImg = "/files/images";
const app = angular.module("app", []);
const statusProduct = {
    IN_STOCK : 1, // Còn hàng
    OUT_OF_STOCK : 2,// Hết hàng
    DISCONTINUED : 3 // Ngừng kinh doanh
}
app.controller("list", list)
    .controller("form", form)
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  
})
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})
var isCreateSuccess = false;
    // Controller List
function list($scope, $http,$timeout) {

  const url = `${host}/product`;
  $scope.isLoading = true;
  $scope.items = [];
 
  $scope.load_all = () => {
    $http.get(url).then(
      (resp) => {
        $scope.items = resp.data;
        console.log("Success", resp);
        console.log("isCreateSuccess",isCreateSuccess);
        isCreateSuccess = window.localStorage.getItem("isCreateSuccess");
        window.localStorage.removeItem("isCreateSuccess")
        if(isCreateSuccess) {
		
			Toast.fire({
			  icon: 'success',
			  title: 'Tạo mới thành công'
			})
			$scope.isNewProductAdded = true;

	      $timeout(function() {
	        $scope.isNewProductAdded = false;
	        
	      }, 5000);
			
		}
		
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
  $scope.messageError = {
    nameProd: null,
    quantity: null,
    price:null,
    image:null
  };
  $scope.isEdit = $location.absUrl().includes('update');
  $scope.priceForms = [
    {
      price: 0.0,
      product: {},
      startDate: new Date() ,
      endDate:  null,
    }
  ];
  if($scope.isEdit) {
    $scope.priceForms = [];
  }
  $scope.listPriceProduct = [];
  $scope.isLoading = true;
  $scope.form = {};
  $scope.isEditImg = false;

   var listImgIdDeleted = [];
   var listProdImg = [];
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
      $scope.form.category = $scope.optionsCat[0];
    });
    getOptions("/cpu").then((dataOptions) => {
      $scope.optionsCPU = dataOptions;
      $scope.form.cpu = $scope.optionsCPU[0];
    });
    getOptions("/brand").then((dataOptions) => {
      $scope.optionsBrand = dataOptions;
      $scope.form.brand = $scope.optionsBrand[0];
    });
    getOptions("/ram").then((dataOptions) => {
      $scope.optionsRAM = dataOptions;
      $scope.form.ram = $scope.optionsRAM[0];
    });
    getOptions("/storage").then((dataOptions) => {
      $scope.optionsStorage = dataOptions;
      $scope.form.storage = $scope.optionsStorage[0];
    });
    getOptions("/screen-size").then((dataOptions) => {
      $scope.optionsScreen = dataOptions;
      $scope.form.screenSize = $scope.optionsScreen[0];
    });
    getOptions("/graphics-card").then((dataOptions) => {
      $scope.optionsGraph = dataOptions;
      $scope.form.graphicsCard= $scope.optionsGraph[0];
    });
    getOptions("/operating-system").then((dataOptions) => {
      $scope.optionsOS = dataOptions;
      $scope.form.operatingSystem = $scope.optionsOS[0];
      $scope.isLoading = false;
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
      load_price($scope.form.id)
      $scope.form.createDate = new Date($scope.form.createDate);
      console.log("Success", resp);
      loadProdImgUpdate(angular.copy($scope.form));
      $scope.isLoading = false;
      
    }).catch(err => {
      console.log("Err", err);
    })
  }
  var validationForm = () => {
    var isError = false;
    var setError = (fieldName, errorMessage) => {
      $scope.messageError[fieldName] = errorMessage;
      isError = true;
    }
  
    var clearError= (fieldName) => {
      $scope.messageError[fieldName] = null;
    }

    if ($scope.form.name == null) {
      setError('nameProd', 'Vui lòng nhập tên sản phẩm!');
    } else {
      clearError('nameProd');
    }
  
    if ($scope.form.quantity == null) {
      setError('quantity', 'Vui lòng nhập số lượng!');
    } else {
      if ($scope.form.quantity <= 0) {
        setError('quantity', 'Số lượng phải lớn hơn 0!');
      } else {
        clearError('quantity');
      }
    }
  
    if ($scope.filenames.length <= 0) {
      setError('image', 'Vui lòng chọn ảnh');
    } else {
      clearError('image');
    }
  
    if ($scope.priceForms[0].price <= 0) {
      setError('price', 'Giá phải lớn hơn 0!');
    } else {
      clearError('price');
    }
    return isError ;
  }
  $scope.create = () => {
    var url = getUrl(`/product`);
    var item = angular.copy($scope.form);
    var isError = false;
    isError = validationForm();
    if(!isError) {
      $http.post(url,item).then(resp => {
        console.log("Success-save", resp);
        $scope.form = resp.data;
        createProdImg($scope.filenames, $scope.form);
        createPrice($scope.priceForms, $scope.form);
        $scope.priceForms = [];
        $scope.form = {};
        $scope.filenames.length = 0;
        window.location.href = "/admin/product/list";
        window.localStorage.setItem("isCreateSuccess",true)
      }).catch(err => {
        console.log("Err", err);
      })
    }
    
  }
  $scope.update = ()  => {
    var item = angular.copy($scope.form);
    var url = getUrl(`/product/${item.id}`);
    var isError = false;
    isError = validationForm();
    if(!isError) {
       $http.put(url,item).then(resp => {
      $scope.form = resp.data;
       $scope.form.createDate = new Date($scope.form.createDate);
       if($scope.priceForms.length > 0) {
        createPrice($scope.priceForms,$scope.form);
       }
      if(listImgIdDeleted.length > 0) {
		   deleteProdImg();
	  }
    Toast.fire({
      icon: 'success',
      title: 'Đã cập nhật thành công'
    })
      console.log("Success-", resp);
    }).catch(err => {
      console.log("Err", err);
    })
    }
   
  }
  $scope.delete = (id) => {
    var url = getUrl(`/product/${id}`);
    $http.delete(url).then(resp => {
      $scope.form = {};
      $scope.filenames.length = 0;
      console.log("Success-err", resp);
    }).catch(err => {
      console.log("Err", err);
      if(err.status === 409) {
        swalWithBootstrapButtons.fire({
          title: 'Bạn có muốn ngừng kinh doanh?',
          text: "Thông tin sản phẩm đã được lưu ở nơi khác không thể xóa!",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Không, Hủy bỏ!',
          confirmButtonText: 'Có, Ngừng kinh doanh!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              'Đã ngừng kinh doanh!',
              'Sản phẩm đã chuyển trạng thái ngừng kinh doanh.',
              'success'
            )
            var item = angular.copy($scope.form);
            item.status = statusProduct.DISCONTINUED;
            $http.put(url,item).then(resp => {
              $scope.form = resp.data;
              $scope.form.createDate = new Date($scope.form.createDate);
               if($scope.priceForms.length > 0) {
                createPrice($scope.priceForms,$scope.form);
               }
              
              if(listImgIdDeleted.length > 0) {
               deleteProdImg();
              }
              console.log("Success-", resp);
            }).catch(err => {
              console.log("Err", err);
            })
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Đã hủy thao tác',
              'Thao tác đã được hủy',
              'error'
            )
          }
        })
      }
    })
  }
  if( $scope.isEdit) {
    $scope.edit();
  }
  // HÌNH ẢNH ------------------------
  $scope.urlImg = function(filename){
    return `${urlImg}/${filename}`;
  }
  $scope.listImg = () => {
    var url = getUrl(`${urlImg}`);
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
    var url = getUrl(`${urlImg}`);
    $http.post(url,form, {
      transformRequest: angular.identity,
      headers: {'Content-Type' : undefined}
    }).then(resp=> {
      $scope.filenames.push(...resp.data);
      var listName = [];
      listName.push(...resp.data);
     	if($scope.isEdit) {
			  createProdImg(listName,$scope.form);
		 }
		 
    }).catch(err => {
      console.log("Errors",err);
    })
  }
  $scope.removeImg = (filename) => {
    var url = getUrl(`${urlImg}`);
		$http.delete(`${url}/${filename}`).then(resp => {
        let i = $scope.filenames.findIndex(name => name == filename);
        $scope.filenames.splice(i,1);
        if($scope.isEdit) {
			deleteProdImg(i);
		}
      }).catch(err => {
          console.log("Errors",err);
      })
  }
   var deleteProdImg = (index) => {
	  var prodImg = listProdImg[index];
	  var url = getUrl(`/product/img/delete/${prodImg.id}`);
	  $http.delete(url).then( resp => {
		  console.log("Success-del-img",resp);	
	  }).catch(err => {
		  console.log("Err-del-img",err);		  
	  });
  }
  var createProdImg = (filenames,product) => {
    var url = getUrl(`/product/img/save`);
    var productImages = {};
    var list = [];
    for(var i = 0; i < filenames.length;i++){
      productImages  = {
        name: filenames[i],
        main: i == 0 ? true: false,
        product:product
     }
     list.push(productImages);
     console.log("as",productImages.main);
    }
    $http.post(url,list).then(resp => {
      console.log("Success-save-img",resp);
    }).catch(err => {
      console.log("Err-save-img",err);
    })
  }
  var loadProdImgUpdate = (product) => {
	  var url = getUrl(`/product/img/load-form/${product.id}`);
	  
	  $http.get(url).then(resp => {
			listProdImg = resp.data;
			listProdImg.map(prodImg => $scope.filenames.push(prodImg.name));
	  }).catch(err => {
		 	console.log("Err-load-img",err);		  	
	  })
  }
  // /HÌNH ẢNH ------------------------

  // GIÁ
  $scope.addPriceForm = () => {
    if($scope.priceForms.length < 1) {
      $scope.priceForms.push({
        price: 0.0,
        product: {},
        startDate: new Date() ,
        endDate:  null,
      })
    }
  }
  $scope.removePriceForm = (index) => {
    $scope.priceForms.splice(index,1)
  }
  var createPrice = (listPrice,product) => {
    listPrice.map(price => price.product = product);
    if($scope.isEdit) {
      var price = {};
      price = $scope.listPriceProduct.find(price => price.endDate == null);
     if(new Date(listPrice[0].startDate) <=  new Date(price.startDate)) {
      alert('Sai') 
      return;
     }
     console.log(price) 
     if(price != null) {
      price.endDate = new Date(listPrice[0].startDate);
        $http.put(getUrl(`/product/price/${price.id}`),price).then(resp => {
          console.log("Giá-", resp.data);
        }).catch(err => {
          console.log("Giá-", err);
        })
     }
     
    }
    
    $http.post(getUrl(`/product/price`),listPrice).then(resp => {
       $scope.listPriceProduct.push(... resp.data ) ;
       console.log(resp.data);
       $scope.priceForms.length = 0;
    }).catch(err => {
    })
  }
  var load_price = (idProd) => {
    // listPrice.map(price => price.product = product);
    // console.log("+++++0"+listPrice);
    $http.get(getUrl(`/product/price/${idProd}`)).then(resp => {
      $scope.listPriceProduct = resp.data;  
      console.log("price_",resp.data);
    }).catch(err => {
      
    })
  }
  // /GIÁ
$scope.listImg();
$scope.load_form();
}
// /Controller form

