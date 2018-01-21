var PoligonizeIt = (function () {
    //TODO: add support for image background
    function PoligonizeIt(canvasId, callback) {
        if (callback === void 0) { callback = null; }
        this.imageLoaded = false;
        this.image = new Image();
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        if (callback !== null) {
            callback();
        }
    }
    PoligonizeIt.prototype.getCanvas = function () {
        return this.canvas;
    };
    PoligonizeIt.prototype.getContext = function () {
        return this.context;
    };
    PoligonizeIt.prototype.drawPolygon = function (polygon, fillStyle, strokeStyle, pointStyle) {
        var _this = this;
        if (strokeStyle === void 0) { strokeStyle = null; }
        if (pointStyle === void 0) { pointStyle = null; }
        this.context.beginPath();
        polygon.getPoints().forEach(function (point, index) {
            _this.context.lineTo(point.X(), point.Y());
        });
        this.context.fillStyle = fillStyle;
        this.context.fill();
        if (strokeStyle != null) {
            this.context.strokeStyle = strokeStyle;
            this.context.stroke();
        }
        this.context.closePath();
        if (pointStyle != null) {
            polygon.getPoints().forEach(function (point, index) {
                _this.drawPoint(point, pointStyle);
            });
        }
    };
    PoligonizeIt.prototype.drawPoint = function (point, color) {
        this.context.beginPath();
        this.context.arc(point.X(), point.Y(), 5, 0, 2 * Math.PI);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
    };
    PoligonizeIt.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, this.image.width, this.image.height);
        this.context.drawImage(this.image, 0, 0);
    };
    return PoligonizeIt;
}());
var Polygon = (function () {
    function Polygon() {
        this.points = [];
    }
    Polygon.prototype.getPointsCount = function () {
        return this.points.length;
    };
    Polygon.prototype.addPoint = function (point) {
        this.points.push(point);
    };
    Polygon.prototype.addPointByCoordinates = function (coordinates) {
        var point = new Point(coordinates[0], coordinates[1]);
        this.addPoint(point);
        return point;
    };
    Polygon.prototype.getPoints = function () {
        return this.points;
    };
    Polygon.prototype.getCoordinates = function () {
        var coords = [];
        for (var _i = 0, _a = this.getPoints(); _i < _a.length; _i++) {
            var point = _a[_i];
            coords.push(point.getCoordinates());
        }
        return coords;
    };
    return Polygon;
}());
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.X = function () {
        return this.x;
    };
    Point.prototype.Y = function () {
        return this.y;
    };
    Point.prototype.getCoordinates = function () {
        return [this.x, this.y];
    };
    return Point;
}());
var Helpers = (function () {
    function Helpers() {
    }
    Helpers.getClickCoords = function (canvas, event) {
        var rect = canvas.getBoundingClientRect();
        var canvasX = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        var canvasY = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        return [canvasX, canvasY];
    };
    return Helpers;
}());
