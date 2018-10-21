import { Transformable } from "../interfaces/Transformable";
import { Matrix } from "../base/Matrix";
import { Point } from "./Point";
export declare class Path implements Transformable, IterableIterator<Point> {
    protected _points: Point[];
    protected _pointer: number;
    /**
     * Create a path using points
     * @param points The points in the path
     */
    constructor(...points: Point[]);
    /**
     * Retrieves the number of points in the path
     * @example
     * const path = new Path(new Point(1,1), new Point(2,2));
     * // (1,1)->(2,2)
     * path.size;
     * // => 2
     */
    readonly size: number;
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
    add(point: Point, pos?: number): this;
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
    remove(...points: Point[]): this;
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
    removeAt(...indexes: number[]): Point[];
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
    translate(tx: number, ty: number): this;
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
    rotate(angle: number, pivot?: Point): this;
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
    scale(sx: number, sy: number, pivot?: Point): this;
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
    transform(matrix: Matrix): this;
    /**
     * Convert path to a string
     * @example
     * const path = new Path(new Point(1,1), new Point(2,2));
     * path.toString()
     * // => (1,1)->(2,2)
     * @returns {string}
     */
    toString(): string;
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
    clone(): this;
    /**
     * Iterator function. Not to be called directly
     * @returns {IteratorResult<Point>}
     */
    next(): IteratorResult<Point>;
    [Symbol.iterator](): IterableIterator<Point>;
}
