// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    bulletPositon1: cc.Node = null;
    @property(cc.Node)
    bulletPositon2: cc.Node = null;
    @property(cc.Node)
    Ship: cc.Node = null; 
    @property
    rate: number = 0;
    @property
    spin: number = 0;
    @property
    rotation: number = 0;
    @property
    speed: number = 0;
    @property
    game: number = 0;
    @property
    delay: number = 3;
    @property(cc.Prefab)
    bulletBoss: cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
   boss:cc.Node=null;
    onLoad() {
        this.Ship.on(cc.Node.EventType.TOUCH_START, function (event) {
        }, this);
        this.Ship.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.schedule(this.initBullet, this.rate, 5);
     }, this);            
    }  
    start () {

    }
    initBullet() {
        if (window.matchMedia("(orientation: landscape)").matches) {
            let node = cc.instantiate(this.bulletBoss);
            node.parent = this.node.parent;
            //node.position = this.offset.add(this.node.position);
            var pos = this.bulletPositon1.getPosition();
            node.setPosition(cc.v2(pos.x, pos.y))
            node.setScale(0.5,0.5)
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
        if (window.matchMedia("(orientation: portrait)").matches) {
            let node = cc.instantiate(this.bulletBoss);
            node.parent = this.node;
            //node.position = this.offset.add(this.node.position);
            var pos = this.boss.getPosition();
            node.setPosition(cc.v2(pos.x, pos.y))
            //node.setScale(0.5,0.5)
            node.rotation = this.rotation;
            let endPoint = cc.v2();
            endPoint.x = cc.winSize.height * Math.sin(this.rotation / 180 * Math.PI);
            endPoint.y = cc.winSize.height * Math.cos(this.rotation /180 * Math.PI);
            let distance = endPoint.sub(node.getPosition()).mag();
            let duration = distance / this.speed;
            let moveBy = cc.moveBy(duration, endPoint);
            let removeSelt = cc.removeSelf();
            let sequence = cc.sequence(moveBy, removeSelt);
            node.runAction(sequence); 
            ////////////////////////////////////////////////////// 
            // let node1 = cc.instantiate(this.bulletBoss);
            // node1.parent = this.node.parent;
            // //node.position = this.offset.add(this.node.position);
            // var pos1 = this.bulletPositon2.getPosition();
            // node.setPosition(cc.v2(pos1.x, pos1.y))
            // node.setScale(0.5,0.5)
            // node.rotation = this.rotation;
            // let endPoint1 = cc.v2();
            // endPoint1.x = cc.winSize.height * Math.sin(this.rotation / 180 * Math.PI);
            // endPoint1.y = cc.winSize.height * Math.cos(this.rotation /180 * Math.PI);
            // let distance1 = endPoint.sub(node.position).mag();
            // let duration1 = distance1 / this.speed;
            // let moveBy1 = cc.moveBy(duration1, endPoint1);
            // let removeSelt1 = cc.removeSelf();
            // let sequence1 = cc.sequence(moveBy1, removeSelt1);
            // node.runAction(sequence1);  
            ///////////////////////////////////////////////////
        }
    
    }
    update(dt) {
        if (this.spin===0) {
            return;  
        }
        // this.rotation += 30
        // if (this.rotation >= 360) {
        //     this.rotation = 0
        // }
        // this.typeMBulletAngle += 30
        // if (this.typeMBulletAngle >= 360) {
        //     this.typeMBulletAngle = 0
        // }
        this.rotation += dt * this.spin;
        if (this.rotation==0) {
            this.node.destroy();
        }
    }
}
