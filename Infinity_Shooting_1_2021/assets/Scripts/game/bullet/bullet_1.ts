import { BulletBase } from "./bulletBase"
const {ccclass, property} = cc._decorator

@ccclass
export class Bullet_1 extends BulletBase {
  update (dt: number): void {
    super.update(dt)
    this.node.angle += 200 * dt
}
} 