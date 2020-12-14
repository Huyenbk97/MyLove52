// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    rate: number = 0;
    @property
    spin: number = 0;
    @property
    rotation: number = 0;
    @property
    speed: number = 0;
    @property(cc.v2)
    offset: cc.Vec2 = 0;
    Y = 0;
    @property
    delay: number = 3;
    @property(cc.Prefab)
    bulletBoss: cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
   boss:cc.Node=null;
    onLoad() {
       this.schedule(function() {
            // Here `this` is referring to the component
            this.initBullet();
        }, this.rate, cc.macro.REPEAT_FOREVER, 8);
    }

    start () {

    }
    initBullet() {
        let node = cc.instantiate(this.bulletBoss);
        node.parent = this.node.parent;
        //node.position = this.offset.add(this.node.position);
        var pos = this.boss.getPosition();
       node.setPosition(cc.v2(pos.x-100, pos.y-70))
        node.rotation = this.rotation;
        let endPoint = cc.v2();
        endPoint.x = cc.winSize.height * Math.sin(this.rotation / 180 * Math.PI);
        endPoint.y = cc.winSize.height * Math.cos(this.rotation /180 * Math.PI);
        let distance = endPoint.sub(node.position).mag();
        let duration = distance / this.speed;
        let moveBy = cc.moveBy(duration, endPoint);
        let removeSelt = cc.removeSelf();
        let sequence = cc.sequence(moveBy, removeSelt);
        node.runAction(sequence);
    }
    update(dt) {
        if (this.spin===0) {
            return;  
        }
        this.rotation += dt * this.spin;
        if (this.rotation==0) {
            this.node.destroy();
        }
    }
}
