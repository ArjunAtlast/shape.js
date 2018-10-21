import { Matrix } from "../base/Matrix";
import { Point } from "../general/Point";

/**
 * Class that implements this interface must have a translate method
 */
export interface Translatable {
    
    translate(tx: number, ty: number): Translatable;

}

/**
 * Class that implements this interface must have a rotate method
 */
export interface Rotatable {

    rotate(angle: number, pivot?: Point): Rotatable;

}

/**
 * Class that implements this interface must have a scale method
 */
export interface Scalable {

    scale(sx: number, sy:number, pivot?: Point): Scalable;

}

/**
 * Class that implements this interface must have translate, scale, rotate and transform methods.
 */
export interface Transformable extends Translatable, Rotatable, Scalable {

    transform(matrix: Matrix): Transformable;

}