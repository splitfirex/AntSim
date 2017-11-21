var Ant = function (worldState) {
    this.location = { x: 10, y: 10 };
    this.orientation = { x: 0, y: 0 };
    this.speed = 1;
    this.fieldView = 10;
    this.type = Ant.static.types[1];
    this.destination = { x: 100, y: 100 };
    this.varAbs = 0;

    this.setDestination = function (state) {
        this.destination.x = this.location.x + Math.floor((Math.random() * (200) - 100));
        this.destination.y = this.location.y + Math.floor((Math.random() * (200) - 100));

        this.destination.x = this.destination.x < 0 ? Math.floor(-this.destination.x) : Math.floor(this.destination.x);
        this.destination.y = this.destination.y < 0 ? Math.floor(-this.destination.y) : Math.floor(this.destination.y);

        this.destination.x = this.destination.x > state.screen.width ? state.screen.width : Math.floor(this.destination.x);
        this.destination.y = this.destination.y > state.screen.height ? state.screen.height : Math.floor(this.destination.y);

        this.varAbs = Math.sqrt(Math.pow(this.destination.x - this.location.x, 2) + Math.pow(this.destination.y - this.location.y, 2));
        this.orientation.x = (this.destination.x - this.location.x) / this.varAbs;
        this.orientation.y = (this.destination.y - this.location.y) / this.varAbs;
        console.log("new dest x:" + this.destination.x + " Y:" + this.destination.y + " Angulo "+ (Math.atan2(this.orientation.x,this.orientation.y)*(180/Math.PI)));
    }

    this.move = function (state) {
        if (Math.abs(this.destination.x - this.location.x) < this.fieldView && Math.abs(this.destination.y - this.location.y) < this.fieldView) {
            this.orientation = { x: 0, y: 0 };
            this.setDestination(state);
        }
        this.location.x = this.location.x + this.orientation.x * this.speed;
        this.location.y = this.location.y + this.orientation.y * this.speed;
    }

    this.render = function (state) {
        this.move(state);
        var ctx = state.context;
        ctx.save()
        ctx.rotate(Math.atan2(this.orientation.x,this.orientation.y)*(180/Math.PI));
        ctx.beginPath();
        ctx.strokeRect(this.location.x,this.location.y,4,4);
        ctx.fillStyle = '#FFF';
        //ctx.arc(this.location.x, this.location.y, 1, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();

        ctx.save()
        ctx.beginPath();
        ctx.fillStyle = '#FF0000';
        ctx.arc(this.destination.x, this.destination.y, 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
    this.setDestination(worldState);
}

Ant.static = {
    types: { 0: "Worker", 1: "Soldier", 2: "Gatherer", 3: "Scout", 4: "Queen" }
}