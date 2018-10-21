import { Matrix } from "../base/Matrix";

/**
 * Represents a translation matrix in 2D homogenous co-ordinate system
 */
export class TranslationMatrix extends Matrix {

    /**
     * Create a translation matrix in 2D homogenous co-ordinate system
     * @param tx tx value
     * @param ty ty value
     */
    constructor(tx: number, ty: number) {
        
        const transArr = [
            1, 0, tx,
            0, 1, ty,
            0, 0, 1
        ];

        super(3, 3, ...transArr);
    }
}