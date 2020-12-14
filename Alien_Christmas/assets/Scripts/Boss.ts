const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property
    duration: number = 0;
    @property
    moveAmountX:number = 300;
    @property
    moveAmountY: number = 75;
    moveEnemy:cc.ActionInterval;
    @property
    text: string = 'hello';
    @property(cc.Prefab)
    BulletBoss: cc.Prefab = null;
    @property
    ShootFrequency:number = 3.0; 
    enemyLife:number = 6;
    playAnimation:boolean = true;
    onLoad() {
        this.moveEnemy = this.setMove();
        this.node.runAction(this.moveEnemy);
        this.schedule(this.spawnBullet,this.ShootFrequency,cc.macro.REPEAT_FOREVER,3.0);
    }
    setMove() {
        var moveLeft = cc.moveTo(this.duration, cc.v2(-193.894, 520.445));
        var moveRight = cc.moveTo(this.duration, cc.v2(190.69, 520.445));
        return cc.repeatForever(cc.sequence(moveLeft, moveRight));
    }
    spawnBullet() {
        var Bullet = cc.instantiate(this.BulletBoss);
        Bullet.setPosition(this.node.position.x-130,this.node.position.y);
        this.node.parent.addChild(Bullet);
        var Bullet = cc.instantiate(this.BulletBoss);
        Bullet.setPosition(this.node.position.x+130,this.node.position.y);
        this.node.parent.addChild(Bullet);
    }
    onCollisionEnter(otherCollider, seftCollider) {
       if (otherCollider.name=="Bullet<BoxCollider>") {
           this.enemyLife -= 1;
           if (this.enemyLife==0) {
               this.node.getComponent(cc.Animation).play();
           }
        }
        if (otherCollider.name=="ship<PolygonCollider>") {
              
        }

    }

    start () {

    }

    update(dt) {
        this.setMove();
     }
}
      