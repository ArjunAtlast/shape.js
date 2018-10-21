import { Matrix } from "../base/Matrix";
import { Point } from "../general/Point";
export interface Translatable {
    translate(tx: number, ty: number): Translatable;
}
export interface Rotatable {
    rotate(angle: number, pivot?: Point): Rotatable;
}
export interface Scalable {
    scale(sx: number, sy: number, pivot?: Point): Scalable;
}
export interface Transformable extends Translatable, Rotatable, Scalable {
    transform(matrix: Matrix): Transformable;
}
