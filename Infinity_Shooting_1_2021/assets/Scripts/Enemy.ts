// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass

export default class NewClass extends cc.Component {
    @property
enemyNumber: number = 9; 
    action: cc.ActionInterval;
    @property({
        type: cc.AudioClip
    })
    explosion = null;
    @property(cc.Prefab)
    BulletEnemy: cc.Prefab = null;
    @property(cc.Node)
    test: cc.Node = null;
    @property(cc.Node)
    enemy1: cc.Node = null;
    @property(cc.Node)
    enemy2: cc.Node = null;
    @property(cc.Node)
    enemy3: cc.Node = null;
    @property(cc.Node)
    enemy4: cc.Node = null;
    @property(cc.Node)
    enemy5: cc.Node = null;
    @property(cc.Node)
    enemy6: cc.Node = null;
    @property(cc.Node)
    cavas: cc.Node = null;
    @property(cc.Node)
    enemy7: cc.Node = null;
    @property(cc.Node)
    enemy8: cc.Node = null;
    @property(cc.Node)
    enemy9: cc.Node = null;
    @property(cc.Node)
    redDes: cc.Node = null;
    @property(cc.Prefab)
    expolosion: cc.Node = null;
    @property(cc.Prefab)
    shield: cc.Node = null;
    @property
    ShootFrequency:number=3.0;
    @property
    Animation_Node:cc.Animation;
    @property
    duration:number = 0.5;
    @property
    moveAmountX:number = 0.01;
    @property
    moveAmountY:number =0.01;
    moveEnemy:cc.ActionInterval;
    @property
    enemyLife: number = 100;
    @property
    enemyHp: number = 6;

    @property
    shieldHave: boolean = false;
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        var manager= cc.director.getCollisionManager();
        manager.enabled = true;
        var anim = this.getComponent(cc.Animation); 
    this.schedule(this.spawBullet,2,cc.macro.REPEAT_FOREVER);   
      
     
    }

    spawBullet() {
        try { 
            if (window.matchMedia("(orientation: portrait)").matches) {
                var enemys = [this.enemy1, this.enemy2, this.enemy3, this.enemy4, this.enemy5, this.enemy6, this.enemy7, this.enemy8, this.enemy9]
                var random = Math.floor(Math.random() * enemys.length);

                var newBullet = cc.instantiate(this.BulletEnemy);
          
                newBullet.setPosition(enemys[random].position.x , enemys[random].position.y );
                this.node.addChild(newBullet);
            }
            if (window.matchMedia("(orientation: landscape)").matches) { 
                var enemys = [this.enemy1, this.enemy2, this.enemy3, this.enemy4, this.enemy5, this.enemy6, this.enemy7, this.enemy8, this.enemy9]
                var random = Math.floor(Math.random() * enemys.length);

                var newBullet = cc.instantiate(this.BulletEnemy);
          
                newBullet.setPosition(enemys[random].position.x + 100, enemys[random].position.y - 100);

                this.node.addChild(newBullet);

            }
        } catch (error) {

         }
    }
    onCollisionEnter(other, self) { 
        if (other.name == "Bullet33<BoxCollider>"||other.name == "Bullet1<BoxCollider>"||other.name == "Bullet1<BoxCollider>"||other.name == "Bullet2<BoxCollider>"||other.name == "Bullet3<BoxCollider>"||other.name == "Bullet4<BoxCollider>"||other.name == "Bullet5<BoxCollider>"||other.name == "Bullet6<BoxCollider>") {
            this.enemyHp -= 1;
            other.node.destroy();
            if (this.enemyHp == 0) {
                this.enemyNumber--
                
                
                   
       
                 
                self.node.destroy();
                var explosion = cc.instantiate(this.expolosion);
                explosion.setPosition(self.node.position);
                this.node.parent.addChild(explosion) 
                cc.audioEngine.playEffect(this.explosion,false);
                this.redDes.getComponent(cc.Animation).play('shakeCamera');
                this.node.parent.parent.getComponent('GameController').spawShield(self.node.position.x, self.node.position.y);
                this.node.parent.getChildByName('Boss').getComponent('Boss').spawnBullet();
            }
           
        }
    }
    start () {

    }
    update(dt) {
        this.schedule(this.spawBullet,2,cc.macro.REPEAT_FOREVER); 
     }
}
