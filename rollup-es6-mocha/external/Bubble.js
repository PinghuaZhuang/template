/* eslint-disable */
define([

], function () {
    'use strict';

    function Bubble(scene, id) {
        var container = document.getElementById(id);
        this.container = container;
        this.scenePosition = new Cesium.Cartesian3();
        var _this = this;
        scene.postRender.addEventListener(function () {
            var canvasHeight = scene.canvas.height;
            var windowPosition = new Cesium.Cartesian2();
            Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, _this.scenePosition, windowPosition);
            container.style.bottom = (canvasHeight - windowPosition.y + 45) + 'px';
            container.style.left = (windowPosition.x - 70) + 'px';
            container.style.visibility = "visible";
        });
        $(this.container).hide();
    }
    //气泡内容修改另外通过获取dom对象修改
    Bubble.prototype.showAt = function (position) {
        console.log( 'show' );
        if (!position) {
            $(this.container).hide();
            return;
        }
        $(this.container).show();
        this.scenePosition = Cesium.Cartesian3.clone(position);

    };
    //设置气泡的可见性
    Bubble.prototype.visibility = function (value) {
        if (value == true) {
            $(this.container).show();
        } else if (value == false) {
            $(this.container).hide();
        }
    };


    return Bubble;
});
