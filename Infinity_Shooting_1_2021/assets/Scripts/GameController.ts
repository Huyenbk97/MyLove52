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
    @property(cc.Node)
    popup: cc.Node = null;
    @property(cc.Node)
    popupopen: cc.Node = null;
    @property(cc.Node)
    text: cc.Node = null;
    @property(cc.Node)
    Boss2: cc.Node = null;
    @property(cc.Node)
    play: cc.Node = null;
    @property(cc.Node)
    Ship: cc.Node = null;
    @property(cc.Node)
    moveHand: cc.Node = null;
    @property
    enemyemty = false
    @property
    bossemty=false
    @property(cc.Node)
    boss2: cc.Node = null;
    @property(cc.Node)
    btg: cc.Node = null;
    @property(cc.Node)
    iconGame: cc.Node = null;
    @property(cc.Node)
    initBulletPosition:cc.Node=null;
    // @property()
    @property(cc.Prefab)
    shipBullet: cc.Node = null;
    @property(cc.Prefab)
    sheild: cc.Node = null;
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
        GameUIcontroller.Instance.showBanner();
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
        // mraid
        // mraid.open("dsds");
        // if (window["Mraid"]) {
        //     mraid = window["Mraid"];
        // }
    }
    // Bossactive() {
    //     this.enemyemty1--
    //     console.log(this.enemyemty1+"enemy1");
        
    //     if (this.enemyemty1==0) {
    //         this.enemyemty=true
    //     }
    //     //console.log(this.enemyNumber);
            
    //     //       
    //         //           this.bgBlack.on(cc.Node.EventType.TOUCH_START, function (event) {
    //         //             if (cc.sys.os == cc.sys.OS_ANDROID) {
    //         //                 cc.sys.openURL("https://play.google.com/store/apps/details?id=com.alien.shooter.galaxy.attack&hl=vi&gl=US");
    //         //              } else {
    //         //                 cc.sys.openURL("https://apps.apple.com/us/app/galaxy-attack-alien-shooter/id1176011642");
    //         //              }
    //         // }, this);
          
    //      }
    // Bossactive1() {
    //     this.bossemty = true;
    // }
    
    
    update() {
        if (this.endGame == true) {

       }
        //console.log(screen.height);
        //console.log(screen.width);
        
        //console.log(this.node.position.x, this.node.position.y);    
        //this.node = cc.find("Canvas/IconGame");
        //this.node.setPosition(239.954, -552.514);
        if (window.matchMedia("(orientation: portrait)").matches) { 
            if (screen.width==375) {
                // this.iconGame.setPosition(230,-550.508)
                // //     this.node.setScale(1.9, 1.9);
                this.iconGame.setScale(0.8, 0.8);
                //console.log("chay dc");
                // this.play.setPosition(12.073,-548.461)
                // //     this.node.setScale(1.9, 1.9);
                 this.play.setScale(0.8, 0.8);
                //this.node = cc.find("Canvas/TEXT");
                //     this.node.setScale(1.9, 1.9);
                this.text.setScale(0.8, 0.8);
                this.text.setPosition(8.234, -55.209)
             
            }
            else {
                this.Boss2.setScale(0.9,0.9)
            //     this.iconGame.setPosition(269.82,-550.508)
             
                 this.iconGame.setScale(1, 1); 
                // this.play.setPosition(12.073,-548.461)
                
                 this.play.setScale(0.9, 0.9);
                //this.node = cc.find("Canvas/TEXT");
                //     this.node.setScale(1.9, 1.9);
                this.text.setScale(1, 1);
                this.text.setPosition(8.234, -55.209)
            }
            this.node = cc.find("Canvas/resize");
        //     this.node.setScale(1.9, 1.9);
            this.node.setScale(1, 1);
            this.Ship.setScale(0.6,0.6)
         
            if (this.setPositionDoc==false) {
                this.Ship.setPosition(16, -382.86);
                this.setPositionNgang = false;
                this.setPositionDoc = true;              
            }        
        }
        if (window.matchMedia("(orientation: landscape)").matches) { 
            this.node = cc.find("Canvas/resize");
            //     this.node.setScale(1.9, 1.9);
            this.node.setScale(0.4, 0.4);
            this.node.setPosition(21,-10)
            //this.node = cc.find("Canvas/PlayNow");
            this.play.setPosition(-236.899,-148.714)
            //     this.node.setScale(1.9, 1.9);
            this.play.setScale(0.4, 0.4);
            //this.node = cc.find("Canvas/IconGame");
            this.iconGame.setPosition(239,-134)
            //     this.node.setScale(1.9, 1.9);
            this.iconGame.setScale(0.4, 0.4);
            this.text.setScale(0.5, 0.5);
            this.text.setPosition(8.234, -10)
            //this.node = cc.find("Canvas/Ship");
            //     this.node.setScale(1.9, 1.9);
            this.Ship.setScale(0.3, 0.3);
            //console.log(this.node.getPosition());
            this.Boss2.setScale(0.4,0.4)
            if (this.setPositionNgang==false) {
                //this.node = cc.find("Canvas/Ship")
                this.Ship.setPosition(8.808,-144.453)
                this.setPositionNgang = true;
                //this.Ship.setPosition(10.003, -120)
                this.setPositionDoc = false;
                //console.log("ngang");
                
            }
           
        }
        //   console.log("màn hình dọc");
        //   //this.node = cc.find("Canvas/playfreebutton");
        // //
        // //console.log(this.node); 
        // this.node = cc.find("Canvas/playfreebutton");
        // console.log(this.node.getPosition().x);
        
        // if (this.node.getPosition().x!= 25) {
        //    this.node = cc.find("Canvas/Ship");
        //     this.node.setScale(1.9, 1.9);
        //     this.node.setPosition(cc.v2(25, -752));
        //     console.log("set lai vi tri");
            
        // }
        // this.node = cc.find("Canvas/playfreebutton");
        //     this.node.setPosition(cc.v2(25, -1000.165));
        //     this.node.setScale(1.3, 1.3);
        //    this.node = cc.find("Canvas/IconGame");
        //     this.node.setPosition(cc.v2(520.65, -980.046));
        //     this.node.setScale(1.2, 1.2);
         
           
        //     if (this.image.active==true) {      
        //         this.image.setPosition(cc.v2(28, -587));
        //     } 
        //     this.node = cc.find("Canvas/Node3");
        //     this.node.setScale(1.1, 1.1);
        //     this.node = cc.find("Canvas/enemy2");
        //     this.node.setScale(0,0);
        //     this.node = cc.find("Canvas/enemy3");
        //     this.node.setScale(0.45,0.45);
        //  }
         
        //  if (window.matchMedia("(orientation: landscape)").matches) {
        //     console.log("màn hình ngang");
        //     //this.node = cc.find("Canvas/Ship");
        //     //this.node.setPosition(cc.v2(0,0));
        //      this.node = cc.find("Canvas/playfreebutton");
        //      console.log(this.node.getPosition().x);
             
        //      if (this.node.getPosition().x!= -485.972) {
        //         this.node = cc.find("Canvas/Ship");
        //          this.node.setScale(1.3, 1.3);
        //          this.node.setPosition(cc.v2(35.129, -193.457));
        //          console.log("set lai vi tri");
                 
        //      }
        //     //  if () {
        //     //      console.log("duoc duoc");
                 
        //     //  }
        //      this.node = cc.find("Canvas/playfreebutton");
        //      this.node.setPosition(cc.v2(-485.972, -270.216));
        //      this.node.setScale(0.9, 0.9);
        //      this.node = cc.find("Canvas/IconGame");
        //      this.node.setPosition(cc.v2(547.187, -250));
        //      this.node.setScale(0.7, 0.7);
             
        //      this.node = cc.find("Canvas/playfreebutton");
        //      console.log(this.node.getPosition());
        //      //this.node = cc.find("Canvas/image");
        //      if (this.image.active==true) {          
        //          this.image.setPosition(cc.v2(25, -71));
        //      }                     
        //      this.node = cc.find("Canvas/popup");
        //      this.node.setPosition(cc.v2(11,14));
        //      this.node = cc.find("popup");
        //      //this.node.setPosition(cc.v2(11, 14));
        //      //this.node.setScale(1, 1);
        //         // this.node = cc.find("Canvas/Ship");
        //         // this.node.setPosition(cc.v2(27.404, -174.857));
        //         // this.node.setScale(1.3, 1.3);  
        //         // this.node = cc.find("Canvas/Ship");
        //         // this.node.setPosition(cc.v2(27.404, -817.038));
        //         // this.node.setScale(1.3, 1.3);       
        //  }
    }

    
}
