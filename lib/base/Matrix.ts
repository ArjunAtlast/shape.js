import * as _ from 'lodash';
import { Cloneable } from '../interfaces/Cloneable';

/**
 * Represents a number matrix
 */
export class Matrix implements IterableIterator<number>, Cloneable {

    protected _elements: number[];

    protected _pointer: number;

    protected _height: number;
    protected _width: number;

    /**
     * Create a new Matrix.
     * @param height Number of rows in matrix
     * @param width Number of columns in matrix
     * @param elements Elements in matrix in row major order (optional).
     */
    constructor(height: number, width: number, ...elements: number[]) {

        this._height = height;
        this._width = width;

        const size = height*width;

        const padding = _.fill(Array(size), 0);
        
        this._elements = _.slice(_.concat(elements, padding), 0, size);

    }

    /**
     * Returns the height of the matrix
     * @example
     * const mat = new Matrix(2,3,1,2,3,4,5,6);
     * // 1 2 3
     * // 4 5 6
     * mat.height;
     * // => 2
     * @returns {number}
     */
    get height(): number {
        return this._height;
    }

    /**
     * Returns the width of the matrix
     * @example
     * const mat = new Matrix(2,3,1,2,3,4,5,6);
     * // 1 2 3
     * // 4 5 6
     * mat.width;
     * // => 3
     * @returns {number}
     */
    get width(): number {
        return this._width;
    }

    /**
     * Returns the number of elements in the matrix
     * @example
     * const mat = new Matrix(2,3,1,2,3,4,5,6);
     * // 1 2 3
     * // 4 5 6
     * mat.size;
     * // => 6 (i.e., 3 x 2)
     * @returns {number}
     */
    get size(): number {
        return this._width * this._height;
    }

    /**
     * Returns the corresponding row of the matrix
     * @example
     * const mat = new Matrix(2,3,1,2,3,4,5,6);
     * // 1 2 3
     * // 4 5 6
     * mat.row(0);
     * // => [1, 2, 3]
     * @returns {number[]}
     */
    row(index: number): number[] {
        
        const start = index*this._height;
        const end = start + this._width;

        return _.slice(this._elements, start, end);
    }

    /**
     * Returns the corresponding column of the matrix
     * @example
     * const mat = new Matrix(2,3,1,2,3,4,5,6);
     * // 1 2 3
     * // 4 5 6
     * mat.column(1);
     * // => [2, 5]
     * @returns {number[]}
     */
    column(index: number): number[] {
        return _.filter(this._elements, (val, i) => i%this._width == index);
    }
    
    /**
     * Retrieve an element from the matrix
     * @param row row index of the required element
     * @param column column index of the required element
     * @example
     * const mat = new Matrix(2,3,1,2,3,4,5,6);
     * // 1 2 3
     * // 4 5 6
     * mat.get(0,2);
     * // => 3
     */
    get(row: number, column: number) {
        const n = this._width * row + column;
        return this._elements[n];
    }

    /**
     * Set the value at a position in the matrix
     * @param row row index of the required element
     * @param column column index of the required element
     * @param value value to be set
     * @example
     * const mat = new Matrix(2,3,1,2,3,4,5,6);
     * // 1 2 3
     * // 4 5 6
     * mat.set(1,1,8);
     * // 1 2 3
     * // 4 8 6
     */
    set(row: number, column: number, value: number): this {
        const n = this._width * row + column;
        this._elements[n] = value;

        return this;
    }

    /**
     * Transpose the current matrix
     * @returns {Matrix}
     * @example
     * const mat = new Matrix(2,3,1,2,3,4,5,6);
     * // 1 2 3
     * // 4 5 6
     * mat.transpose();
     * // 1 4
     * // 2 5
     * // 3 6
     */
    transpose(): this {

        for(let i=0; i<this.size; i++) {

            const r = Math.floor(i / this._width);
            const c = i % this._width;

            //store current element to temporary variable
            const temp = this.get(r,c);

            this.set(r,c,this.get(c,r));
            this.set(c,r,temp);
        }

        //store height to temporary variable
        const height = this._height;

        this._height = this._width;
        this._width = height;

        return this;
    }

    /**
     * Creates a deep copy of the current matrix
     * @example
     * const m = new Matrix(2,2,1,2,3,4);
     * // 1 2
     * // 3 4
     * const m2 = m.clone();
     * 
     * m2 == m;
     * // => false
     * 
     * m2.set(1,1,0); //does not affect 'm'
     * 
     * m.get(1,1);
     * // => 4
     */
    clone(): this {

        return _.cloneDeep(this);

    }

    /**
     * Iterator function. Not to be called directly.
     * @returns {IteratorResult<number[]>}
     */
    next(): IteratorResult<number> {

        if(this._pointer < this.size) {
            return {
                done: false,
                value: this._elements[this._pointer++]
            }
        }

        else {
            return { done: true, value: null }
        }

    }
    
    [Symbol.iterator]() {
        this._pointer = 0;
        return this;
    }

}

/**
 * Wrapper for matrix operations
 */
export class MatrixOperations {

    /**
     * Adds two matrices and returns the resulting matrix
     * @param mat1 First matrix
     * @param mat2 Second matrix
     * @example
     * const mat1 = new Matrix(2,3,1,2,3,4,5,6);
     * // 1 2 3
     * // 4 5 6
     * const mat2 = new Matrix(2,3,1,2,1,2,1,2);
     * // 1 2 1
     * // 2 1 2
     * MatrixOperations.add(mat1, mat2);
     * // 2 4 4
     * // 6 6 8
     * @returns { Matrix }
     */
    static add(mat1: Matrix, mat2: Matrix): Matrix {

        //check compatibility
        if (mat1.height != mat2.height || mat1.width != mat2.width) {
            throw new Error('Incompatible Matrices for Addition');
        }
        
        const height = mat1.height;
        const width = mat1.width;

        const result = new Matrix(height, width);

        for (let i=0; i<height*width; i++) {
            const r = Math.floor(i / width);
            const c = i % width;

            const sum = mat1.get(r,c) + mat2.get(r,c);

            result.set(r,c,sum);
        }

        return result;

    }

    /**
     * Subtracts a matrix from another matrix and returns the resulting matrix
     * @param mat1 First matrix
     * @param mat2 Second matrix
     * @example
     * const mat1 = new Matrix(2,3,1,2,3,4,5,6);
     * // 1 2 3
     * // 4 5 6
     * const mat2 = new Matrix(2,3,1,2,1,2,1,2);
     * // 1 2 1
     * // 2 1 2
     * MatrixOperations.subtract(mat1, mat2);
     * // 0 0 2
     * // 2 4 4
     * @returns { Matrix }
     */
    static subtract(mat1: Matrix, mat2: Matrix): Matrix {
        
        //check compatibility
        if (mat1.height != mat2.height || mat1.width != mat2.width) {
            throw new Error('Incompatible Matrices for Subtraction');
        }
        
        const height = mat1.height;
        const width = mat1.width;

        const result = new Matrix(height, width);

        for (let i=0; i<height*width; i++) {
            const r = Math.floor(i / width);
            const c = i % width;

            const sum = mat1.get(r,c) - mat2.get(r,c);

            result.set(r,c,sum);
        }

        return result;
    }

    /**
     * Multiply all elements in a matrix with a scalar number and return the result
     * @param mat The matrix to multiply.
     * @param scalar The scalar number to multiply with.
     * @example
     * const mat = new Matrix(2,3,1,2,3,4,5,6);
     * // 1 2 3
     * // 4 5 6
     * MatrixOperations.scalarMultiply(mat, 3);
     * //  3  6  9
     * // 12 15 18
     * @returns {Matrix}
     */
    static scalarMultiply(mat: Matrix, scalar: number): Matrix {
        
        const height = mat.height;
        const width = mat.width;

        const resArr = [];

        for (let item of mat) {
            resArr.push(_.round(item*scalar, 5));
        }

        return new Matrix(height, width, ...resArr);
    }

    /**
     * Multiply two compatible matrices
     * @param mat1 The first matrix
     * @param mat2 The second matrix
     * @example
     * const mat1 = new Matrix(2,3,1,2,3,4,5,6);
     * // 1 2 3
     * // 4 5 6
     * const mat2 = new Matrix(3,2,1,2,1,2,1,2);
     * // 1 2
     * // 1 2
     * // 1 2
     * MatrixOperations.multiply(mat1, mat2);
     * //  6 12
     * // 15 30
     */
    static multiply(mat1: Matrix, mat2: Matrix): Matrix {

        //check compatibility
        if(mat1.width !== mat2.height) {
            throw new Error('Incompatible matrices for multiplication.');
        }

        const height = mat1.height;
        const width = mat2.width;

        const result = new Matrix(height, width);

        for(let i=0; i<height; i++) {
            for(let j=0; j<width; j++) {

                let sum = 0;

                for(let k=0; k<mat1.width; k++) {
                    sum += mat1.get(i,k) * mat2.get(k, j);
                }

                result.set(i,j,_.round(sum, 5));
            }
        }

        return result;
    }
}