/**
 * Created by user on 1/12/15.
 */


function Rect(params) {
    this.color = params.color || 'black';
    this.x = params.x || 0;
    this.y = params.y|| 0;
    this.width = params.width || 30;
    this.height = params.height || 30;
    this.isEmpty = params.isEmpty || false;
    this.context = params.context;
    this.bottomThreshold = params.bottomThreshold || false;

    this.draw = function()
    {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    };

    this.clear = function() {

        this.context.clearRect(this.x, this.y, this.width, this.height);

    }
}

function Figure(params) {

}



Figure.prototype.well = [];

for (var i = 0; i < 18; i++) {
    for (var j = 0, tmp = []; j < 10; j++) {
        tmp.push(null);
    }
    Figure.prototype.well.push(tmp);
}

Figure.prototype.updateWell = function(){

    Figure.prototype.well[i][j] = data;

};

Figure.prototype.offsetVertical = 0;
Figure.prototype.offsetHorizontal = 0;

Figure.prototype.mediana = 4;

Figure.prototype.generateMatrix = function() {

    this.matrix = [];

    for (var i = 0; i < 4; i++) {
        for (var j = 0, tmp = []; j < 4; j++) {
            tmp.push(null);
        }
        this.matrix.push(tmp);
    }
};

Figure.prototype.rotate = function (){

    this.clearAllRect();

    var rotatedMatrix = [];
    for (var x = 0; x < 4; x++) {
        for (var y = 0, tmp = []; y < 4; y++) {
            tmp.push(null);
        }
        rotatedMatrix.push(tmp);
    }

    for (var i=0; i<this.matrix.length;i++){
        for (var j=0; j<this.matrix[i].length; j++){
            rotatedMatrix[j][this.matrix.length - i - 1] = this.matrix[i][j];
            if (this.matrix[i][j]){

                rotatedMatrix[j][this.matrix.length - i - 1].y = 0 + j * 30 + this.offsetVertical;
                rotatedMatrix[j][this.matrix.length - i - 1].x = 0 + (this.matrix.length - i - 1) * 30 + this.offsetHorizontal;

            }
        }
    }

    this.matrix = rotatedMatrix;

    this.drawAllRect();

};

Figure.prototype.drawAllRect = function(){

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.matrix[i][j]){

                this.matrix[i][j].draw();

            }
        }
    }

};

Figure.prototype.clearAllRect = function(){

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.matrix[i][j]){

                this.matrix[i][j].clear();

            }
        }
    }

};

Figure.prototype.toWell = function(){

};

Figure.prototype.move = function(offset){

    offset = offset || 30;

    this.offsetVertical += offset;


    this.clearAllRect();

    for (var i=0; i<this.matrix.length;i++){
        for (var j=0; j<this.matrix[i].length; j++){
            if (this.matrix[i][j]){

                this.matrix[i][j].y = this.matrix[i][j].y + offset;

            }
        }
    }

    this.drawAllRect();

};

Figure.prototype.moveHorizontal = function(offset){

    offset = offset || 30;

    this.offsetHorizontal += offset;

    this.clearAllRect();

    for (var i=0; i<this.matrix.length;i++){
        for (var j=0; j<this.matrix[i].length; j++){
            if (this.matrix[i][j]){

                this.matrix[i][j].x = this.matrix[i][j].x + offset;

            }
        }
    }

    this.drawAllRect();

};

Figure.prototype.checkBottom = function(){

    var i = this.offsetVertical / 30;
    var j = this.mediana + this.offsetHorizontal / 30;

    return this.well[i][j] === null;

};

Figure.prototype.getBottomThresholdCoords = function(){

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.matrix[i][j]){

                if (this.matrix[i][j].hasOwnProperty('bottomThreshold')){
                    return [i,j];
                }

            }
        }
    }

};

function extend(Child, Parent) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype
}


function I(params){

    this.generateMatrix();

    this.matrix[0][0] = new Rect({context: params.context, y:0 + 0 * 30, x:0 + 0 * 30 });
    this.matrix[1][0] = new Rect({context: params.context, y:0 + 1 * 30, x:0 + 0 * 30 });
    this.matrix[2][0] = new Rect({context: params.context, y:0 + 2 * 30, x:0 + 0 * 30 });
    this.matrix[3][0] = new Rect({context: params.context, y:0 + 3 * 30, x:0 + 0 * 30 });

}
extend(I, Figure);

function J(params){

    this.generateMatrix();

    this.matrix[3][0] = new Rect({context: params.context, y:0 + 3 * 30, x:0 + 0 * 30 });
    this.matrix[3][1] = new Rect({context: params.context, y:0 + 3 * 30, x:0 + 1 * 30 });
    this.matrix[2][1] = new Rect({context: params.context, y:0 + 2 * 30, x:0 + 1 * 30 });
    this.matrix[1][1] = new Rect({context: params.context, y:0 + 1 * 30, x:0 + 1 * 30 });

}
extend(J, Figure);

function L(params){

    this.generateMatrix();

    this.matrix[3][1] = new Rect({context: params.context, y:0 + 3 * 30, x:0 + 1 * 30 });
    this.matrix[3][0] = new Rect({context: params.context, y:0 + 3 * 30, x:0 + 0 * 30 });
    this.matrix[2][0] = new Rect({context: params.context, y:0 + 2 * 30, x:0 + 0 * 30 });
    this.matrix[1][0] = new Rect({context: params.context, y:0 + 1 * 30, x:0 + 0 * 30 });

}
extend(L, Figure);

function O(params){

    this.generateMatrix();

    this.matrix[3][0] = new Rect({context: params.context, y:0 + 3 * 30, x:0 + 0 * 30 });
    this.matrix[3][1] = new Rect({context: params.context, y:0 + 3 * 30, x:0 + 1 * 30 });
    this.matrix[2][0] = new Rect({context: params.context, y:0 + 2 * 30, x:0 + 0 * 30 });
    this.matrix[2][1] = new Rect({context: params.context, y:0 + 2 * 30, x:0 + 1 * 30 });

    this.update = function () {

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.matrix[i][j]){

//                    this.matrix[i][j].clear();
//                      !!!! TODO!!!!!!!!!!!!!!!!

                }
            }
        }

    }


}
extend(O, Figure);

function S(params){
    this.generateMatrix();

    this.matrix[3][0] = new Rect({context: params.context, y:0 + 3 * 30, x:0 + 0 * 30 });
    this.matrix[3][1] = new Rect({context: params.context, y:0 + 3 * 30, x:0 + 1 * 30 });
    this.matrix[2][1] = new Rect({context: params.context, y:0 + 2 * 30, x:0 + 1 * 30 });
    this.matrix[2][2] = new Rect({context: params.context, y:0 + 2 * 30, x:0 + 2 * 30 });
}
extend(S, Figure);

function T(params){

    this.generateMatrix();

    this.matrix[3][0] = new Rect({context: params.context, y:0 + 3 * 30, x:0 + 0 * 30 });
    this.matrix[3][1] = new Rect({context: params.context, y:0 + 3 * 30, x:0 + 1 * 30 });
    this.matrix[3][2] = new Rect({context: params.context, y:0 + 3 * 30, x:0 + 2 * 30 });
    this.matrix[2][1] = new Rect({context: params.context, y:0 + 2 * 30, x:0 + 1 * 30 });

}
extend(T, Figure);

function Z(params){

    this.generateMatrix();

    this.matrix[3][1] = new Rect({context: params.context, y:0 + 3 * 30, x:0 + 1 * 30 });
    this.matrix[3][2] = new Rect({context: params.context, y:0 + 3 * 30, x:0 + 2 * 30 });
    this.matrix[2][0] = new Rect({context: params.context, y:0 + 2 * 30, x:0 + 0 * 30 });
    this.matrix[2][1] = new Rect({context: params.context, y:0 + 2 * 30, x:0 + 1* 30 });

}
extend(Z, Figure);



