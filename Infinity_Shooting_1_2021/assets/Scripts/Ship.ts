import bullet from "./Bullet";
import GameUIcontroller from "./GameUIcontroller";
const {ccclass, property} = cc._decorator;
@ccclass
export default class Ship extends cc.Component {
    static Instance: Ship = null;
    // @property(cc.Node)
    // initBulletPosition: cc.Node = null;
    // @property(cc.Node)
    // initBulletPosition1: cc.Node = null;
    @property(cc.Node)
    ship: cc.Node = null;
    @property(cc.Node)
    popup: cc.Node = null;
    @property(cc.Node)
    Canvas: cc.Node = null;
    @property(cc.Node)
    text: cc.Node = null;
    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    bgblack: cc.Node = null;
    @property(cc.Prefab)
    shield: cc.Prefab = null;
    
    @property(cc.Node)
    bulletPo: cc.Node = null;
    @property(cc.Node)
    redDis: cc.Node = null;
    // @property()
    @property(cc.Prefab)
    shipBullet: cc.Node = null;
    @property
    bulletPool: number = 0;
    @property
    game: number = 0;
    @property
    bullet1: number = 1;
    @property(cc.Animation)
    redDisplay: cc.AnimationClip = null;
    @property
    bullet2: boolean = false;
    @property(cc.Prefab)
    shipBullet1: cc.Node = null;
    @property(cc.Prefab)
    shipBullet2: cc.Node = null;
    @property(cc.Prefab)
    shipBullet3: cc.Node = null;
    @property(cc.Prefab)
    shipBullet4: cc.Node = null;
    @property(cc.Prefab)
    shipBullet5: cc.Node = null;
    @property(cc.Prefab)
    shipBullet6: cc.Node = null;
    @property(cc.Prefab)
    @property
    rotation: number = 0;
    @property(cc.Prefab)
    shipBullet7: cc.Node = null;
    @property(cc.Prefab)
    shipBullet8: cc.Node = null;
    @property(cc.Node)
    redD: cc.Node = null;
    @property
    endGame: boolean = true;
    @property({
        type: cc.AudioClip
    })
    shoot: null;
  
    @property({
        type: cc.AudioClip
    })
    backgroundSound = null;
    @property(cc.Prefab)
    BulletSkill2: cc.Prefab = null;
    @property(cc.Node)
    bulletParent: cc.Node = null;
    fireRate: number = 1;
    isGamestart: boolean = false;
    @property
    activeBullet: boolean = true;
    @property
    stopGame: boolean = false;
    positionXY(event) {
    }
    onLoad() {
        Ship.Instance = this;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
         this.ship.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.schedule(this.createBullet, 0.15, cc.macro.REPEAT_FOREVER);
          }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.schedule(this.createBullet, 0.1, cc.macro.REPEAT_FOREVER);
      
        }, this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this._ontouchmove, this)
            this.node.on(cc.Node.EventType.TOUCH_START, this._ontouchmove, this)

    }

    _ontouchmove(TouchEvent) {
            let delta = TouchEvent.getDelta();
     
            this.node.position = delta.add(this.node.position);
    }
    start() {
    
    }
    SpawnBullet() {
     }
    spawShield1() {
        this.bullet1 += 1
       
    }
    createBullet() {
        if (window.matchMedia("(orientation: portrait)").matches&&this.stopGame==false) {
            var Bullet = cc.instantiate(this.shipBullet1);
            Bullet.setPosition(this.node.position.x + 40, this.node.position.y + this.node.height / 2 - 30);
            this.node.parent.addChild(Bullet);
            var Bullet = cc.instantiate(this.shipBullet1);
            Bullet.setPosition(this.node.position.x + 20, this.node.position.y + this.node.height / 2 - 20);
            this.node.parent.addChild(Bullet);
            var Bullet = cc.instantiate(this.shipBullet1);
            Bullet.setPosition(this.node.position.x, this.node.position.y + this.node.height / 2 - 10);
            this.node.parent.addChild(Bullet);
            var Bullet = cc.instantiate(this.shipBullet1);
            Bullet.setPosition(this.node.position.x - 20, this.node.position.y + this.node.height / 2 - 20);
            this.node.parent.addChild(Bullet);
            var Bullet = cc.instantiate(this.shipBullet1);
            Bullet.setPosition(this.node.position.x - 40, this.node.position.y + this.node.height / 2 - 30);
            this.node.parent.addChild(Bullet);
            cc.audioEngine.setVolume(this.shoot, 0.5);
        }
        if (window.matchMedia("(orientation: landscape)").matches&&this.stopGame==false) {
            var Bullet = cc.instantiate(this.shipBullet2);
            Bullet.setPosition(this.node.position.x + 40, this.node.position.y  + 10);
            this.node.parent.addChild(Bullet);
            var Bullet = cc.instantiate(this.shipBullet2);
            Bullet.setPosition(this.node.position.x + 20, this.node.position.y  + 20);
            this.node.parent.addChild(Bullet);
            var Bullet = cc.instantiate(this.shipBullet2);
            Bullet.setPosition(this.node.position.x, this.node.position.y+30  );
            this.node.parent.addChild(Bullet);
            var Bullet = cc.instantiate(this.shipBullet2);
            Bullet.setPosition(this.node.position.x - 20, this.node.position.y + 20);
            this.node.parent.addChild(Bullet);
            var Bullet = cc.instantiate(this.shipBullet2);
            Bullet.setPosition(this.node.position.x - 40, this.node.position.y  + 10);
            this.node.parent.addChild(Bullet);
            cc.audioEngine.setVolume(this.shoot, 0.5);
         }
         } 
       onKill() {
    }
    InitBullet() {
    }
    startShotting() {
 
        this.schedule(this.createBullet, 0.18, cc.macro.REPEAT_FOREVER, 0);
    }
    pauseGame() {
        this.stopGame = true;
    }
    shotting() {
        this.InitBullet();
    }
    update(dt) {
   
        this.Canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.text.active = true;
            this.hand.active = true;
        }, this);
        this.Canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.text.active = false;
            this.hand.active = false;
        }, this);
        this.ship.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.text.active = true;
            this.hand.active = true;
            //  if (this.stop==true) {
            //     this.text.active = true;
            //     this.bgblack.active = true;
            //     this.hand.active = true;
            //     this.icon.active = true;
            //     this.playButton.active=true
                 
            // }
        }, this);
        this.ship.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.hand.text = false;
            this.hand.active = false;
            //  if (this.stop==true) {
            //     this.text.active = true;
            //     this.bgblack.active = true;
            //     this.hand.active = true;
            //     this.icon.active = true;
            //     this.playButton.active=true
                 
            // }
        }, this);
        this.ship.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.text.active = false;
            this.hand.active = false;
            //  if (this.stop==true) {
            //     this.text.active = true;
            //     this.bgblack.active = true;
            //     this.hand.active = true;
            //     this.icon.active = true;
            //     this.playButton.active=true
                 
            // }
        }, this);
    }
}