// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    @property
    BulletSpeed: number = 500;
    start () {

    }

    update(dt) {
       
        if (window.matchMedia("(orientation: landscape)").matches) { 
            this.node.setScale(0.4, 0.4)
            this.BulletSpeed = 300
            this.node.setPosition(this.node.position.x, this.node.position.y -= this.BulletSpeed * dt);
        }
           
        if (window.matchMedia("(orientation: portrait)").matches) { 
            this.node.setScale(1, 1)
            this.BulletSpeed = 500
            this.node.setPosition(this.node.position.x, this.node.position.y -= this.BulletSpeed * dt);
        }
    }
}
