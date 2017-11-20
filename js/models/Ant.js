var Ant = function () {
    this.location = { x: 10, y: 10 };
    this.orientation = { x: 0, y: 0 };
    this.speed = 1;
    this.fieldView = 3;
    this.type = Ant.static.types[1];
    this.destination = { x: 100, y: 100 };
    this.varAbs = 0;

    this.setDestination = function () {
        this.destination.x = Math.floor((Math.random() * (100 + this.location.x)) + this.location.x);
        this.destination.y = Math.floor((Math.random() * (100 + this.location.y)) + this.location.y);
        this.varAbs = Math.sqrt(Math.pow(this.destination.x - this.location.x, 2) + Math.pow(this.destination.y - this.location.y, 2));
        this.orientation.x = (this.destination.x - this.location.x) / this.varAbs;
        this.orientation.y = (this.destination.y - this.location.y) / this.varAbs;
        console.log("new loc x:" + this.destination.x + " Y:" + + this.destination.y);
    }

    this.move = function () {
        if (Math.floor(this.location.x) == this.destination.x && Math.floor(this.location.y) == this.destination.y) {
            this.orientation = { x: 0, y: 0 };
            this.setDestination();
        }
        this.location.x = this.location.x + this.orientation.x * this.speed;
        this.location.y = this.location.y + this.orientation.y * this.speed;
    }

    this.render = function (state) {
        this.move();
        var ctx = state.context;
        ctx.save()
        ctx.beginPath();
        ctx.fillStyle = '#FFF';
        ctx.arc(this.location.x, this.location.y, 1, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }
    this.setDestination();
}

Ant.static = {
    types: { 0: "Worker", 1: "Soldier", 2: "Gatherer", 3: "Scout", 4: "Queen" }
}