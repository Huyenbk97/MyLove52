// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    Cavas: Node = null;
    @property
    bulletTime: number = 100;
    @property
    BulletSpeed:number =1000;
    @property
    radianNumber: number = 75;
    // LIFE-CYCLE CALLBACKS:
    @property
    rotation: number = 0;
    // onLoad () {}
    start () {

    }
   update(dt) {
       
       if (window.matchMedia("(orientation: portrait)").matches) {
           this.node.setRotation(this.rotation);
           this.node.setScale(1.4, 1.4);
           for (let radianNumber=90; radianNumber <100; radianNumber++) {
            let radian = this.radianNumber / 360 * 2 * Math.PI;
            this.bulletTime -= 3.5;
            this.node.setPosition(this.node.position.x += Math.cos(radian) * dt * this.BulletSpeed, this.node.position.y += Math.sin(radian) * this.BulletSpeed * dt);
            if (this.bulletTime == 0) {
                this.node.destroy();
                //this.node.position.y = this.node.position.y + 5;
            }
               if (this.radianNumber==100) {
                   this.radianNumber = 90;
               }
           }
   
       }
       if (window.matchMedia("(orientation: landscape)").matches) { 
        this.node.setRotation(this.rotation);
           this.node.setScale(0.8,0.8);
        let radian = this.radianNumber / 360 * 2 * Math.PI;
        this.bulletTime -= 3.5;
        this.node.setPosition(this.node.position.x += Math.cos(radian) * dt * this.BulletSpeed, this.node.position.y += Math.sin(radian) * this.BulletSpeed * dt);
        if (this.bulletTime == 0) {
            this.node.destroy();
            //this.node.position.y = this.node.position.y + 5;
        }
       }
       }
    // update (dt) {}
}
