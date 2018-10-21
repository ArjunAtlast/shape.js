import { Matrix } from "../base/Matrix";

/**
 * Represents a scaling matrix in 2D homogenous co-ordinate system
 */
export class ScalingMatrix extends Matrix {

    /**
     * Create a scaling matrix in 2D homogenous co-ordinate system
     * @param sx sx value
     * @param sy sy value
     */
    constructor(sx: number, sy:number) {

        const scaleArr = [
            sx, 0, 0,
            0, sy, 0,
            0,  0, 1
        ];

        super(3, 3, ...scaleArr);
    }
}