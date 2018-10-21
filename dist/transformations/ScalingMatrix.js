"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = require("../base/Matrix");
/**
 * Represents a scaling matrix in 2D homogenous co-ordinate system
 */
class ScalingMatrix extends Matrix_1.Matrix {
    /**
     * Create a scaling matrix in 2D homogenous co-ordinate system
     * @param sx sx value
     * @param sy sy value
     */
    constructor(sx, sy) {
        const scaleArr = [
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1
        ];
        super(3, 3, ...scaleArr);
    }
}
exports.ScalingMatrix = ScalingMatrix;
