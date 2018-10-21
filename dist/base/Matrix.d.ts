/**
 * Represents a number matrix
 */
export declare class Matrix implements IterableIterator<number> {
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
    constructor(height: number, width: number, ...elements: number[]);
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
    readonly height: number;
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
    readonly width: number;
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
    readonly size: number;
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
    row(index: number): number[];
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
    column(index: number): number[];
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
    get(row: number, column: number): number;
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
    set(row: number, column: number, value: number): this;
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
    transpose(): this;
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
    clone(): this;
    /**
     * Iterator function. Not to be called directly.
     * @returns {IteratorResult<number[]>}
     */
    next(): IteratorResult<number>;
    [Symbol.iterator](): this;
}
/**
 * Wrapper for matrix operations
 */
export declare class MatrixOperations {
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
    static add(mat1: Matrix, mat2: Matrix): Matrix;
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
    static subtract(mat1: Matrix, mat2: Matrix): Matrix;
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
    static scalarMultiply(mat: Matrix, scalar: number): Matrix;
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
    static multiply(mat1: Matrix, mat2: Matrix): Matrix;
}
