import { toastMixin, confirmationDialog } from "../global/custom-sweetalert.js";
let host = "http://localhost:8081/api";

// const app = angular.module("app", []);
app
  .filter("formatCurrency", function () {
    return function (input) {
      // Chuyển đổi số tiền thành tiền Việt Nam
      var formattedPrice = input.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return formattedPrice;
    };
  })
  .controller("list", list)
  .controller("create", formCreate)
  .controller("update", formUpdate)
  .controller("dataFileHandler", dataFileHandler);

function list($scope, $http) {
  //
  $scope.form = {};
  $scope.items = [];
  $scope.pageCount;
  $scope.reset = () => {
    $scope.form = {};
  };
  $scope.isLoading = true;
  $scope.load_all = () => {
    var url = `${host}/discount`;
    //var url = host+'/students.json';
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.items = resp.data;
        window.sessionStorage.setItem("items", JSON.stringify(resp.data));
        $scope.pageCount = Math.ceil($scope.items.length / 5);
        console.log("Success1", resp);
        $scope.isLoading = false;
        $scope.betweenDate();
        $scope.notBetweenDate();
      })
      .catch((error) => {
        console.log("Error", error);
        $scope.isLoading = false;

      });
  };

  // sap xep
  $scope.reverseSort = false;
  $scope.sortColumn = "id";

  $scope.sortBy = (prop) => {
    $scope.reverseSort =
      $scope.sortColumn === prop ? !$scope.reverseSort : false;
    $scope.sortColumn = prop;
  };
  $scope.begin = 0;
  $scope.pageCount = Math.ceil($scope.items.length / 5);
  $scope.first = function () {
    $scope.begin = 0;
  };
  $scope.prev = function () {
    if ($scope.begin > 0) {
      $scope.begin -= 5;
    }
  };
  $scope.next = function () {
    if ($scope.begin < ($scope.pageCount - 1) * 5) {
      $scope.begin += 5;
    }
  };
  $scope.last = function () {
    $scope.begin = ($scope.pageCount - 1) * 5;
  };
  //
  $scope.formEdit = (id) => {
    // Lưu id vào session
    window.sessionStorage.setItem("editId", id);
    
  };
  $scope.delete = (id) => {
    confirmationDialog(
      "Xác nhận xóa?",
      "Bạn có chắc chắn muốn xóa dữ liệu?",
      "warning",
      "Xóa",
      "Hủy"
    ).then((result) => {
      if (result.isConfirmed) {
        var url = `${host}/discount/${id}`;
        $http({
          method: "delete",
          url: url,
        })
          .then((resp) => {
            var index = $scope.items.findIndex((item) => item.id == id);
            $scope.items.splice(index, 1);
            $scope.reset();
            console.log("Success", resp);
            $scope.pageCount = Math.ceil($scope.items.length / 5);
            toastMixin.fire({
              animation: true,
              icon: "success",
              title: "Xóa thành công",
            });
          })
          .catch((error) => {
            console.log("Error", error);
            toastMixin.fire({
              animation: true,
              icon: "error",
              title: "Khuyễn mãi đang áp dụng. Xóa không thành công",
              position: "top",
              width: 600,
            });
          });
      }
    });
  };

  $scope.deleteDiscount = (discountId) => {
    // confirmationDialog(
    //   "Xác nhận xóa?",
    //   "Bạn có chắc chắn muốn xóa dữ liệu?",
    //   "warning",
    //   "Xóa",
    //   "Hủy"
    // ).then((result) => {
    //   if (result.isConfirmed) {
        var url = `${host}/discount-price-delete/${discountId}`;
        $http({
          method: "get",
          url: url,
        })
          .then((resp) => {
            toastMixin.fire({
              animation: true,
              icon: "success",
              title: "Xóa thành công",
              position: "top-right",
            });
            $scope.delete(discountId);
          })
          .catch((error) => {
            console.log("Error", error);
            toastMixin.fire({
              animation: true,
              icon: "error",
              title: "Xóa không thành công",
              position: "top",
              width: 600,
            });
          });
   //   }
   // });
  };
  //
  $scope.search = (name) => {
    if (name != "") {
      var url = `${host}/discount/search/${name}`;
    } else {
      var url = `${host}/discount`;
    }
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.items = resp.data;
        $scope.pageCount = Math.ceil($scope.items.length / 5);
        console.log("search", resp);
      })
      .catch((error) => {
        console.log("Error_edit", error);
      });
  };

  $scope.check = () => {
    const name = window.sessionStorage.getItem("name");

    if (name == "create") {
      toastMixin.fire({
        animation: true,
        icon: "success",
        title: "Thêm thành công",
      });
      window.sessionStorage.removeItem("name");
    } else if (name == "update") {
      toastMixin.fire({
        animation: true,
        icon: "success",
        title: "Sửa thành công",
      });
      window.sessionStorage.removeItem("name");
    } else if (name == "delete") {
      toastMixin.fire({
        animation: true,
        icon: "success",
        title: "Xóa thành công",
      });
      window.sessionStorage.removeItem("name");
    }
  };

  NotAndBetweenDate($scope,$http);
  $scope.betweenDate();
  $scope.notBetweenDate();
 
  // thực hiện
  $scope.reset();
  $scope.load_all();
  $scope.check();
}
function NotAndBetweenDate ($scope,$http){

  $scope.betweenDate = () => {
    var url = `${host}/discount/betweenDate`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        console.log("betweenDate:",resp.data);
        $scope.betweenDate = resp.data;

        var urlPost = `${host}/discount`;

        $scope.betweenDate.forEach(
          (item) => {
            var copiedItem = angular.copy(item);
                copiedItem.active = true;
            $http({
              method: "post",
              url: urlPost,
              data: copiedItem,
            })
              .then((resp) => {
                console.log("Success_betweenDate", resp.data);

              }).catch((error) => {

                console.log("Error_betweenDate", error);
              });
          }
        )
      })
      
  };

  $scope.notBetweenDate = () => {
    var url = `${host}/discount/notBetweenDate`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        console.log("notBetweenDate:",resp.data);
        $scope.notBetweenDate = resp.data;
        var urlPost = `${host}/discount`;

        $scope.notBetweenDate.forEach(
          (item) => {
            var copiedItem = angular.copy(item);
                copiedItem.active = false;
            $http({
              method: "post",
              url: urlPost,
              data: copiedItem,
            })
              .then((resp) => {
                console.log("Success_notBetweenDate", resp.data);

              }).catch((error) => {

                console.log("Error_notBetweenDate", error);
              });
          }
        )

      })
      
  };
}
function formCreate($scope, $http, $filter) {
   NotAndBetweenDate($scope,$http);

  $scope.MessageStartDate = "Vui lòng chọn Đến ngày";
  $scope.optionActive = [
    {
      id: true,
      value: "Hoạt động",
    },
    {
      id: false,
      value: "Ngừng hoạt động",
    },
  ];
  //

  $scope.form = { active: true, startDate: new Date(), endDate: new Date() };
    $scope.startTime = new Date();
    var hoursToAdd = 2; //
    var startDateClone = new Date($scope.startTime);
    var endDateDate = new Date(startDateClone.getTime() + hoursToAdd * 60 * 60 * 1000);
    if (endDateDate.getDate() !== startDateClone.getDate()) {
        $scope.form.endDate.setDate($scope.form.endDate.getDate() + 1);
        $scope.form.endDate.setHours(0, 0, 0);
    } else {
        $scope.form.endDate = endDateDate;
    }

    $scope.startTime = $filter("date")(new Date(), "HH:mm:ss");
    $scope.endTime =  $filter("date")(endDateDate, "HH:mm:ss");


        

  $scope.items = [];

  $scope.uploadName = (files) => {
    return ($scope.form.logo = files[0].name);
  };

  $scope.mang = [];
  $scope.selectedItems = {}; 
  $scope.CheckInput = (id) => {
    if (!$scope.selectedItems[id]) {
      $scope.selectedItems[id] = true;
      $scope.mang.push(id);
    } else {
      delete $scope.selectedItems[id];
      const index = $scope.mang.indexOf(id);
      if (index !== -1) {
        $scope.mang.splice(index, 1);
      }
    }
    console.log("Các giá trị đã chọn:", $scope.mang);
    
    // Cập nhật lại danh sách các sản phẩm đã chọn
    $scope.itemsNe = {};
    $scope.mang.forEach((selectedId) => {
      const product = $scope.PriceByProduct.find(item => item.id === selectedId);
      if (product) {
        $scope.itemsNe[selectedId] = product;
      }
    });
    console.log($scope.itemsNe);
  };

  $scope.deleteRow = function(item) {
    delete $scope.itemsNe[item.id];
  };

  $scope.create = () => {
    if (validation($scope, $scope.form, $filter)) {
      if (validationCreate($scope.form)) {
        confirmationDialog(
          "Xác nhận thêm?",
          "Bạn có chắc chắn muốn thêm dữ liệu?",
          "question",
          "Thêm",
          "Hủy"
        ).then((result) => {
          if (result.isConfirmed) {
            // $scope.mang.forEach((value) => {
            //   console.log(value)
            // })
            $scope.form.startDate = new Date(
              $filter("date")($scope.form.startDate, "yyyy-MM-dd") +
                "T" +
                $scope.startTime
            ).toISOString();
            $scope.form.endDate = new Date(
              $filter("date")($scope.form.endDate, "yyyy-MM-dd") +
                "T" +
                $scope.endTime
            ).toISOString();
            var item = angular.copy($scope.form);
            var url = `${host}/discount`;
            $http({
              method: "post",
              url: url,
              data: item,
            })
              .then((resp) => {
                $scope.items.push(item);
                $scope.discount = resp.data;
                console.log("Success_taogiamgia", $scope.discount);
               
                $scope.mang.forEach((value) => {
                  console.log(value)
                  // price
                  $http({
                    method: "get",
                    url: `${host}/discount/price/${value}`,
                  })
                    .then((respp) => {
                      $scope.price = respp.data;
                      console.log("price nè: " + respp.data);

                      // discountPrice
                      var data = {
                        discount: $scope.discount,
                        price: $scope.price,
                      };
                      $http({
                        method: "post",
                        url: `${host}/discount-price`,
                        data: data,
                      })
                        .then((resp) => {
                        
                          window.location.href = "/admin/discount/list";
                          window.sessionStorage.setItem("name", "create");
                        })
                        .catch((error) => {
                          console.log("Error_discountPrice", error);
                        });
                      // discountPrice
                    })
                    .catch((error) => {
                      console.log("Error_price", error);
                    });
                  // price
                });
                 
                $scope.betweenDate();
                $scope.notBetweenDate();
              })
              .catch((error) => {
                console.log("Error_discount", error);
              });
            
          }
        });
      }
    }
  };

  $scope.search = (name) =>{

    if (name != "") {
      var url = `${host}/discount/PriceByProduct/${name}`;
    } else {
      var url = `${host}/discount/PriceByProduct`;
    }
    //var url = host+'/students.json';
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.PriceByProduct = resp.data;
        console.log("Success_PriceByProduct", resp);
      })
      .catch((error) => {
        console.log("Error_PriceByProduct", error);
      });
  }

  $scope.PriceByProduct = () => {
    var url = `${host}/discount/PriceByProduct`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.PriceByProduct = resp.data;
        console.log("Success_PriceByProduct", resp);
      })
      .catch((error) => {
        console.log("Error_PriceByProduct", error);
      });
  };

  $scope.PriceByProduct();
}

function formUpdate($scope, $http, $filter) {
  NotAndBetweenDate($scope,$http);
  $scope.optionActive = [
    {
      id: true,
      value: "Hoạt động",
    },
    {
      id: false,
      value: "Ngừng hoạt động",
    },
  ];

  // $scope.mang = [];
  // $scope.laydulieu = (id) => {
  //   const index = $scope.mang.indexOf(id);
  //   if (index === -1) {
  //     $scope.mang.push(id);
  //   } else {
  //     $scope.mang.splice(index, 1);
  //   }
    
  //   // Thêm đoạn mã để loại bỏ giá trị khỏi mảng khi checkbox bị bỏ chọn
  //   if (!$scope.mang.includes(id)) {
  //     // Tìm vị trí của giá trị trong mảng PriceInDiscountPrice
  //     const priceIndex = $scope.PriceInDiscountPrice.findIndex(price => price.id === id);
  //     if (priceIndex !== -1) {
  //       $scope.PriceInDiscountPrice.splice(priceIndex, 1);
  //     }
  //   }
  // };
  $scope.itemsNe = {};

  $scope.mang = [];
  $scope.selectedItems = {}; 
  $scope.CheckInput = (id) => {
    if (!$scope.selectedItems[id]) {
      $scope.selectedItems[id] = true;
      $scope.mang.push(id);
    } else {
      delete $scope.selectedItems[id];
      delete $scope.itemsNe[id];
      const index = $scope.mang.indexOf(id);
      if (index !== -1) {
        $scope.mang.splice(index, 1);
      }
    }
    console.log("Các giá trị đã chọn:", $scope.mang);


    $scope.itemsThem = {};
    $scope.mang.forEach((selectedId) => {
      const product = $scope.PriceAll.find(item => item.id === selectedId);
      if (product) {
        $scope.itemsThem[selectedId] = product;
        $scope.itemsNe[selectedId] = product;
      }
    });
    console.log($scope.itemsThem);
    console.log($scope.itemsNe);
  };

  $scope.deleteRow = function(item) {

    confirmationDialog(
      "Xóa",
      "Bạn có chắc chắn muốn sửa dữ liệu?",
      "info",
      "xóa",
      "Hủy"
    ).then((result) => {
      if (result.isConfirmed) {
        // alert(id)
        // alert(item.id)
        console.log($scope.itemsNe[item.id])
        console.log($scope.discount)

        var data = {
          discount: $scope.discount,
          price: $scope.itemsNe[item.id],
        };
        $http({
          method: "POST",
          url: `${host}/discount-price-delete/`,
          data:data
        })
          .then((resp) => {
            $scope.check = resp.data;
            // alert($scope.check)
            delete $scope.itemsNe[item.id];
            $scope.PriceByProduct();
          })

      }
    })
  };
  $scope.PriceInDiscountPriceList = (name) => {
    var url = `${host}/discount/PriceByProductInDiscountPrice/${name}`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.PriceInDiscountPrice = resp.data;
        console.log("Success_PriceInDiscountPrice", resp);
        $scope.PriceInDiscountPrice.forEach((price) => {
          // alert(price.id)
          const product = $scope.PriceInDiscountPrice.find(item => item.id === price.id);
          if (product) {
            $scope.itemsNe[price.id] = product;
          }
        });
      })
      .catch((error) => {
        console.log("Error_PriceInDiscountPrice", error);
      });
  };

  //
  $scope.isLoading = true;
  $scope.form = {};
  $scope.items = [];
  $scope.edit = () => {
    const id = window.sessionStorage.getItem("editId");
    var url = `${host}/discount/${id}`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.form = resp.data;
        $scope.discount = resp.data;
        $scope.form.startDate = new Date($scope.form.startDate);
        $scope.form.endDate = new Date($scope.form.endDate);

        $scope.startTime = $filter("date")($scope.form.startDate, "HH:mm:ss");
        $scope.endTime = $filter("date")($scope.form.endDate, "HH:mm:ss");
        console.log("Success_edit", resp);
        $scope.isLoading = false;
        $scope.PriceInDiscountPriceList($scope.form.id);
      })
      .catch((error) => {
        console.log("Error_edit", error);
        $scope.isLoading = false;
      });
    // window.sessionStorage.removeItem("editId");
  };

  $scope.edit();
  $scope.update = () => {
   
    if (validation($scope, $scope.form, $filter)) {
      confirmationDialog(
        "Xác nhận sửa?",
        "Bạn có chắc chắn muốn sửa dữ liệu?",
        "question",
        "Sửa",
        "Hủy"
      ).then((result) => {
        if (result.isConfirmed) {
          // alert("them")
          
          $scope.mang.forEach((value) => {
            console.log("mảng nè:",value)
          })

          $scope.form.startDate = new Date(
            $filter("date")($scope.form.startDate, "yyyy-MM-dd") +
              "T" +
              $scope.startTime
          ).toISOString();
          $scope.form.endDate = new Date(
            $filter("date")($scope.form.endDate, "yyyy-MM-dd") +
              "T" +
              $scope.endTime
          ).toISOString();
          var item = angular.copy($scope.form);
          var url = `${host}/discount/${$scope.form.id}`;
          $http({
            method: "put",
            url: url,
            data: item,
          })
           .then((resp) => {

              var index = $scope.items.findIndex(
                (item) => item.id == $scope.form.id
              );
              $scope.items[index] = resp.data;
              $scope.discount = resp.data;
              console.log("Success", resp);

              if($scope.mang.length == 0){
                toastMixin.fire({
                  animation: true,
                  icon: "success",
                  title: "Sửa thành công",
                });
              }

              $scope.mang.forEach((value, index) => {
                console.log(value)
                // price
                $http({
                  method: "get",
                  url: `${host}/discount/price/${value}`,
                })
                  .then((respp) => {
                    $scope.price = respp.data;
                    console.log("price nè: " + respp.data);

                    // discountPrice
                    var data = {
                      discount: $scope.discount,
                      price: $scope.price,
                    };
                    $http({
                      method: "post",
                      url: `${host}/discount-price`,
                      data: data,
                    })
                      .then((resp) => {
                        // window.location.href = "/admin/discount/list";
                        // window.sessionStorage.setItem("name", "update");
                        $scope.betweenDate();
                        $scope.notBetweenDate();
                      })
                      .catch((error) => {
                        console.log("Error_discountPrice", error);
                      });
                    // discountPrice
                  })
                  .catch((error) => {
                    console.log("Error_price", error);
                  });
                // price
              });

              
             
                $scope.betweenDate();
                $scope.notBetweenDate();
                
            })
            .catch((error) => {
              console.log("Error", error);
            });         
        }
      });
    }
  };
  $scope.delete = (id) => {
    confirmationDialog(
      "Xác nhận xóa?",
      "Bạn có chắc chắn muốn xóa dữ liệu?",
      "warning",
      "Xóa",
      "Hủy"
    ).then((result) => {
      if (result.isConfirmed) {
        var url = `${host}/discount/${id}`;
        //var url = host+'/students.json';
        $http({
          method: "delete",
          url: url,
        })
          .then((resp) => {
            var index = $scope.items.findIndex(
              (item) => item.id == $scope.form.id
            );
            $scope.items.splice(index, 1);
            $scope.form = {};
            console.log("Success", resp);
            window.location.href = "/admin/discount/list";
            window.sessionStorage.setItem("name", "delete");
          })
          .catch((error) => {
            console.log("Error", error);
            toastMixin.fire({
              animation: true,
              icon: "error",
              title: "Khuyễn mãi đang áp dụng. Xóa không thành công",
              position: "top",
              width: 600,
            });
          });
      }
    });
  };
  $scope.deleteDiscount = (discountId) => {
    // confirmationDialog(
    //   "Xác nhận xóa?",
    //   "Bạn có chắc chắn muốn xóa dữ liệu?",
    //   "warning",
    //   "Xóa",
    //   "Hủy"
    // ).then((result) => {
    //   if (result.isConfirmed) {
        var url = `${host}/discount-price-delete/${discountId}`;
        $http({
          method: "get",
          url: url,
        })
          .then((resp) => {
            toastMixin.fire({
              animation: true,
              icon: "success",
              title: "Xóa thành công",
              position: "top-right",
            });
            $scope.delete(discountId);
          })
          .catch((error) => {
            console.log("Error", error);
            toastMixin.fire({
              animation: true,
              icon: "error",
              title: "Xóa không thành công",
              position: "top",
              width: 600,
            });
          });
     // }
   // });
  };


  $scope.PriceByProduct = () => {
    var url = `${host}/discount/PriceByProduct`;
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.PriceAll = resp.data;
        console.log("Success_PriceByProduct", resp);
      })
      .catch((error) => {
        console.log("Error_PriceByProduct", error);
      });
  };

  $scope.PriceByProduct();


  $scope.search = (name,discountId) =>{

    if (name != "") {
      var url = `/api/price-by-discountId-AndNotIn-discountPrice/search/${discountId}/${name}`;
    } else {
      var url = `${host}/price-by-discountId-AndNotIn-discountPrice/${discountId}`;
    }
    //var url = host+'/students.json';
    $http({
      method: "GET",
      url: url,
    })
      .then((resp) => {
        $scope.PriceAll = resp.data;
        console.log("Success_PriceByProduct", resp);
      })
      .catch((error) => {
        console.log("Error_PriceByProduct", error);
      });
  }
  

}

function dataFileHandler($scope, $http) {
  //
  // Excel
  $scope.import = (files) => {
    var reader = new FileReader();
    reader.onloadend = async () => {
      var workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(reader.result);
      const worksheet = workbook.getWorksheet("discount_data");
      if (!worksheet) {
        toastMixin.fire({
          animation: true,
          icon: "error",
          title: "Tên worksheet không đúng. Vui lòng sửa lại tên worksheet.",
          position: "top",
          width: 600,
        });
        return;
      }
      let importSuccess = true;
      worksheet.eachRow((row, index) => {
        if (index > 1) {
          let student = {
            id: row.getCell(1).value,
            title: row.getCell(2).value,
            percentage: row.getCell(3).value,
            startDate: new Date(row.getCell(4).value),
            endDate: new Date(row.getCell(5).value),
            active: row.getCell(6).value,
            description: row.getCell(7).value,
          };
          let url = `${host}/discount`;
          $http
            .post(url, student)
            .then((resp) => {
              console.log("Success", resp.data);
            })
            .catch((error) => {
              console.log("Error", error);
              let importSuccess = false;
            });

          $scope.load_all();
        }
      });
      if (importSuccess) {
        $scope.load_all();
        toastMixin.fire({
          animation: true,
          icon: "success",
          title: "Import excel thành công",
        });
      } else {
        toastMixin.fire({
          animation: true,
          icon: "error",
          title: "Import excel thất bại. Vui lòng kiểm tra lại.",
        });
      }
    };

    reader.readAsArrayBuffer(files[0]);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  // Hàm xuất dữ liệu ra tập tin Excel
  $scope.export = () => {
    var tableData = [];
    var headers = [
      "ID",
      "TITLE",
      "PERCENTAGE",
      "STARTDATE",
      "ENDDATE",
      "ACTIVE",
      "DESCRIPTION",
    ];

    // Thêm dữ liệu của từng hàng (row) trong bảng vào mảng tableData
    angular.forEach($scope.items, function (item) {
      var rowData = [
        item.id,
        item.title,
        item.percentage,
        formatDate(item.startDate),
        formatDate(item.endDate),
        item.active,
        item.description,
      ];
      tableData.push(rowData);
    });

    // Tạo một đối tượng workbook mới
    var workbook = XLSX.utils.book_new();

    // Tạo một trang tính mới và gắn dữ liệu vào đó
    var worksheet = XLSX.utils.aoa_to_sheet([headers].concat(tableData));

    // Thêm trang tính vào workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "discount_data");

    // Xuất file Excel
    var excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAsExcel(excelBuffer, "discount.xlsx");
    toastMixin.fire({
      animation: true,
      icon: "success",
      title: "Export excel thành công",
    });
  };

  // Hàm hỗ trợ lưu file Excel
  function saveAsExcel(buffer, filename) {
    var blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, filename);
  }

  // /Excel

  // PDF
  $scope.exportToPDF = function () {
    var tableData = [];
    var headers = [
      "ID",
      "TITLE",
      "PERCENTAGE",
      "STARTDATE",
      "ENDDATE",
      "ACTIVE",
      "DESCRIPTION",
    ];

    // Thêm dữ liệu của từng hàng (row) trong bảng vào mảng tableData
    angular.forEach($scope.items, function (item) {
      var rowData = [
        item.id,
        item.title,
        item.percentage,
        formatDate(item.startDate),
        formatDate(item.endDate),
        item.active,
        item.description,
      ];
      tableData.push(rowData);
    });

    var columnWidths = [];

    var totalColumns = headers.length;
    var widthPercentage = 100 / totalColumns;
    for (var i = 0; i < totalColumns; i++) {
      columnWidths[i] = widthPercentage + "%";
    }

    var docDefinition = {
      content: [
        { text: "Danh sách hãng", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: columnWidths,
            body: [headers].concat(tableData),
          },
          style: "table",
        },
      ],
    };

    toastMixin.fire({
      animation: true,
      icon: "success",
      title: "Export PDF thành công",
    });
    // Xuất PDF
    pdfMake.createPdf(docDefinition).download("discount.pdf");
  };
  // /PDF
}
//
function validation($scope, item, $filter) {
  var kyTuDacBietTen = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  var kyTuDacBietSo = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/;
  var chu =
    /^[a-zA-Z\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]*$/;

  var valid = true;

  //id
  if (!item.id) {
    $scope.MessageId = "Không để rỗng mã khuyễn mãi";
    $scope.showId = true;
    valid = false;
  } else if (kyTuDacBietTen.test(item.id)) {
    $scope.MessageId = "Không được chứa ký tự đặc biệt trong tên khuyễn mãi";
    $scope.showId = true;
    valid = false;
  } else {
    $scope.MessageId = "";
    $scope.showId = false;
  }

  //title
  if (!item.title) {
    $scope.MessageTitle = "Không để rỗng tên khuyễn mãi";
    $scope.showTitle = true;
    valid = false;
  } else if (kyTuDacBietTen.test(item.title)) {
    $scope.MessageTitle = "Không được chứa ký tự đặc biệt trong tên khuyễn mãi";
    $scope.showTitle = true;
    valid = false;
  } else if (!chu.test(item.title)) {
    $scope.MessageTitle = "Không để số tên khuyễn mãi";
    $scope.showTitle = true;
    valid = false;
  } else {
    $scope.MessageTitle = "";
    $scope.showTitle = false;
  }

  //percentage
  if (!item.percentage) {
    $scope.MessagePercentage = "Không để rỗng % khuyễn mãi";
    $scope.showPercentage = true;
    valid = false;
  } else if (kyTuDacBietSo.test(item.percentage)) {
    $scope.MessagePercentage =
      "Không được chứa ký tự đặc biệt trong % khuyễn mãi";
    $scope.showPercentage = true;
    valid = false;
  } else if (isNaN(item.percentage)) {
    $scope.MessagePercentage = "Nhập số cho % khuyễn mãi";
    $scope.showPercentage = true;
    valid = false;
  } else if (item.percentage < 1 || item.percentage > 100) {
    $scope.MessagePercentage = "Nhập số từ 1 đến 100 cho % khuyến mãi";
    $scope.showPercentage = true;
    valid = false;
  } else {
    $scope.MessagePercentage = "";
    $scope.showPercentage = false;
  }

  const formattedStartDate = $filter("date")(
    $scope.form.startDate,
    "yyyy-MM-dd"
  );
  const formattedEndDate = $filter("date")($scope.form.endDate, "yyyy-MM-dd");
  if (!formattedStartDate || !$scope.startTime) {
    $scope.MessageStartDate = "Vui lòng chọn từ ngày và giờ";
    $scope.showStartDate = true;
    valid = false;
  } else {
    $scope.MessageStartDate = "";
    $scope.showStartDate = false;
  }

  if (!formattedEndDate || !$scope.endTime) {
    $scope.MessageEndDate = "Vui lòng chọn đến ngày và giờ";
    $scope.showEndDate = true;
    valid = false;
  } else {
    $scope.MessageEndDate = "";
    $scope.showEndDate = false;
  }

  if (formattedStartDate && formattedEndDate) {
    var fromDate = new Date(formattedStartDate);
    var toDate = new Date(formattedEndDate);
    if (fromDate > toDate) {
      $scope.MessageStartDate = "Từ ngày không được nhỏ hơn Đến ngày";
      $scope.MessageEndDate = "Đến ngày không được lớn hơn Từ ngày";
      $scope.showStartDate = true;
      $scope.showEndDate = true;
      valid = false;
    }
    const startTime = new Date(`1970-01-01T${$scope.startTime}`);
    const endTime = new Date(`1970-01-01T${$scope.endTime}`);
    if (startTime > endTime) {
      $scope.MessageStartDate = "Giờ bắt đầu không được nhỏ hơn Giờ kết thúc";
      $scope.MessageEndDate = "Giờ kết thúc không được lớn hơn Giờ bắt đầu";
      $scope.showStartDate = true;
      $scope.showEndDate = true;
      valid = false;
    }
  }
  //description
  if (kyTuDacBietTen.test(item.description)) {
    $scope.MessageDescription = "Không được chứa ký tự đặc biệt trong mô tả";
    $scope.showDescription = true;
    valid = false;
  } else {
    $scope.MessageDescription = "";
    $scope.showDescription = false;
  }

  return valid;
}
function validationCreate(item) {
  const items = JSON.parse(window.sessionStorage.getItem("items"));
  // console.log(items);
  // console.log(item);
  var index = items.findIndex((items) => items.id === item.id);
  if (index !== -1) {
    toastMixin.fire({
      animation: true,
      icon: "error",
      title: "Tên khuyến mãi đã tồn tại",
      position: "top",
      width: 600,
    });
    return false;
  }
  return true;
}
