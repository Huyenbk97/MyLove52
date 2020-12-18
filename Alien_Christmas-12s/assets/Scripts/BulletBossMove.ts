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
            this.game += 1
            if (this.game == 1) {
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.initBullet();
                }, this.rate, 40, 2);
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.initBullet();
                }, this.rate, 40,5);
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.initBullet();
                }, this.rate, 40, 6);
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.initBullet();
                }, this.rate, 40, 20);
            }
        }, this);
        this.Ship.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.game += 1
            if (this.game == 1) {
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.initBullet();
                }, this.rate, 40, 2);
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.initBullet();
                }, this.rate, 40, 7);
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.initBullet();
                }, this.rate, 40, 14);
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.initBullet();
                }, this.rate, 40, 20);
            
    }
     }, this);  
            
    }
    

    start () {

    }
    initBullet() {
        if (window.matchMedia("(orientation: landscape)").matches) {
            let node = cc.instantiate(this.bulletBoss);
            node.parent = this.node.parent;
            //node.position = this.offset.add(this.node.position);
            var pos = this.boss.getPosition();
            node.setPosition(cc.v2(pos.x+10, pos.y - 100))
            node.setScale(0.3,0.3)
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
            node.parent = this.node.parent;
            //node.position = this.offset.add(this.node.position);
            var pos = this.boss.getPosition();
            node.setPosition(cc.v2(pos.x+10, pos.y - 200))
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
