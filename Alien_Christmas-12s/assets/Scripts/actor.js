// actor.js 角色沿路径行走代码

var gen_map_path = require("gen_map_path");
var State = {
    Idle: 0,
    Walk: 1,
    Attack: 2,
    Dead: 3,
};

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...

        map: {
            type: gen_map_path,
            default: null,
        },

        speed: 100,
    },

    // use this for initialization
    onLoad: function() {

    },

    start: function() {
        var road_set = this.map.get_road_set();
        this.cur_road = road_set[0];

        if (this.cur_road < 2) {
            return;
        }

        this.state = State.Idle;
        var pos = this.cur_road[0];
        this.node.setPosition(pos);
        this.walk_to_next = 1;

        this.start_walk();
    },

    start_walk: function() {
        if (this.walk_to_next >= this.cur_road.length) {
            // 攻击逻辑
            this.state = State.Attack;
            // 
            return;
        }

        var src = this.node.getPosition();
        var dst = this.cur_road[this.walk_to_next];

        var dir = dst.sub(src);
        var len = dir.mag();

        this.vx = this.speed * dir.x / len;
        this.vy = this.speed * dir.y / len;
        this.walk_total_time = len / this.speed;
        this.walked_time = 0;

        this.state = State.Walk;
    },

    walk_update: function(dt) {
        if (this.state != State.Walk) {
            return;
        }

        this.walked_time += dt;
        if (this.walked_time > this.walk_total_time) {
            dt -= (this.walked_time - this.walk_total_time);
        }

        var sx = this.vx * dt;
        var sy = this.vy * dt;
        this.node.x += sx;
        this.node.y += sy;

        if (this.walked_time >= this.walk_total_time) {
            this.walk_to_next++;
            this.start_walk();
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function(dt) {
        if (this.state == State.Walk) {
            this.walk_update(dt);
        }
    },
});