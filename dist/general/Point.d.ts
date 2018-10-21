import { MatrixRepresentable } from "../interfaces/MatrixRepresentable";
import { Matrix } from "../base/Matrix";
export declare class Point implements MatrixRepresentable {
    protected _matrix: Matrix;
    /**
     * Create a new point
     * @param x X Co-ordinate of the point
     * @param y Y Co-ordinate of the point
     */
    constructor(x: number, y: number);
    /**
     * Returns x co-ordinate of the point
     * @example
     * const p = new Point(5, 10);
     * // (5,10)
     * p.x;
     * // => 5
     */
    readonly x: number;
    /**
     * Returns y co-ordinate of the point
     * @example
     * const p = new Point(5, 10);
     * // (5,10)
     * p.y;
     * // => 10
     */
    readonly y: number;
    /**
     * Return the matrix representation of the point
     * @returns {Matrix}
     */
    readonly matrix: Matrix;
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
    place(x: number, y: number): this;
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
    translate(tx: number, ty: number): this;
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
    rotate(angle: number, pivot?: Point): this;
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
    scale(sx: number, sy: number, pivot?: Point): this;
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
    transform(matrix: Matrix): this;
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
    equals(point: Point): boolean;
    /**
     * Return a string representation of the point
     */
    toString(): string;
    /**
     * Normalize the point to set h value as 1
     */
    private normalize;
}
export declare const ORIGIN: Point;
