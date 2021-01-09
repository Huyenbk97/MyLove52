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

    @property(cc.Node)
    Ship: cc.Node = null;   
    @property
    BulletSpeed:number =10;
     timeToLive=700;
     timeAlive=0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    onCollisionEnter(other, self) {
        if (other.name == "Ship<BoxCollider>" && self.name == "SHield<BoxCollider>") { 
            self.node.destroy();
        }
    }
    start () {

    }
    update(dt) {
        if (window.matchMedia("(orientation: portrait)").matches) {
            var shieldMove = cc.moveTo(3, this.node.parent.getChildByName('Ship').position.x, this.node.parent.getChildByName('Ship').position.y); 
            this.node.runAction(shieldMove);
            this.node.setScale(1, 1);
        }
        if (window.matchMedia("(orientation:landscape)").matches) {
            var shieldMove = cc.moveTo(7, this.node.parent.getChildByName('Ship').position.x, this.node.parent.getChildByName('Ship').position.y);  
            this.node.runAction(shieldMove);
            this.node.setScale(0.4, 0.4); 
    }

       }
}
