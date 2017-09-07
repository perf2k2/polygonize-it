class PoligonizeIt {
    protected readonly image: HTMLImageElement;
    protected readonly canvas: HTMLCanvasElement;
    protected readonly context: CanvasRenderingContext2D;
    protected imageLoaded: boolean = false;
    
    constructor(canvasId: string, imageSrc: string, callback = null) {
        this.image = new Image();
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        this.image.src = imageSrc;
        
        const self = this;
        this.image.addEventListener("load", function () {
            self.imageLoaded = true;

            if (callback !== null) {
                callback();
            }
        });
    }
    
    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    public drawPolygon(polygon: Polygon, fillStyle, strokeStyle = null, pointStyle = null) {
        this.context.beginPath();

        polygon.getPoints().forEach((point: Point, index: number) => {
            this.context.lineTo(point.X(), point.Y());
        });

        this.context.fillStyle = fillStyle;
        this.context.fill();

        if (strokeStyle != null) {
            this.context.strokeStyle = strokeStyle;
            this.context.stroke();
        }  

        this.context.closePath();

        if (pointStyle != null) {
            polygon.getPoints().forEach((point: Point, index: number) => {
                this.drawPoint(point, pointStyle);
            });
        }  
    }
    
    public drawPoint(point: Point, color: string) {
        this.context.beginPath();
        this.context.arc(point.X(), point.Y(), 5, 0, 2 * Math.PI);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
    }

    public clearCanvas() {
        this.context.clearRect(0, 0, this.image.width, this.image.height);
        this.context.drawImage(this.image, 0, 0);
    }
}

class Polygon {
    protected readonly points: Point[] = [];

    public getPointsCount(): number {
        return this.points.length;
    }
    
    public addPoint(point: Point) {
        this.points.push(point);
    }

    public addPointByCoordinates(coordinates: number[]): Point {
        const point = new Point(coordinates[0], coordinates[1]);
        this.addPoint(point);
        return point;
    }

    public getPoints(): Point[] {
        return this.points;
    }

    public getCoordinates(): number[][] {
        let coords = [];

        for (const point of this.getPoints()) {
            coords.push(point.getCoordinates());
        }

        return coords;
    }
}

class Point {
    protected readonly x: number;
    protected readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public X(): number {
        return this.x;
    }

    public Y(): number {
        return this.y;
    }

    public getCoordinates(): number[] {
        return [this.x, this.y];
    }
}

class Helpers {
    public static getClickCoords(canvas: any, event: MouseEvent): number[] {
        const rect = canvas.getBoundingClientRect();
        const canvasX = (event.clientX - rect.left) / (rect.right-rect.left) * canvas.width;
        const canvasY = (event.clientY - rect.top) / (rect.bottom-rect.top) * canvas.height;

        return [canvasX, canvasY];
    }  
}