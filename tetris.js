/**
 * Created by user on 1/12/15.
 */


function Rect(params) {
    this.fillStyle = params.fillStyle || 'red';
    this.strokeStyle = params.strokeStyle || 'blue';
    this.lineWidth = params.lineWidth || 5;

    this.x = params.x || 0;
    this.y = params.y|| 0;
    this.width = params.width || 30;
    this.height = params.height || 30;
    this.isEmpty = params.isEmpty || false;
    this.context = params.context;
    this.bottomThreshold = params.bottomThreshold || false;

    this.draw = function()
    {
        if (!this.isEmpty) {
            this.context.fillStyle = this.fillStyle;
            this.context.fillRect(this.x, this.y, this.width, this.height);

            this.context.strokeStyle = this.strokeStyle;
            this.context.lineWidth  = this.lineWidth;
            this.context.strokeRect(this.x, this.y, this.width - this.lineWidth, this.height - this.lineWidth);


        }
    };

    this.clear = function() {

        if (!this.isEmpty) {

            this.context.clearRect(this.x - this.lineWidth, this.y - this.lineWidth, this.width + this.lineWidth, this.height + this.lineWidth);
        }

    }
}

function Well(){
    var well = [];
    var toRemove = [];
    var firstEmptyRow = 17;

    for (var i = 0; i < 18; i++) {
        for (var j = 0, tmp = []; j < 10; j++) {
            tmp.push(null);
        }
        well.push(tmp);
    }

    this.get = function(i,j) {

        return well[i][j]

    };

    this.getRow = function(i){

        return well[i]

    };

    this.set = function(i,j,data){

        well[i][j] = data;

    };

    this.checkRows = function(){

        var needRebuild = false;

        for (var i=17; i>=0; i--){

            var isFull = well[i].reduce(function(previousValue, currentValue, index) {

                    if (currentValue === null){

                        return currentValue;

                    } else return !!previousValue && !!currentValue;}
            );

            if (isFull){
                toRemove.push(i);
                needRebuild = true;
            } else if (isFull === null) {

                firstEmptyRow = i;
                break;
            }

        }

        return needRebuild;

    };

    this.clearRemovedRect = function(){

        for(var i=0; i<toRemove.length; i++){

            well[toRemove[i]].forEach(function(rect){rect.clear()});

        }

    };

    this.clearAllRect = function(){

        for (var i = 0; i < 18; i++) {
            for (var j = 0; j < 10; j++) {
                if (well[i][j]){

                    well[i][j].clear();

                }
            }
        }

    };

    this.rebuild = function(indexes){

        this.clearAllRect();

        indexes = indexes || toRemove;
        indexes = indexes.sort(function(a, b){return -a+b});
        console.log(indexes);

        var removeRowCount = indexes.length;

        for(var i = 0; i<indexes.length; i++){

            well.splice(indexes[i],1);

        }

        for (i=0; i<removeRowCount; i++){

            var tmp = [];
            for(var j=0; j<10;j++){

                tmp.push(null);

            }

            well.unshift(tmp)
        }

        toRemove = [];

    };

    this.refreshRectCoords = function(){

        for (var i = 0; i < 18; i++) {
            for (var j = 0; j < 10; j++) {
                if (well[i][j]){

                    well[i][j].x = j * 30;
                    well[i][j].y = i * 30;

                }
            }
        }

    };

    this.drawAllRect = function(){

        for (var i = 0; i < 18; i++) {
            for (var j = 0; j < 10; j++) {
                if (well[i][j]){

                    well[i][j].draw();

                }
            }
        }

    };

}

function Figure(params) {

}

Figure.prototype.absoluteX = 4;
Figure.prototype.absoluteY = 0;
Figure.prototype.well = new Well();


Figure.prototype.generateMatrix = function() {

    this.matrix = [];

    for (var i = 0; i < 4; i++) {
        for (var j = 0, tmp = []; j < 4; j++) {
            tmp.push(null);
        }
        this.matrix.push(tmp);
    }
};

Figure.prototype.reset = function(){

    this.absoluteX = 4;
    this.absoluteY = 0;

};


function popCol(matrix){

    for (var i=0; i<matrix.length;i++){
        matrix[i].pop();
    }
}

function shiftCol(matrix){

    for (var i=0; i<matrix.length;i++){
        matrix[i].shift();
    }
}

function pushCol(matrix, col){

    for (var i=0; i<matrix.length;i++){
        matrix[i].push(col[i]);
    }
}

function unshiftCol(matrix, col){

    for (var i=0; i<matrix.length;i++){
        matrix[i].unshift(col[i]);
    }
}





Figure.prototype.normalize = function (){

    var i,j;
    if (this.matrix[0][0]){

        for (i = 3; i>=0; i--){
            if (!this.matrix[i][0]){

                this.matrix.pop();

            } else break;

        }

        for (j = 3; j>=0; j--){

            if (!this.matrix[0][j]){

                popCol(this.matrix);

            } else break;

        }

        while (3 - j){

            pushCol(this.matrix, [null, null, null, null ]);
            j++;

        }

        while(3 - i) {

            this.matrix.unshift([null, null, null, null ]);
            i++;

        }



    } else if (this.matrix[0][3]){

        for (i = 3; i>=0; i--){
            if (!this.matrix[i][3]){

                this.matrix.pop();

            } else break;

        }

        for (j = 0; j<4; j++){
            if (!this.matrix[0][0]){

                shiftCol(this.matrix);

            } else break;

        }

        while (j){

            pushCol(this.matrix, [null, null, null, null ]);
            j--;

        }

        while(3 - i) {

            this.matrix.unshift([null, null, null, null ]);
            i++;

        }

    } else if (this.matrix[3][3]){

        for (i = 0; i<4; i++){
            if (!this.matrix[0][0]){

                this.matrix.shift();

            } else break;

        }

        for (j = 0; j<4; j++){
            if (!this.matrix[0][0]){

                shiftCol(this.matrix);

            } else break;

        }

        while (j){

            pushCol(this.matrix, [null, null, null, null ]);
            j--;

        }

        while(i) {

            this.matrix.unshift([null, null, null, null ]);
            i--;

        }

    }

};
Figure.prototype.refreshRectCoords = function(){

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.matrix[i][j]){

                this.matrix[i][j].x = this.absoluteX * 30 + j * 30;
                this.matrix[i][j].y = this.absoluteY * 30 + i * 30;

            }
        }
    }

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
        }
    }

    this.matrix = rotatedMatrix;

    this.normalize();
    this.refreshRectCoords();

    this.drawAllRect();

};

Figure.prototype.move = function(moveParams){

    var offsetY = moveParams.offsetY || 1;
    var directionY = moveParams.directionY || true;

    var offsetX = moveParams.offsetX;
    var directionX = moveParams.directionX;

    this.clearAllRect();

    if (directionX === true) {
        this.absoluteX += offsetX;
    } else if (directionX === false) {
        this.absoluteX -= offsetX;
    } else if (directionY) this.absoluteY += offsetY;

    this.refreshRectCoords();
    this.drawAllRect();


};

Figure.prototype.drop = function(moveParams){

    while (this.checkBottom()){
        this.move({});
    }

};



Figure.prototype.checkBottom = function(){

    var isOk = true;

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.matrix[i][j] &&  !this.matrix[i][j].isEmpty){

                var x = this.absoluteX+j;
                var y = this.absoluteY+i+1;

                if (y == 18) {

                    isOk = false;
                    break;

                }

                var cell = this.well.get(y,x);
                isOk = isOk && ! cell

            }
        }
    }

    return isOk;

};

Figure.prototype.toWell = function(){

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.matrix[i][j] && !this.matrix[i][j].isEmpty){

                this.well.set(this.absoluteY+i, this.absoluteX+j, this.matrix[i][j]);

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
    params['fillStyle'] = 'yellow';
    params['strokeStyle'] = 'red';

    this.matrix[0][0] = new Rect(params);
    this.matrix[1][0] = new Rect(params);
    this.matrix[2][0] = new Rect(params);
    this.matrix[3][0] = new Rect(params);

    this.refreshRectCoords();

}
extend(I, Figure);

function J(params){

    params['fillStyle'] = 'green';
    params['strokeStyle'] = 'maroon';

    this.reset();

    this.generateMatrix();

    this.matrix[3][0] = new Rect(params);
    this.matrix[3][1] = new Rect(params);
    this.matrix[2][0] = new Rect({isEmpty: true });
    this.matrix[2][1] = new Rect(params);
    this.matrix[1][0] = new Rect({isEmpty: true });
    this.matrix[1][1] = new Rect(params);

    this.refreshRectCoords();

}
extend(J, Figure);

function L(params){

    params['fillStyle'] = 'maroon';
    params['strokeStyle'] = 'green';

    this.generateMatrix();

    this.matrix[3][1] = new Rect(params);
    this.matrix[3][0] = new Rect(params);
    this.matrix[2][1] = new Rect({isEmpty: true });
    this.matrix[2][0] = new Rect(params);
    this.matrix[1][1] = new Rect({isEmpty: true });
    this.matrix[1][0] = new Rect(params);

    this.refreshRectCoords();

}
extend(L, Figure);

function O(params){

    params['fillStyle'] = 'silver';
    params['strokeStyle'] = 'teal';

    this.generateMatrix();

    this.matrix[3][0] = new Rect(params);
    this.matrix[3][1] = new Rect(params);
    this.matrix[2][0] = new Rect(params);
    this.matrix[2][1] = new Rect(params);

    this.refreshRectCoords();

}
extend(O, Figure);

function S(params){
    this.generateMatrix();

    this.matrix[3][0] = new Rect({context: params.context });
    this.matrix[3][1] = new Rect({context: params.context });
    this.matrix[3][2] = new Rect({isEmpty: true });
    this.matrix[2][0] = new Rect({isEmpty: true });
    this.matrix[2][1] = new Rect({context: params.context });
    this.matrix[2][2] = new Rect({context: params.context });

    this.refreshRectCoords();
}
extend(S, Figure);

function T(params){

    this.generateMatrix();

    this.matrix[3][0] = new Rect({context: params.context});
    this.matrix[3][1] = new Rect({context: params.context});
    this.matrix[3][2] = new Rect({context: params.context});
    this.matrix[2][0] = new Rect({isEmpty: true });
    this.matrix[2][1] = new Rect({context: params.context});
    this.matrix[2][2] = new Rect({isEmpty: true });

    this.refreshRectCoords();

}
extend(T, Figure);

function Z(params){

    this.generateMatrix();

    this.matrix[3][0] = new Rect({isEmpty: true });
    this.matrix[3][1] = new Rect({context: params.context });
    this.matrix[3][2] = new Rect({context: params.context });
    this.matrix[2][0] = new Rect({context: params.context });
    this.matrix[2][1] = new Rect({context: params.context });
    this.matrix[2][2] = new Rect({isEmpty: true });

    this.refreshRectCoords();

}
extend(Z, Figure);



