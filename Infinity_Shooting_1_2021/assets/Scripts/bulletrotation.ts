// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property
    angle: number = 100;
    rotation() {
        this.node.angle=this.angle;
     }
    update(dt) {
        this.angle = this.angle + dt * 2;
        this.rotation();
        //onsole.log("chay dc");
        
    }
}
