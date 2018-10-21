import { Matrix } from "../base/Matrix";
/**
 * Represents a scaling matrix in 2D homogenous co-ordinate system
 */
export declare class ScalingMatrix extends Matrix {
    /**
     * Create a scaling matrix in 2D homogenous co-ordinate system
     * @param sx sx value
     * @param sy sy value
     */
    constructor(sx: number, sy: number);
}
