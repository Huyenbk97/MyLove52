const {ccclass, property} = cc._decorator;
@ccclass
export default class Boss extends cc.Component {
    static Instance: Boss = null;
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
    playAnimation: boolean = true;
    @property(cc.Prefab)
    explosion: cc.Node = null;
    @property(cc.Node)
    Ship: cc.Node = null;
    @property(cc.Node)
    text: cc.Node = null;
    @property(cc.Prefab)
    explosion1: cc.Node = null;
    @property(cc.Node)
    textHand: cc.Node = null; 
    @property({
        type:cc.AudioClip
    })
    Boss_explosion = null;
    onLoad() {

        Boss.Instance = this;
        //this.node = cc.find("Canvas/ShipHero");
                    
            this.progress = 1;
            this.hp.fillRange = this.progress;
            this.Ship.on(cc.Node.EventType.TOUCH_START, function (event) {
                this.gameStar = true
                this.text.active = false;
                this.game += 1
                if (this.game==1) {
                    var manager = cc.director.getCollisionManager();
                    manager.enabled = true;
                    this.moveEnemy = this.setMove();
                    this.node.runAction(this.moveEnemy);
                       this.schedule(this.spawnBullet, this.ShootFrequency, cc.macro.REPEAT_FOREVER, 2.0);
                   
                }
            }, this);
            this.Ship.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                this.gameStar = true
                this.gameStar = true
                this.game+=1
                this.text.active = false;
                if (this.game==1) {
                    var manager = cc.director.getCollisionManager();
                    manager.enabled = true;
                    this.moveEnemy = this.setMove();
                    this.node.runAction(this.moveEnemy);
                       this.schedule(this.spawnBullet, this.ShootFrequency, cc.macro.REPEAT_FOREVER, 2.0);
                   
                }
               }, this);
      
           
    }
    open() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.moveEnemy = this.setMove();
        this.node.runAction(this.moveEnemy);
        this.schedule(this.spawnBullet, this.ShootFrequency, cc.macro.REPEAT_FOREVER, 3.0);  
    }
    setMove() {
        if (window.matchMedia("(orientation: portrait)").matches) {
            var moveLeft = cc.moveTo(this.duration, cc.v2(-193.894, 620.445));
            var moveRight = cc.moveTo(this.duration, cc.v2(190.69, 620.445));
            return cc.repeatForever(cc.sequence(moveLeft, moveRight));
        }
        if (window.matchMedia("(orientation: landscape)").matches) {
            var moveLeft = cc.moveTo(this.duration, cc.v2(-146.539, 200));
            var moveRight = cc.moveTo(this.duration, cc.v2(146.539, 200));
            return cc.repeatForever(cc.sequence(moveLeft, moveRight));
         }
    }
    spawnBullet() {
        if (window.matchMedia("(orientation: portrait)").matches) {
            var Bullet = cc.instantiate(this.BulletBoss);
    
            Bullet.setPosition(this.node.position.x - 130, this.node.position.y);
            this.node.parent.addChild(Bullet);
            var Bullet = cc.instantiate(this.BulletBoss);
            Bullet.setPosition(this.node.position.x + 130, this.node.position.y);
            this.node.parent.addChild(Bullet);
            var Bullet = cc.instantiate(this.BulletBoss);
            Bullet.setPosition(this.node.position.x, this.node.position.y - 230);
            this.node.parent.addChild(Bullet);
        }
        if (window.matchMedia("(orientation: landscape)").matches) { 
            var Bullet = cc.instantiate(this.BulletBoss);
    
            Bullet.setPosition(this.node.position.x - 130, this.node.position.y);
            this.node.parent.addChild(Bullet);
            var Bullet = cc.instantiate(this.BulletBoss);
            Bullet.setPosition(this.node.position.x + 130, this.node.position.y);
            this.node.parent.addChild(Bullet);
            var Bullet = cc.instantiate(this.BulletBoss);
            Bullet.setPosition(this.node.position.x, this.node.position.y - 230);
            this.node.parent.addChild(Bullet);
        }
    }
    onCollisionEnter(otherCollider, seftCollider) {
       if (otherCollider.name=="Bullet33<BoxCollider>"||otherCollider.name=="Bullet2<BoxCollider>"||otherCollider.name=="Bullet33 copy<BoxCollider>"||otherCollider.name=="Bullet33 copy<BoxCollider>") {
           this.enemyLife -= 1;
           this.progress -= 0.004;
           this.hp.fillRange = this.progress;
           //console.log(this.enemyLife);
           
           if (this.progress <= 0) {
           
                // Here `this` is referring to the component
                
           
            //this.node.getComponent(cc.Animation).play();
            //this.node = cc.find("Canvas/Boss");  
            seftCollider.node.destroy();
               cc.audioEngine.playEffect(this.Boss_explosion, false);
               //cc.audioEngine.play(this.shoot, false, 0.2);
               this.explosionRun();
               cc.audioEngine.pauseAll();
               this.clickPopup();
              
         
        }
            otherCollider.node.destroy();
        //    this.node = otherCollider.node;
        //    var explosion =this.node.getPosition();
        //    // console.log(explosion);
        //    var explosionRun = cc.instantiate(this.explosion1);
        //   this.node.parent.addChild(explosionRun);
        //    explosionRun.setPosition(this.node.position.x,this.node.position.y);
        //    var animation =explosionRun.getComponent(cc.Animation);
        //    animation.on('finished',this.onFinished, explosionRun);
       
        }
        if (otherCollider.name=="ship<PolygonCollider>") {
              
        }

    }
    clickPopup() {
        
            if (cc.sys.os == cc.sys.OS_ANDROID) {
               mraid.open("https://play.google.com/store/apps/details?id=com.alien.shooter.galaxy.attack&hl=vi&gl=US");
            } else {
                mraid.open("https://apps.apple.com/us/app/galaxy-attack-alien-shooter/id1176011642");
            }
      
    }
    explosionRun(){
    
        var explosion =this.node.getPosition();
        // console.log(explosion);
        var explosionRun = cc.instantiate(this.explosion);
        this.node.parent.addChild(explosionRun);
        explosionRun.setPosition(this.node.position.x,this.node.position.y);
        var animation =explosionRun.getComponent(cc.Animation);
        animation.on('finished',this.onFinished, explosionRun);
    }
    start () {

    }

    update(dt) {
        this.setMove();
        var screen = cc.find("Canvas");
       //console.log(screen.getContentSize().width);
       //console.log(screen.getContentSize().height);
     }
}
      