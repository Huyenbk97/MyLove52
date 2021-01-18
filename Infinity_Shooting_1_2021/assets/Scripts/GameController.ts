import GameUIcontroller from "./GameUIcontroller";
import Test from "./Test";

const { ccclass, property } = cc._decorator;
@ccclass
export default class GameController extends cc.Component {
    static Instance: GameController = null;
    @property
    numOfEnemy: number =47;
    // @property(cc.Prefab)
    // bossPrefab: cc.Prefab = null;
    // @property(cc.Node)
    // revicePopup:cc.Node=null;
    // @property(cc.Prefab)
    // enemy1: cc.Prefab = null;
    // @property(cc.Prefab)
    // enemy2: cc.Prefab = null;
    // numberOfBoss:number= 1;
   
  
    @property
    sheildNumber: number = 0;
    @property
    wight: number = 0;
    @property
    height: number = 0;
    @property
    wightBf: number = 0;
    @property
    heightBf: number = 0;
    @property
    enemyemty1: number = 9;
    @property
    setPositionDoc: boolean = true;
    @property
    endGame: boolean = false;
    @property
    setPositionNgang: boolean =true;
    @property({
        type:cc.AudioClip
      })
    Victory = null;
    @property({
        type:cc.AudioClip
      })
     backgroundSound =null;
    onLoad() {
        this.wight = screen.width;
        this.height = screen.height;
        var manager= cc.director.getCollisionManager();
        manager.enabled = true;
        
    }
    start() {
    }

    setTouch() {
        this.Ship.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var pos_ship = this.Ship.getPosition()
            var pos_move = event.getDelta();
            //console.log(pos_move);
             
            this.Ship.setPosition(cc.v2(pos_ship.x+pos_move.x,pos_move.y+pos_ship.y))
        }, this);
    }
    delay() {
        //console.log(this.node.parent.name);
        this.scheduleOnce(this.clickPopup, 5);
        this.endGame = true;
        this.scheduleOnce(this.Touch,2)
        
    }
    Touch() {
        this.popup.on(cc.Node.EventType.TOUCH_MOVE, function (event) { this.clickPopup() }, this);
        this.popup.on(cc.Node.EventType.TOUCH_START, function (event) { this.clickPopup() }, this);
    }
    decreaseEnemy() {
        //console.log("chay duoc decrease");
        this.numOfEnemy-=1;
        //console.log(this.numOfEnemy);
        if (this.numOfEnemy == 0) {
            //console.log("quai bi tieu diet het");
            //this.initBoss();
            // var moveRight= cc.rotateBy(0.5, 90);
        //    this.testNode.runAction(moveRight);
        //    console.log(this.testNode.name);
            this.showPopup();
        }
    }
    // spawnShips() {
    //     var ships = [this.enemy1, this.enemy2];
    //     var random = Math.floor(Math.random() * ships.length);
    //     var newShip = cc.instantiate(ships[random]);
    //     var randomX = [-84, 1371]
    //     var randX = Math.floor(Math.random() * randomX.length);
    //     newShip.setPosition(randX,(this.node.position.y*2)+(newShip.getContentSize().height*2));
    //     this.node.addChild(newShip);   
    // }
    InitBullet(){
        var bullet = cc.instantiate(this.shipBullet);
        //bullet.setPosition(this.initBulletPosition.position);
        //this.node.parent.addChild(bullet);
        //
        var pos = this.initBulletPosition.getPosition();
        bullet.setPosition(cc.v2(pos.x,pos.y+this.initBulletPosition.height/2))
        //cc.audioEngine.playEffect(this.shoot, false);
        bullet.parent = this.initBulletPosition;

    }   

    spawShield(x,y) {
        this.sheildNumber++
        if (this.sheildNumber<=2) {
            var shield = cc.instantiate(this.sheild)
            shield.setPosition(x,y);
            this.node.parent.addChild(shield); 
        }
        
    }
    showPopup() {
        cc.audioEngine.playEffect(this.Victory,false);  
        var action = cc.moveBy(0.5, 0, 1000);
        var seq = cc.sequence(cc.moveBy(0.5, 0, 1000), cc.hide());
        this.Ship.runAction(seq);
        //GameUIcontroller.Instance.showBanner();
        this.Cavas();
    }
    Cavas() {
        
        var isTouchDevice =
        (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
        if(!isTouchDevice){
            this.clickPopup();
    }
    }
    clickPopup() {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
               cc.sys.openURL("https://play.google.com/store/apps/details?id=com.alien.shooter.galaxy.attack&hl=vi&gl=US");
            } else {
                cc.sys.openURL("https://apps.apple.com/us/app/galaxy-attack-alien-shooter/id1176011642");
            }
    }
    


    
}
