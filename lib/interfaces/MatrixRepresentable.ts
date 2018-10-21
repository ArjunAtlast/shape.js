import { Matrix } from "../base/Matrix";

/**
 * Class that implements this interface must have a matrix property or matrix getter
 */
export interface MatrixRepresentable {

    matrix: Matrix;
    
}