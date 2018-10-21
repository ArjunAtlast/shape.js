/**
 * Class that implements this interface must have a clone method
 */
export interface Cloneable {

    /**
     * Creates a deep copy of this object
     */
    clone(): this;

}