
let host = "http://localhost:8081/api";
const app = angular.module("app", []);
app
    .filter('formatCurrency', function () {
        return function (input) {
            // Chuyển đổi số tiền thành tiền Việt Nam
            var formattedPrice = input.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            return formattedPrice;
        };
    })
    .controller("index", index);;

    function index($scope, $http) {
        $scope.pageCount;
        $scope.items = [];
        $scope.currentPage = 1;

        // Function to generate an array of page numbers and ellipses
        function generatePaginationNumbers(currentPage, pageCount) {
            const pagination = [];
            const MAX_VISIBLE_PAGES = 5;
        
            if (pageCount <= MAX_VISIBLE_PAGES) {
                // If the total number of pages is less than or equal to the maximum visible pages,
                // display all page numbers without ellipses
                for (let i = 1; i <= pageCount; i++) {
                    pagination.push({ page: i });
                }
            } else {
                // Calculate the range of page numbers to show around the current page
                let startPage = currentPage - Math.floor(MAX_VISIBLE_PAGES / 2);
                let endPage = currentPage + Math.floor(MAX_VISIBLE_PAGES / 2);
        
                // Ensure the visible pages are within the valid range
                if (startPage < 1) {
                    startPage = 1;
                    endPage = MAX_VISIBLE_PAGES;
                } else if (endPage > pageCount) {
                    endPage = pageCount;
                    startPage = pageCount - MAX_VISIBLE_PAGES + 1;
                }
        
                // Add first page and ellipsis if necessary
                if (startPage > 1) {
                    pagination.push({ page: 1 });
                    if (startPage > 2) {
                        pagination.push({ ellipsis: true });
                    }
                }
        
                // Add the range of visible page numbers
                for (let i = startPage; i <= endPage; i++) {
                    pagination.push({ page: i, active: i === currentPage });
                }
        
                // Add last page and ellipsis if necessary
                if (endPage < pageCount) {
                    if (endPage < pageCount - 1) {
                        pagination.push({ ellipsis: true });
                    }
                    pagination.push({ page: pageCount });
                }
            }
        
            return pagination;
        }

        // Function to update the pagination numbers when the current page changes
        $scope.updatePagination = function () {
            $scope.pagination = generatePaginationNumbers($scope.currentPage, $scope.pageCount);
        };

        // Function to set the current page and update the pagination
        $scope.setCurrentPage = function (page) {
            $scope.currentPage = page;
            $scope.updatePagination();
            $scope.begin = (page - 1) * 10; // Calculate the new begin index for displaying items
        };

        $scope.load_all = () => {
            var url = `${host}/index`;
            $http({
                method: "GET",
                url: url,
            })
            .then((resp) => {
                $scope.items = resp.data;
                $scope.pageCount = Math.ceil($scope.items.length / 10);
                $scope.updatePagination(); // Update pagination when the data is loaded
                console.log("Success1", resp);
            })
            .catch((error) => {
                console.log("Error", error);
            });
        };

        // Initial load of data
        $scope.load_all();
    }