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
    r: number = 220;
    @property
    radian: number = 0;
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    updatePos(){
        this.node.x = 4.405+this.r * Math.cos(this.radian);
        this.node.y = 288.652+this.r * Math.sin(this.radian);
    }
    start () {

    }

    update (dt) {
        this.radian = this.radian + dt * 0.5;
        this.updatePos();
    }
}
