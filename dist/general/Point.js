"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = require("../base/Matrix");
const TranslationMatrix_1 = require("../transformations/TranslationMatrix");
const RotationMatrix_1 = require("../transformations/RotationMatrix");
const ScalingMatrix_1 = require("../transformations/ScalingMatrix");
const _mul = Matrix_1.MatrixOperations.multiply;
class Point {
    /**
     * Create a new point
     * @param x X Co-ordinate of the point
     * @param y Y Co-ordinate of the point
     */
    constructor(x, y) {
        this._matrix = new Matrix_1.Matrix(3, 1, x, y, 1);
    }
    /**
     * Returns x co-ordinate of the point
     * @example
     * const p = new Point(5, 10);
     * // (5,10)
     * p.x;
     * // => 5
     */
    get x() {
        return this._matrix.get(0, 0) / this._matrix.get(2, 0);
    }
    /**
     * Returns y co-ordinate of the point
     * @example
     * const p = new Point(5, 10);
     * // (5,10)
     * p.y;
     * // => 10
     */
    get y() {
        return this._matrix.get(1, 0) / this._matrix.get(2, 0);
    }
    /**
     * Return the matrix representation of the point
     * @returns {Matrix}
     */
    get matrix() {
        return this._matrix.clone();
    }
    /**
     * Place a point in a particalar co-ordinate position in XY plane
     * @param x x co-ordinate of the position to place the point
     * @param y y co-ordinate of the position to place the point
     * @example
     * const p = new Point(5, 10);
     * // (5,10)
     * p.place(4,3);
     * // (4,3)
     * @returns {this}
     */
    place(x, y) {
        this._matrix = new Matrix_1.Matrix(3, 1, x, y, 1);
        return this;
    }
    /**
     * Move a point given x and y distance
     * @param tx Translation horizontal distance
     * @param ty Translation vertical distance
     * @example
     * const p = new Point(5, 10);
     * // (5, 10)
     * p.translate(3, 4);
     * // (8, 14)
     * @return {this}
     */
    translate(tx, ty) {
        const T = new TranslationMatrix_1.TranslationMatrix(tx, ty);
        this._matrix = _mul(T, this._matrix);
        return this;
    }
    /**
     * Rotate a point counter clockwise based on a point
     * @param angle angle of rotation in radians i.e 45deg = Math.PI/4
     * @param pivot the reference point for rotation
     * @example
     * const p = new Point(0, 4);
     * // (0, 4)
     * p.rotate(Math.PI/2);
     * // (-4, 0)
     * const q = new Point(8,4);
     * // (8, 4)
     * q.rotate(Math.PI/2, new Point(4,4));
     * // (4, 8)
     * @returns {this}
     */
    rotate(angle, pivot = exports.ORIGIN) {
        const T = new TranslationMatrix_1.TranslationMatrix(-pivot.x, -pivot.y);
        const T_ = new TranslationMatrix_1.TranslationMatrix(pivot.x, pivot.y);
        const R = new RotationMatrix_1.RotationMatrix(angle);
        const C = _mul(_mul(T_, R), T);
        this._matrix = _mul(C, this._matrix);
        return this;
    }
    /**
     * Scale this point with reference to a pivot point
     * @param sx Scaling horizontal factor
     * @param sy Scaling vertical factor
     * @param pivot The reference point for scaling
     * @example
     * const p = new Point(5, 10);
     * // (5, 10)
     * p.scale(1,2)
     * // (5, 20)
     * const q = new Point(8, 6);
     * // (8, 6)
     * q.scale(2,2, new Point(4,4));
     * // (12, 8)
     * @returns {this}
     */
    scale(sx, sy, pivot = exports.ORIGIN) {
        const T = new TranslationMatrix_1.TranslationMatrix(-pivot.x, -pivot.y);
        const T_ = new TranslationMatrix_1.TranslationMatrix(pivot.x, pivot.y);
        const S = new ScalingMatrix_1.ScalingMatrix(sx, sy);
        const C = _mul(_mul(T_, S), T);
        this._matrix = _mul(C, this._matrix);
        return this;
    }
    /**
     * Transform the point based on a 2D homogenous transformation matrix.
     * @param matrix The 2D homogenous transformation matrix
     * @example
     * const p = new Point(5, 10);
     * // (5, 10)
     * const t = new TranslationMatrix(5, 10);
     * const s = new ScalingMatrix(3, 3);
     * const c = MatrixOperations.multiply(t,s);
     *
     * p.transform(c);
     * // (20, 40)
     * @return {this}
     */
    transform(matrix) {
        this._matrix = _mul(matrix, this._matrix);
        return this.normalize();
    }
    /**
     * Check whether the point is equivalent to another point
     * @param point The point to check equivality
     * @example
     * const p = new Point(5, 10);
     * // (5,10)
     * const q = new Point(5, 10);
     * // (5,10)
     * const r = new Point(6, 8);
     * // (6,8)
     * p.equals(q);
     * // => true
     * p.equals(r);
     * // => false
     */
    equals(point) {
        return this.x == point.x && this.y == point.y;
    }
    /**
     * Return a string representation of the point
     */
    toString() {
        return `(${this.x},${this.y})`;
    }
    /**
     * Normalize the point to set h value as 1
     */
    normalize() {
        const h = this._matrix.get(2, 0);
        this._matrix = Matrix_1.MatrixOperations.scalarMultiply(this._matrix, 1 / h);
        return this;
    }
}
exports.Point = Point;
exports.ORIGIN = new Point(0, 0);
