import { Util } from "../../util"

const {ccclass, property} = cc._decorator

@ccclass
export default class MoveEnemy extends cc.Component {
    @property(cc.Node)
    Canvas: cc.Node = null;
    @property
    checkTouch: boolean = false;
    @property(cc.Node)
    Ship: cc.Node = null;
    /** Phuong thuc chuyen dong ngau nhien huog toc do  */
    dir: cc.Vec2 = new cc.Vec2(0, 0)
    speed: number = 200
    onLoad() {
        this.Ship.on(cc.Node.EventType.TOUCH_MOVE, function (event) { 
            this.schedule(this.randomDir, 5, cc.macro.REPEAT_FOREVER, 1);
      
        }, this);
    }
    start(): void {
        if (window.matchMedia("(orientation: portrait)").matches) {
            this.node.setPosition(cc.v2(this.Canvas.width * 0.042, this.Canvas.height / 2 * 5 / 8));
        }
        if (window.matchMedia("(orientation: landscape)").matches) {
            this.node.setPosition(cc.v2(this.Canvas.width * 26 / 1080, this.Canvas.height / 2 * 250 / 1920));
   
        }


        
      }
    runBoss() {
     if (this.checkTouch==true) {
         
     }
 }
    randomDir (): void {
        let dir = Util.randomDir(50, 360)
        this.dir.x = dir.x
        this.dir.y = dir.y
    }

    update(dt: number): void {
        console.log(this.checkTouch);
        if (window.matchMedia("(orientation: portrait)").matches) {
            this.speed=180
            if (this.dir.x !== 0) {
                this.node.x += this.speed * this.dir.x * dt
            }
            if (this.dir.y !== 0) {
                this.node.y += this.speed * this.dir.y * dt
            }
        }
        if (window.matchMedia("(orientation: landscape)").matches) { 
            this.speed=100
            if (this.dir.x !== 0) {
                this.node.x += this.speed * this.dir.x * dt
            }
            if (this.dir.y !== 0) {
                this.node.y += this.speed * this.dir.y * dt
            }
        }
        // 边界回弹
        if (window.matchMedia("(orientation: portrait)").matches) {
            if (this.node.x < -327.872) this.dir.x = this.dir.x > 0 ? this.dir.x : -this.dir.x
            if (this.node.x > 300) this.dir.x = this.dir.x < 0 ? this.dir.x : -this.dir.x
            if (this.node.y > 580) this.dir.y = this.dir.y < 0 ? this.dir.y : -this.dir.y
            if (this.node.y < 400) this.dir.y = this.dir.y > 0 ? this.dir.y : -this.dir.y
        }
        if (window.matchMedia("(orientation: landscape)").matches) {
            if (this.node.x < -250) this.dir.x = this.dir.x > 0 ? this.dir.x : -this.dir.x
            if (this.node.x > 250) this.dir.x = this.dir.x < 0 ? this.dir.x : -this.dir.x
            if (this.node.y > 262) this.dir.y = this.dir.y < 0 ? this.dir.y : -this.dir.y
            if (this.node.y < 50) this.dir.y = this.dir.y > 0 ? this.dir.y : -this.dir.y
         }
    }

}
