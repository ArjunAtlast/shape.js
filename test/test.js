'use strict';
const expect = require("chai").expect;
var index = require('../dist/index.js');

describe('Matrix', () => {

    var m = new index.Matrix(2,2,1,2,2,1);

    it("constructor", () => {
        expect(m).to.be.an.instanceof(index.Matrix);
    });

    it("height, width, size", () => {
        expect(m.height).to.equal(2);
        expect(m.width).to.equal(2);
        expect(m.size).to.equal(4);
    });

    it("row, column", () => {
        expect(m.row(1)).to.deep.equal([2,1]);
        expect(m.column(0)).to.deep.equal([1,2]);
    });

    it("get, set", () => {
        
        var nm = new index.Matrix(2,2,1,2,3,4);
        expect(nm.get(1,1)).to.equal(4);
        nm.set(0,1,5);
        expect(nm.get(0,1)).to.equal(5);        
    });

    it("transpose", () => {

        var nm = new index.Matrix(2,1,1,2);

        nm.transpose();

        expect(nm.height).to.equal(1);
        expect(nm.width).to.equal(2);

        expect(nm.row(0)).to.deep.equal([1,2]);
        expect(nm.column(0)).to.deep.equal([1]);

    });

    it("clone", () => {

        var nm = m.clone();

        expect(nm).to.not.equal(m);

        expect(nm).to.deep.equal(m);

    });

});

describe("MatrixOperations", () => {

    it("add", () => {
        const mat1 = new index.Matrix(2,3,1,2,3,4,5,6);
        const mat2 = new index.Matrix(2,3,1,2,1,2,1,2);

        const res = index.MatrixOperations.add(mat1, mat2);

        expect(res._elements).to.deep.equal([2,4,4,6,6,8]);
    });

    it("subtract", () => {
        const mat1 = new index.Matrix(2,3,1,2,3,4,5,6);
        const mat2 = new index.Matrix(2,3,1,2,1,2,1,2);

        const res = index.MatrixOperations.subtract(mat1, mat2);

        expect(res._elements).to.deep.equal([0,0,2,2,4,4]);
    });

    it("scalarMultiply", () => {
        const mat1 = new index.Matrix(2,3,1,2,3,4,5,6);

        const res = index.MatrixOperations.scalarMultiply(mat1, 3);
        
        expect(res._elements).to.deep.equal([3,6,9,12,15,18]);
    });

    it("multiply", () => {
        const mat1 = new index.Matrix(2,3,1,2,3,4,5,6);
        const mat2 = new index.Matrix(3,2,1,2,1,2,1,2);

        const res = index.MatrixOperations.multiply(mat1, mat2);

        expect(res._elements).to.deep.equal([6,12,15,30]);
    });
});

describe('Transformations', () => {

    it('Translation', () => {
        expect(new index.TranslationMatrix(5, 5)).to.be.an.instanceOf(index.Matrix);
    });

    it('Rotation', () => {
        expect(new index.RotationMatrix(Math.PI/4)).to.be.an.instanceOf(index.Matrix);
    });

    it('Scaling', () => {
        expect(new index.ScalingMatrix(5, 5)).to.be.an.instanceOf(index.Matrix);
    });
});

describe('Point', () => {

    const p = new index.Point(5,10);

    it('constructor', () => {
        expect(p).to.be.an.instanceOf(index.Point);
    });

    it('matrix', () => {
        expect(p.matrix).to.be.an.instanceOf(index.Matrix);
        expect(p.matrix._elements).to.deep.equal([5,10,1]);
    });

    it('x, y', () => {
        expect(p.x).to.equal(5);
        expect(p.y).to.equal(10);
    });

    it('place', () => {

        const q = new index.Point(10,12);

        q.place(5,6);

        expect([q.x, q.y]).to.deep.equal([5,6]);
    });

    it('translate', () => {
        const q = new index.Point(10, 15);
        q.translate(3, 8);
        expect([q.x, q.y]).to.deep.equal([13, 23]);
    });

    it('rotate', () => {
        const q = new index.Point(8, 4);
        q.rotate(Math.PI/2, new index.Point(4,4));
        expect([q.x, q.y]).to.deep.equal([4,8]);
    });

    it('scale', () => {
        const q = new index.Point(8, 6);
        q.scale(2,2, new index.Point(4,4));
        expect([q.x, q.y]).to.deep.equal([12, 8]);
    });

    it('transform', () => {
        const q = new index.Point(5, 10);
        // (5, 10)
        const t = new index.TranslationMatrix(5, 10);
        const s = new index.ScalingMatrix(3,3);
        const c = index.MatrixOperations.multiply(t,s);

        q.transform(c);
        // (20, 40)

        expect([q.x, q.y]).to.deep.equal([20,40]);
    });

    it('equals', () => {
        const q = new index.Point(5, 10);
        expect(p.equals(q)).to.equal(true);
        expect(p.equals(new index.Point(10, 5))).to.equal(false);
    });

    it('toString', () => {
        const q = new index.Point(8, 6);
        expect(q.toString()).to.deep.equal('(8,6)');
        expect(`${q}`).to.deep.equal('(8,6)');
    });
});

describe('Path', () => {

    var path = new index.Path(new index.Point(1,1), new index.Point(2,2));

    it('constructor', () => {
        expect(path).to.be.an.instanceof(index.Path);
    });

    it('size', () => {
        expect(path.size).to.equal(2);
    });

    it('add', () => {
        expect(path.add(new index.Point(3,3))).to.equal(path);
        expect(path.toString()).to.deep.equal("(1,1)->(2,2)->(3,3)");

        path.add(new index.Point(1.5,1.5), 1);
        expect(path.toString()).to.deep.equal("(1,1)->(1.5,1.5)->(2,2)->(3,3)");

        path.add(new index.Point(5,5), 5);
        expect(path.toString()).to.deep.equal("(1,1)->(1.5,1.5)->(2,2)->(3,3)->(5,5)");

        path.add(new index.Point(0,0), -3);
        expect(path.toString()).to.deep.equal("(0,0)->(1,1)->(1.5,1.5)->(2,2)->(3,3)->(5,5)");
    });

    it('remove, removeAt', () => {

        const p = path._points[0];
        const m = path._points[5];

        expect(path.remove(p, m)).to.equal(path);
        expect(path.toString()).to.deep.equal("(1,1)->(1.5,1.5)->(2,2)->(3,3)");

        const q = path._points[1];
        const r = path._points[3];

        expect(path.removeAt(1,3)).to.deep.equal([q,r]);
        expect(path.toString()).to.deep.equal("(1,1)->(2,2)");

    });

    it('translate', () => {

        const p = new index.Path(new index.Point(1,1), new index.Point(2,2));
        p.translate(5,5)

        expect(p.toString()).to.deep.equal("(6,6)->(7,7)");
    });

    it('rotate', () => {

        const p = new index.Path(new index.Point(1,1), new index.Point(4,1));
        p.rotate(Math.PI/2, new index.Point(1,1));

        expect(p.toString()).to.deep.equal("(1,1)->(1,4)");
    });

    it('scale', () => {

        const p = new index.Path(new index.Point(1,1), new index.Point(4,1));
        p.scale(2,2, new index.Point(1,1));

        expect(p.toString()).to.deep.equal("(1,1)->(7,1)");
    });

    it('transform', () => {

        const p = new index.Path(new index.Point(1,1), new index.Point(4,1));
        const c = new index.Matrix(3, 3, 0, -1, 1, 4, 0, -4, 0, 0, 1);
        p.transform(c);

        expect(p.toString()).to.deep.equal("(0,0)->(0,12)");
    });

    it('clone', () => {

        const p = path.clone();

        expect(p).to.not.equal(path);
        expect(p).to.deep.equal(path);

    });

    it('toString', () => {

        expect(path.toString()).to.deep.equal("(1,1)->(2,2)");

    });
})