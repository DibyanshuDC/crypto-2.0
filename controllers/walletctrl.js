'use strict';

angular.module('cryptoCentric')
    .controller('WalletsCtrl', function ($scope) {

        var elem = document.querySelector('select');
        var instance = M.FormSelect.init(elem, {});
        var tab_elem = document.querySelector(".tabs");
        var tabs = M.Tabs.init(tab_elem, {});


    });
