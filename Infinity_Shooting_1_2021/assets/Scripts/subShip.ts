const {ccclass, property} = cc._decorator;
@ccclass
export default class subShip extends cc.Component {
    static Instance: subShip = null;
    @property(cc.Prefab)
    bulletSubShip: cc.Node = null;
    @property(cc.Prefab)
    bulletSubShip1: cc.Node = null;
  
    @property(cc.Node)
    PositionbulletSubShip: cc.Node = null;
    @property(cc.Node)
    Canvas: cc.Node = null;
    @property
    stopGame: boolean = false;
    @property(cc.Node)
    Ship: cc.Node = null;
    onLoad() {
        subShip.Instance = this;
        this.Canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.schedule(this.spawBullet, 0.15, cc.macro.REPEAT_FOREVER)
        }, this);
        this.Ship.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.schedule(this.spawBullet, 0.15, cc.macro.REPEAT_FOREVER)
        }, this);
     }

    start () {

    }
    spawBullet() {
        if (window.matchMedia("(orientation: portrait)").matches && this.stopGame==false) {
            var Bullet = cc.instantiate(this.bulletSubShip);
            var pos = this.node.getPosition();
            Bullet.setPosition(cc.v2(pos.x - 155, pos.y));
            this.node.parent.addChild(Bullet);
            var Bullet = cc.instantiate(this.bulletSubShip);
            var pos = this.node.getPosition();
            Bullet.setPosition(cc.v2(pos.x + 150, pos.y));
            this.node.parent.addChild(Bullet);
        }
        if (window.matchMedia("(orientation: landscape)").matches && this.stopGame==false) {
            var Bullet = cc.instantiate(this.bulletSubShip1);
            var pos = this.node.getPosition();
            Bullet.setPosition(cc.v2(pos.x - 65, pos.y));
            this.node.parent.addChild(Bullet);
            var Bullet = cc.instantiate(this.bulletSubShip1);
            var pos = this.node.getPosition();
            Bullet.setPosition(cc.v2(pos.x + 60, pos.y));
            this.node.parent.addChild(Bullet);
        }
     }
    update(dt) {
        //this.spawBullet();
    }
}
