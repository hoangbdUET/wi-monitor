const app = angular.module('wiStatistic', []);
app.controller('appController', async function ($scope, $http) {
    window.scope = $scope;
    const host = 'http://monitor.dev.i2g.cloud';
    const countRes = await $http.get(host + '/response/count');
    $scope.total = countRes.data[0].count_duration;

    const dt = $('#main-table').DataTable({
        fixedHeader: true,
        columns: [
            { data: 'index' },
            { data: 'pid' },
            { data: 'username' },
            { data: 'ipaddr' },
            { data: 'path' },
            { data: 'time' },
            { data: 'duration' },
        ],
    });
    $scope.days = '1';
    async function getRequests () {
        const allRes = await $http.get(`${host}/response/all?days=${$scope.days}`);
        $scope.all = allRes.data.map((item, index) => Object.assign(item, { index: index + 1 }));
        dt.clear();
        dt.rows.add($scope.all);
        dt.draw();
    }
    $scope.getRequests = getRequests;
    getRequests();
    $scope.$apply();
});
