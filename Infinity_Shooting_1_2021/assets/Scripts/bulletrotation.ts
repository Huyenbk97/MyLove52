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
    }
}
