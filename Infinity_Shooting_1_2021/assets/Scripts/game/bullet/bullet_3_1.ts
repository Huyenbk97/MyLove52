import { BulletBase } from "./bulletBase"
const {ccclass, property} = cc._decorator

@ccclass
export class bullet_3_1 extends BulletBase {

    /** 收缩方向 */
    private scaleDir: number = 1

    // 收缩
    update (dt: number): void {
        super.update(dt)
        if (this.node.scaleX > 0.6) {
            this.scaleDir = -1
        } else if (this.node.scaleX < 0.25) {
            this.scaleDir = 1
        }
        this.node.scale += this.scaleDir * 5 * dt
    }

} 