const app = angular.module('wiStatistic', []);
app.controller('appController', async function ($scope, $http) {
    window.scope = $scope;
    const host = 'http://monitor.dev.i2g.cloud';
    const countRes = await $http.get(host + '/response/count');
    $scope.total = countRes.data[0].count_duration;
    const allRes = await $http.get(host + '/response/all');
    $scope.all = allRes.data.map((item, index) => Object.assign(item, {index: index + 1}));
    $('#main-table').DataTable({
        data: $scope.all,
        fixedHeader: true,
        columns: [
            {data: 'index'},
            {data: 'pid'},
            {data: 'username'},
            {data: 'ipaddr'},
            {data: 'path'},
            {data: 'time'},
            {data: 'duration'},
        ],
    });
    $scope.$apply();
});
