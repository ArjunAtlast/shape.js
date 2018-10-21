"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = require("../base/Matrix");
/**
 * Represents a rotation matrix in 2D homogenous co-ordinate system
 */
class RotationMatrix extends Matrix_1.Matrix {
    /**
     * Create a rotation matrix in 2D homogenous co-ordinate system
     * @param angle angle of rotation in radians
     */
    constructor(angle) {
        const cos$ = Math.cos(angle);
        const sin$ = Math.sin(angle);
        const rotatArr = [
            cos$, -sin$, 0,
            sin$, cos$, 0,
            0, 0, 1
        ];
        super(3, 3, ...rotatArr);
    }
}
exports.RotationMatrix = RotationMatrix;
