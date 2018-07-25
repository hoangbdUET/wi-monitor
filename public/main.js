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

    const mdt = $('#mean-table').DataTable({
        fixedHeader: true,
        columns: [
            { data: 'index' },
            { data: 'username' },
            { data: 'path' },
            { data: 'time' },
            { data: 'duration' },
        ],
    });
    $scope.days = '1';
    $scope.hours = '1';
    async function getRequests () {
        const allRes = await $http.get(`${host}/response/all?hours=${$scope.hours}`);
        $scope.all = allRes.data.map((item, index) => Object.assign(item, { index: index + 1 }));
        dt.clear();
        dt.rows.add($scope.all);
        dt.draw();
    }
    async function getMeanRequests () {
        const allRes = await $http.get(`${host}/response/mean/all?days=${$scope.days}`);
        $scope.all = allRes.data.map((item, index) => Object.assign(item, { index: index + 1 }));
        mdt.clear();
        mdt.rows.add($scope.all);
        mdt.draw();
    }
    $scope.getRequests = getRequests;
    $scope.getMeanRequests = getMeanRequests;
    getRequests();
    getMeanRequests();
    $scope.$apply();
});
