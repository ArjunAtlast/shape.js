"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("./Point");
const _ = require("lodash");
class Path {
    /**
     * Create a path using points
     * @param points The points in the path
     */
    constructor(...points) {
        this._points = points;
    }
    /**
     * Retrieves the number of points in the path
     * @example
     * const path = new Path(new Point(1,1), new Point(2,2));
     * // (1,1)->(2,2)
     * path.size;
     * // => 2
     */
    get size() {
        return this._points.length;
    }
    /**
     * Add a new point to the Path
     * @param point new point to be added
     * @example
     * const path = new Path(new Point(1,1), new Point(2,2));
     * // (1,1)->(2,2)
     *
     * line.add(new Point(4,4));
     * // (1,1)->(2,2)->(4,4)
     *
     * line.add(new Point(3,3), 2);
     * // (1,1)->(2,2)->(3,3)->(4,4)
     */
    add(point, pos = this.size) {
        if (pos >= this.size)
            this._points.push(point);
        else if (pos <= 0)
            this._points.unshift(point);
        else {
            this._points = _.concat(_.slice(this._points, 0, pos), point, _.slice(this._points, pos));
        }
        return this;
    }
    /**
     * Remove one or more points from path
     * @param points Points to be removed
     * @example
     * const start = new Point(1,1);
     * const end = new Point(2,2);
     * const path = new Path(start, end);
     * // (1,1)->(2,2)
     *
     * path.remove(end);
     * // => [(2,2)]
     *
     * path.toString();
     * // => (1,1)
     * @returns {this} the new path
     */
    remove(...points) {
        _.pullAll(this._points, points);
        return this;
    }
    /**
     * Remove one or more points from the path at given indices
     * @param indexes indexes for points to be removed
     * @example
     * const path = new Path(start, end);
     * // (1,1)->(2,2)
     *
     * path.removeAt(1)
     * // => [(2,2)]
     *
     * path.toString();
     * // => (1,1)
     *
     * @returns {Point[]} Array of removed points
     */
    removeAt(...indexes) {
        return _.pullAt(this._points, indexes);
    }
    /**
     * Translate the path by the given distance
     * @param tx Translation horizontal distance
     * @param ty Translation vertical distance
     * @example
     * const path = new Path(new Point(1,1), new Point(2,2));
     * // (1,1)->(2,2)
     *
     * path.translate(5,5);
     * // (6,6)->(7,7)
     * @returns {this}
     */
    translate(tx, ty) {
        for (let point of this._points) {
            point.translate(tx, ty);
        }
        return this;
    }
    /**
     * Rotate the path counter clockwise based on a pivot point
     * @param angle angle of rotation in radians i.e 45deg = Math.PI/4
     * @param pivot the reference point for rotation
     * @example
     * const path = new Path(new Point(1,1), new Point(4,1));
     * // (1,1)->(4,1)
     *
     * path.rotate(Math.PI/2, new Point(1,1));
     * // (1,1)->(1,4)
     * @returns {this}
     */
    rotate(angle, pivot = Point_1.ORIGIN) {
        for (let point of this._points) {
            point.rotate(angle, pivot);
        }
        return this;
    }
    /**
     * Scale this path with reference to a pivot point
     * @param sx Scaling horizontal factor
     * @param sy Scaling vertical factor
     * @param pivot The reference point for scaling
     * @example
     * const path = new Path(new Point(1,1), new Point(4,1));
     * // (1,1)->(4,1)
     *
     * path.scale(2,2,new Point(1,1));
     * // (1,1)->(7,1)
     * @returns {this}
     */
    scale(sx, sy, pivot = Point_1.ORIGIN) {
        for (let point of this._points) {
            point.scale(sx, sy, pivot);
        }
        return this;
    }
    /**
     * Transform the point based on a 2D homogenous transformation matrix.
     * @param matrix The 2D homogenous transformation matrix
     * @example
     * const path = new Path(new Point(1,1), new Point(4,1));
     * // (1,1)->(4,1)
     *
     * const c = new Matrix(3, 3, 0, -1, 1, 4, 0, -4, 0, 0, 1);
     *
     * path.transform(c);
     * // (0,0)->(0,12);
     * @returns {this}
     */
    transform(matrix) {
        for (let point of this._points) {
            point.transform(matrix);
        }
        return this;
    }
    /**
     * Convert path to a string
     * @example
     * const path = new Path(new Point(1,1), new Point(2,2));
     * path.toString()
     * // => (1,1)->(2,2)
     * @returns {string}
     */
    toString() {
        let str = `${this._points[0]}`;
        for (let p of _.tail(this._points)) {
            str += `->${p}`;
        }
        return str;
    }
    /**
     * Returns a deep copy of the path
     * @example
     * const path = new Path(new Point(1,1), new Point(2,2));
     * // (1,1)->(2,2)
     *
     * const b = path.clone();
     * path == b;
     * // => false
     *
     * b.translate(5,5); //does not affect path
     *
     * path.toString();
     * // => (1,1)->(2,2)
     */
    clone() {
        return _.cloneDeep(this);
    }
    /**
     * Iterator function. Not to be called directly
     * @returns {IteratorResult<Point>}
     */
    next() {
        if (this._pointer < this.size) {
            return {
                done: false,
                value: this._points[this._pointer++]
            };
        }
        else {
            return {
                done: true,
                value: null
            };
        }
    }
    [Symbol.iterator]() {
        this._pointer = 0;
        return this;
    }
}
exports.Path = Path;
