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
    radian: number = 0;
    
    @property
    BulletSpeed:number =1000;
    @property
    radianNumber: number = 75;
    @property(cc.Prefab)
    expolosion: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    @property
    rotation: number = 0;
    // onLoad () {}
    start () {

    }
    onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    }
    onCollisionEnter(other, self) {

    }
    update(dt) {
        if (window.matchMedia("(orientation: landscape)").matches) {
            this.node.setScale(0.4,0.4)
            this.BulletSpeed = 400;
            this.node.setRotation(this.rotation);
            let radian = this.radianNumber / 360 * 2 * Math.PI;
            this.bulletTime -= 3.5;
            this.node.setPosition(this.node.position.x += Math.cos(radian) * dt * this.BulletSpeed, this.node.position.y += Math.sin(radian) * this.BulletSpeed * dt);
            if (this.bulletTime == 0) {
                this.node.destroy();
                //this.node.position.y = this.node.position.y + 5;
            }
        }
        if (window.matchMedia("(orientation: portrait)").matches) {
            //console.log("Run in function update() time : ", dt);
            this.node.setScale(1, 1);
            dt += dt;
            //console.log(dt);
            
            if (dt<=0.035) {
                this.node.setPosition(this.node.position.x += Math.cos(35/ 360 * 2 * Math.PI) * dt * this.BulletSpeed, this.node.position.y += Math.sin(45/ 360 * 2 * Math.PI) * this.BulletSpeed * dt); 
                
            }
            else if (dt>0.035) {
                this.node.setPosition(this.node.position.x += Math.cos(125/ 360 * 2 * Math.PI) * dt * this.BulletSpeed, this.node.position.y += Math.sin(45/ 360 * 2 * Math.PI) * this.BulletSpeed * dt); 
            }
            // 
            // this.BulletSpeed = 800;
            // this.node.setRotation(this.rotation);
            // let radian = this.radianNumber / 360 * 2 * Math.PI;
            // this.node.setPosition(this.node.position.x += Math.cos(radian) * dt * this.BulletSpeed, this.node.position.y += Math.sin(radian) * this.BulletSpeed * dt);
            if (this.bulletTime == 0) {
                this.node.destroy();
                //this.node.position.y = this.node.position.y + 5;
            }
  
        }
    }
    // update (dt) {}
}
