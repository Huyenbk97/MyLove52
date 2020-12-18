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
    a: number = 500;
    @property
    b: number = 500;
    @property
    radian: number = 0;
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    updatePos(){
        this.node.x = this.a * Math.cos(this.radian);
        this.node.y = this.b * Math.sin(this.radian);
    }
    start () {

    }

    update (dt) {
        this.radian = this.radian + dt * 1;
        this.updatePos();
    }
}
