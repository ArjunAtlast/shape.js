import { Matrix } from "../base/Matrix";
/**
 * Represents a rotation matrix in 2D homogenous co-ordinate system
 */
export declare class RotationMatrix extends Matrix {
    /**
     * Create a rotation matrix in 2D homogenous co-ordinate system
     * @param angle angle of rotation in radians
     */
    constructor(angle: number);
}
