import { Matrix } from "../base/Matrix";

/**
 * Represents a rotation matrix in 2D homogenous co-ordinate system
 */
export class RotationMatrix extends Matrix {

    /**
     * Create a rotation matrix in 2D homogenous co-ordinate system
     * @param angle angle of rotation in radians
     */
    constructor(angle: number) {

        const cos$ = Math.cos(angle);
        const sin$ = Math.sin(angle);

        const rotatArr = [
            cos$, -sin$, 0,
            sin$, cos$, 0,
            0,    0,    1
        ]

        super(3, 3, ...rotatArr);
    }
}