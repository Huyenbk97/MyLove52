const {ccclass, property} = cc._decorator;
@ccclass
export default class Boss extends cc.Component {
    static Instance: Boss = null;
    @property(cc.AudioClip)
    ExpolosionBoss = null;
    @property
    duration: number = 0;
    @property
    moveAmountX:number = 300;
    @property
    moveAmountY: number = 75;
    moveEnemy:cc.ActionInterval;
    @property(cc.Prefab)
    BulletBoss: cc.Prefab = null;
    @property(cc.Sprite)
    hp: cc.Sprite = null;
    @property
    ShootFrequency: number = 3.0;
    @property
    enemyLife: number = 200;
    @property
    progress: number = 1;
    @property
    game: number = 0;
    @property
    gameStar: boolean = false;
    @property
    enemyClear: boolean = false;
    @property
    bossClear: boolean = false;
    @property
    playAnimation: boolean = true;
    @property(cc.Prefab)
    explosion: cc.Node = null;
    @property(cc.Node)
    Ship: cc.Node = null;
    @property(cc.Node)
    Boss: cc.Node = null;
    @property(cc.Node)
    text: cc.Node = null;
    @property(cc.Node)
    cavas: cc.Node = null;
    @property(cc.Node)
    redDes: cc.Node = null;
    @property(cc.Node)
    bgBlack: cc.Node = null;
    @property(cc.Prefab)
    explosion1: cc.Node = null;
    @property(cc.Prefab)
    hitDame: cc.Node = null;
    @property
    enemyNumber: number = 9;
    @property
    shieldHp: number = 10;
    @property
    BossHp: number = 10;
    @property
    BossMove: number = 10;
    @property(cc.Node)
    textHand: cc.Node = null; 
    @property(cc.Node)
    redDis: cc.Node = null; 
    @property(cc.Prefab)
    expolosionNode: cc.Node = null;
    @property({
        type:cc.AudioClip
    })
    Boss_explosion = null;
    onLoad() {
        
        Boss.Instance = this;
        var manager= cc.director.getCollisionManager();
        manager.enabled = true;
           
    }
    open() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
       //this.moveEnemy = this.setMove();
        this.node.runAction(this.moveEnemy);
        this.schedule(this.spawnBullet, 3, cc.macro.REPEAT_FOREVER, 3.0);  
    }
    setMove() {
    }
    spawnBullet() {

       this.enemyNumber--
        //console.log(this.enemyNumber);
        if (this.enemyNumber==0) {
            //console.log("enemyNumber==0");
            this.enemyClear = true;
        }
        if (this.enemyNumber == 4) {
            
            try {
            
         
                if (window.matchMedia("(orientation: portrait)").matches) {
              
                    this.schedule(function () {
                   
                        var Bullet = cc.instantiate(this.BulletBoss);
                        // Here `this` is referring to the component
                        this.schedule(this.spawnBullet, 2, cc.macro.REPEAT_FOREVER, 3.0);
                        Bullet.setPosition(this.node.position.x, this.node.position.y);
                        this.node.parent.addChild(Bullet);
                    }, 3, cc.macro.REPEAT_FOREVER, 1);
                
                }
            }
            catch (error) {
                console.log("loi");
                
            }
            try {
                
           
            if (window.matchMedia("(orientation: landscape)").matches) { 
                var Bullet = cc.instantiate(this.BulletBoss);
                Bullet.setPosition(this.node.position.x=30, this.node.position.y-200);
                this.node.parent.parent.addChild(Bullet);
                this.schedule(this.spawnBullet, 2, cc.macro.REPEAT_FOREVER, 3.0);
            }
        } catch (error) {
             console.log("loi");
                
        }
        }
 
    }
    onCollisionEnter(otherCollider, selfCollider) {
        this.redDes.getComponent(cc.Animation).play('shakeCamera');
        var hit = cc.instantiate(this.hitDame);
        hit.setPosition(otherCollider.node.position);
        this.node.parent.addChild(hit)
        //cc.audioEngine.playEffect(this.ExpolosionBoss, false);
        otherCollider.node.destroy();
        if (selfCollider.name=="boss_worldcup_bullet_4<BoxCollider>") {
            this.redDes.getComponent(cc.Animation).play('shakeCamera'); 
            this.redDis.active = true;
            this.redDis.getComponent(cc.Animation).play('effectRed');
        }
        if (selfCollider.name == "Boss<PolygonCollider>") {
            if (this.enemyNumber <= 2) {
                this.BossHp--;
                this.shieldHp--;
                if (this.shieldHp == 40) {
                     var action = cc.fadeOut(1.5);
                    this.node.getChildByName('Giap1').destroy()
                    this.node.getChildByName('Giap2').destroy();
                }
                if (this.BossHp == 0) {
                    this.bossClear = true;
                    var explosion = cc.instantiate(this.expolosionNode);
                    explosion.setPosition(selfCollider.node.position);
                    cc.audioEngine.playEffect(this.ExpolosionBoss, false);
                    this.node.parent.addChild(explosion)
                    this.node.destroy();
                    if (this.enemyNumber <= 2) {
                        if (window.matchMedia("(orientation: portrait)").matches) {
                            var move = cc.moveTo(1, 10, 277)
                            this.Boss.runAction(move);
                            this.node.parent.parent.getComponent('GameController').delay();
                            this.node.parent.parent.getChildByName('Ship').getComponent('Ship').stopGame();
                        }               
                        if (window.matchMedia("(orientation: landscape)").matches) { 
                            var move = cc.moveTo(1, 8, 100)
                            this.Boss.runAction(move);
                            this.node.parent.parent.getComponent('GameController').delay();
                            this.node.parent.parent.getChildByName('Ship').getComponent('Ship').stopGame();
                        }
                      
                  
                    }
                }
          
            }
       
        } }

    openStore() {        
            this.node.parent.parent.on(cc.Node.EventType.TOUCH_START, this.clickPopup);
            this.node.parent.parent.on(cc.Node.EventType.TOUCH_MOVE, this.clickPopup);          
    }
    opendelay() {
        this.schedule(this.openStore, 2);
    }
    
    clickPopup() {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
              cc.sys.openURL("https://play.google.com/store/apps/details?id=com.alien.shooter.galaxy.attack&hl=vi&gl=US");
            } else {
                cc.sys.openURL("https://apps.apple.com/us/app/galaxy-attack-alien-shooter/id1176011642");
            }
    }
    explosionRun(){   
        var explosion =this.node.getPosition();
        var explosionRun = cc.instantiate(this.explosion);
        this.node.parent.addChild(explosionRun);
        explosionRun.setPosition(this.node.position.x,this.node.position.y);
        var animation = explosionRun.getComponent(cc.Animation);
        animation.on('finished',this.onFinished, explosionRun);
    }
    start () {
    }
    update(dt) {
        this.setMove();
     }
}
      