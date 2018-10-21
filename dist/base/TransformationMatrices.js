"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = require("./Matrix");
/**
 * Represents a translation matrix in 2D homogenous co-ordinate system
 */
class TranslationMatrix extends Matrix_1.Matrix {
    /**
     * Create a translation matrix in 2D homogenous co-ordinate system
     * @param tx tx value
     * @param ty ty value
     */
    constructor(tx, ty) {
        const transArr = [
            1, 0, tx,
            0, 1, ty,
            0, 0, 1
        ];
        super(3, 3, ...transArr);
    }
}
exports.TranslationMatrix = TranslationMatrix;
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
