"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = require("../base/Matrix");
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
