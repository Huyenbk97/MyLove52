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
    moveEnemy:cc.ActionInterval;
    // LIFE-CYCLE CALLBACKS:

     
    onLoad () {
        //this.moveEnemy = this.moveTo();
        //this.node.runAction(this.moveEnemy);
        this.moveTo()
    }

    start () {

    }   
    moveTo(){
    // var seq = cc.moveTo(0.5, -5.579, -87.869).easing(cc.easeCircleActionInOut())
    // var seq1= cc.moveTo(0.5, 5.661, 495.599).easing(cc.easeCircleActionInOut())
    //  return cc.sequence(seq,seq1);
    var bezier = [cc.v2(131.530291, -231.3225277), cc.v2(187, 141), cc.v2(300, 100),cc.v2(131.530291, -231.3225277)];
    this.node.runAction(cc.bezierTo(2,bezier));
    }
    // update (dt) {}
}
