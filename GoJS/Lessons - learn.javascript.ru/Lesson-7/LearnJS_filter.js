var arr1 = [1, 2, 3, 4, 5, 6, 7];

var filter = function(arr) {

  this.inBetween = function(a, b) {
        var betweenInArray = [];
        for (var i = 0; i <= arr.length; i++) {
            if (arr[i] >= a && arr[i] <= b) {
                betweenInArray.push(arr[i]);
            }
        }
        return betweenInArray;
    };

    this.inArray = function(mass) {
        for (var j = 0; j < mass.length; j++)
            for (var i = 0; i < arr.length; i++) {
                var equalInArray = [];
                if (mass[j] == arr[i]) {
                    equalInArray.push(arr[i]);
                }
            }
        return equalInArray;
    }

};
console.log(filter.inBetween(3, 6)); // 3,4,5,6

console.log(filter.inArray([1, 2, 10])); // 1,2