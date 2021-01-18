import { Bullet_0 } from "./bullet_0"
import { Bullet_1 } from "./bullet_1"
import { Bullet_2 } from "./bullet_2"
import { Bullet_3 } from "./bullet_3"

const {ccclass, property} = cc._decorator

export enum BulletType {
    /** R viên đạn tròn */
    R = 0,
    /** M luoi liềm */
    M = 1,
    /** F 型子弹，loại hoa */
    F = 2,
    /** B 型子弹，爆破 */
    B = 3,
    R1 = 4,
    /** M luoi liềm */
    M1 = 5,
    /** F 型子弹，loại hoa */
    F1 = 6,
    /** B 型子弹，爆破 */
    B1 = 7
}

@ccclass
export default class BulletFactory extends cc.Component {
    @property({
        type: [cc.Prefab],
        tooltip: "nhà lắp ghép bullet"
    })
    bulletPrefab: cc.Prefab[] = []
    /** Nhom nút đạn */
    bulletPools: cc.NodePool[] = []
    onLoad(): void {
        if (window.matchMedia("(orientation: portrait)").matches) {
            this.bulletPools[BulletType.R] = new cc.NodePool(Bullet_0)
            this.bulletPools[BulletType.M] = new cc.NodePool(Bullet_1)
            this.bulletPools[BulletType.F] = new cc.NodePool(Bullet_2)
            this.bulletPools[BulletType.B] = new cc.NodePool(Bullet_3)
            // nạp vào dấu dầu dòng
            this.putBulletInPool(BulletType.R, 300)
            this.putBulletInPool(BulletType.M, 200)
            this.putBulletInPool(BulletType.F, 100)
            this.putBulletInPool(BulletType.B, 50)
            //console.log("chay dc ");
            
        }
        if (window.matchMedia("(orientation: landscape)").matches) { 
            this.bulletPools[BulletType.R1] = new cc.NodePool(Bullet_0)
            this.bulletPools[BulletType.M1] = new cc.NodePool(Bullet_1)
            this.bulletPools[BulletType.F1] = new cc.NodePool(Bullet_2)
            this.bulletPools[BulletType.B1] = new cc.NodePool(Bullet_3)
            // nạp vào dấu dầu dòng
            this.putBulletInPool(BulletType.R1, 50)
            this.putBulletInPool(BulletType.M1, 50)
            this.putBulletInPool(BulletType.F1, 25)
            this.putBulletInPool(BulletType.B1, 10)
        }
    }
    putBulletInPool (type: BulletType, num: number): void {
        for (let i = 0; i < num; i++) {
            this.bulletPools[type].put(cc.instantiate(this.bulletPrefab[type]))
        }
    }
    createBullet (type: BulletType, dir: cc.Vec2, speed: number): cc.Node {
        let bullet: cc.Node | undefined = undefined
        if (this.bulletPools[type].size() <= 0) {
            this.bulletPools[type].put(cc.instantiate(this.bulletPrefab[type]))
        }
        bullet = this.bulletPools[type].get(this, dir, speed, type)
        this.node.addChild(bullet)
        return bullet
        
    }

}
