// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    isAttack: boolean = false;
    timeAttack: number=0.1;

    start () {

    }

    attackDamage() {
        //--dame
        var self = this;
        if (!this.isAttack) {
            this.isAttack = false;
            //--DAME
            this.scheduleOnce(function () {
                self.isAttack = false; 
            },this.timeAttack);
        }
    }


    // update (dt) {}
}
