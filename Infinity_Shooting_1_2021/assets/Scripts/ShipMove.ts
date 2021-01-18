const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property
    speed: number = 1000;
    tmpPos: cc.Vec2 = null;
    @property(cc.Node)
    Ship: cc.Node = null;
    onLoad() {

    }
    start() {
        
        this.tmpPos = this.node.position;
        var self = this;
    
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (self.node) {
                let touches = event.getTouches();
                let moving = touches[0].getDelta();
                self.tmpPos.addSelf(moving);
            }
        });
    }
    update(dt) {
        let currentPos = this.node.position;
        let delta = this.tmpPos.sub(currentPos);
        let distance = delta.magSqr();
        let maxSpeedPerFrame = this.speed * dt;
        this.node.position = this.node.position.add(delta);
        let screen = cc.Canvas.instance.node.getContentSize();
        this.node.x = cc.misc.clampf(this.node.x, -screen.width / 2, screen.width / 2);
        this.node.y = cc.misc.clampf(this.node.y, -screen.height / 2, screen.height / 2);
        if (window.matchMedia("(orientation: portrait)").matches) {
            if (this.node.x > 324) this.node.x = 341.489;
            if (this.node.x < -300) this.node.x = -322.167;
            if (this.node.y > 826.591) this.node.y = 826.591;
            if (this.node.y < -833.009) this.node.y = -833.009;
            console.log( this.node.getPosition());
        }    
      
        if (window.matchMedia("(orientation: landscape)").matches) {
            console.log( this.node.getPosition());
            if (this.node.y < -262) this.node.y = -262;
            if (this.node.y > 262) this.node.y = 262;
            if (this.node.x > 450) this.node.x = 450;
            if (this.node.x < -450) this.node.x = -450;
        }
       }
}

