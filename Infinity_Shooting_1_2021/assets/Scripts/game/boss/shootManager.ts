import BulletFactory, { BulletType } from "../bullet/bulletFactory"
import { Util } from "../../util"

const {ccclass, property} = cc._decorator

@ccclass
export default class ShootManager extends cc.Component {

    @property({
        type: BulletFactory
    })
    bulletFactory: BulletFactory | undefined = undefined;
    @property
    time: number = 1;
    @property
    screenOld: number = null;
    @property(cc.Node)
    Ship: cc.Node = null;
    @property
    touchShip: boolean = false;
    @property(cc.Node)
    enemy: cc.Node = null;
    typeMBulletAngle: number = 0
    onLoad() {
        this.screenOld = screen.width;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.Ship.on(cc.Node.EventType.TOUCH_MOVE, function (event) { 
         this.time+=1
        }, this);
        // if (window.matchMedia("(orientation: portrait)").matches) {
        //     if (this.time == 2) {
        //         this.schedule(function () {
        //             // Here `this` is referring to the component
        //             this.shoot(BulletType.M)
        //         }, 0.03,50, 0.01);
        //         // this.schedule(function () {
        //         //     // Here `this` is referring to the component
        //         //     this.shoot(BulletType.F)
        //         // }, 1, 3, 5);
        //         this.schedule(function () {
        //             // Here `this` is referring to the component
        //             this.shoot(BulletType.B)
        //         }, 0.5, 10, 7);
        //         // this.schedule(function () {
        //         //     // Here `this` is referring to the component
        //         //     this.shoot(BulletType.R)
        //         // }, 0.02, 10, 10);
       
        //     }
        // }
        if (window.matchMedia("(orientation: landscape)").matches) { 
            if (this.time == 2) {
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.shoot(BulletType.M1)
                }, 0.05, 100, 2);
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.shoot(BulletType.F1)
                }, 0.5, 20, 5);
                // this.schedule(function () {
                //     // Here `this` is referring to the component
                //     this.shoot(BulletType.B1)
                // }, 1, 10, 7);
                // this.schedule(function () {
                //     // Here `this` is referring to the component
                //     this.shoot(BulletType.R1)
                // }, 0.02, 10, 10);
       
            }
        }
 
    }    
    onCollisionEnter(otherCollider, selfCollider) { 
 
    }     
    start (): void {
        let deltaTime: number = 5
        let startTime: number = 1
          //this.schedule(() => this.shoot(BulletType.R), 0.02, cc.macro.REPEAT_FOREVER, startTime)
            //this.schedule(() => this.shoot(BulletType.M), 0.06, cc.macro.ONE, startTime + 1 * deltaTime)
        // this.schedule(() => this.shoot(BulletType.F), 0.4, cc.macro.REPEAT_FOREVER, startTime + 2 * deltaTime)
        // //this.schedule(() => this.shoot(BulletType.R), 0.02, cc.macro.REPEAT_FOREVER, startTime + 3 * deltaTime)
        // this.schedule(() => this.shoot(BulletType.B), 0.5, cc.macro.REPEAT_FOREVER, startTime + 4 * deltaTime)
        // this.schedule(() => this.shoot(BulletType.M), 0.06, cc.macro.REPEAT_FOREVER, startTime + 5 * deltaTime)
        // //this.schedule(() => this.shoot(BulletType.R), 0.02, cc.macro.REPEAT_FOREVER, startTime + 6 * deltaTime)
        // this.schedule(() => this.shoot(BulletType.F), 0.4, cc.macro.REPEAT_FOREVER, startTime + 7 * deltaTime)
    }

    /** 简单射击工厂 */
    shoot(type: BulletType): void {
        if (window.matchMedia("(orientation: portrait)").matches) {
            try {
                if (type === BulletType.R) {
                    //đạn ngẫu nhiên
                    this.time += 1;
                    let bullet: cc.Node = this.bulletFactory.createBullet(BulletType.R, Util.randomDir(0, 360), 800)
                    bullet.setPosition(this.enemy.getPosition().x, this.enemy.getPosition().y);
                } else if (type === BulletType.M) {
                    // loiaj xoay tròn đạn
                    this.typeMBulletAngle += 20
                    if (this.typeMBulletAngle >= 360) {
                        this.typeMBulletAngle = 0
                    }
                    let rad = cc.misc.degreesToRadians(this.typeMBulletAngle)
                    let bullet: cc.Node = this.bulletFactory.createBullet(BulletType.M, cc.v2(Math.cos(rad), Math.sin(rad)), 650)
                    bullet.angle = this.typeMBulletAngle + 90
                    bullet.setPosition(this.enemy.x, this.enemy.y)
                } else if (type === BulletType.F) {
              
                    // Loại hoa 
                    for (let i = 0; i <= 360; i += 20) {
                        let rad = cc.misc.degreesToRadians(i)
                        let bullet: cc.Node = this.bulletFactory.createBullet(BulletType.F, cc.v2(Math.cos(rad), Math.sin(rad)), 600)
                        bullet.setPosition(this.enemy.x, this.enemy.y)
                    }
                } else if (type === BulletType.B) {
                    // duang～ 型
                    let bullet: cc.Node = this.bulletFactory.createBullet(BulletType.B, cc.v2(0, -1), 550)
                    bullet.setPosition(this.enemy.x, this.enemy.y)
                }
            } catch (error) {
            
            }
        }
        if (window.matchMedia("(orientation: landscape)").matches) { 
            try {
                if (type === BulletType.R1) {
                    //đạn ngẫu nhiên
                    this.time += 1;
                    let bullet: cc.Node = this.bulletFactory.createBullet(BulletType.R1, Util.randomDir(0, 360), 800)
                    bullet.setPosition(this.enemy.getPosition().x, this.enemy.getPosition().y);
                } else if (type === BulletType.M1) {
                    // loiaj xoay tròn đạn
                    this.typeMBulletAngle += 20
                    if (this.typeMBulletAngle >= 360) {
                        this.typeMBulletAngle = 0
                    }
                    let rad = cc.misc.degreesToRadians(this.typeMBulletAngle)
                    let bullet: cc.Node = this.bulletFactory.createBullet(BulletType.M1, cc.v2(Math.cos(rad), Math.sin(rad)), 250)
                    bullet.angle = this.typeMBulletAngle + 90
                    bullet.setPosition(this.enemy.x, this.enemy.y)
                } else if (type === BulletType.F1) {
              
                    // Loại hoa 
                    for (let i = 0; i <= 360; i += 20) {
                        let rad = cc.misc.degreesToRadians(i)
                        let bullet: cc.Node = this.bulletFactory.createBullet(BulletType.F1, cc.v2(Math.cos(rad), Math.sin(rad)), 210)
                        bullet.setPosition(this.enemy.x, this.enemy.y)
                    }
                } else if (type === BulletType.B1) {
                    // duang～ 型
                    let bullet: cc.Node = this.bulletFactory.createBullet(BulletType.B1, cc.v2(0, -1), 200)
                    bullet.setPosition(this.enemy.x, this.enemy.y)
                }
            } catch (error) {
            
            }
        }
    
    }
    update() {  
            if (this.time == 2) {
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.shoot(BulletType.M)
                }, 0.03, 100, 0.5);
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.shoot(BulletType.F)
                }, 1, 10, 4);
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.shoot(BulletType.B)
                }, 0.5, 10, 7);
                this.schedule(function () {
                    this.shoot(BulletType.R)
                }, 0.02, 10, 10);
            }
            if (this.time == 2) {

                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.shoot(BulletType.M1)
                }, 0.03, 100, 0.5);
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.shoot(BulletType.F1)
                }, 1, 10, 4);
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.shoot(BulletType.B1)
                }, 0.5, 10, 7);
                this.schedule(function () {
                    // Here `this` is referring to the component
                    this.shoot(BulletType.R1)
                }, 0.02, 10, 10);
       
            }
    

    }
}
