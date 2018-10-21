import { Matrix } from "./Matrix";
/**
 * Represents a translation matrix in 2D homogenous co-ordinate system
 */
export declare class TranslationMatrix extends Matrix {
    /**
     * Create a translation matrix in 2D homogenous co-ordinate system
     * @param tx tx value
     * @param ty ty value
     */
    constructor(tx: number, ty: number);
}
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
