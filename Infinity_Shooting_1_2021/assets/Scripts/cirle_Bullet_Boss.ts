const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
    private scaleDir: number = 1
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    start () {

    }

    update(dt) {
        if (this.node.scaleX > 0.8) {
            this.scaleDir = -1
        } else if (this.node.scaleX < 0.5) {
            this.scaleDir = 1
        }
        this.node.scale += this.scaleDir * 5 * dt
 }
}
