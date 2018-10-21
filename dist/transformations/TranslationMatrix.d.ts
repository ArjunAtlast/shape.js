import { Matrix } from "../base/Matrix";
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
