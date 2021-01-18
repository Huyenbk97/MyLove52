import BulletFactory,{ BulletType } from "./bulletFactory";
const { ccclass, property } = cc._decorator;
@ccclass
export  class BulletBase extends cc.Component {
    //huong di chuyen
    _movDir: cc.Vec2 = new cc.Vec2(0, 0);
    get moveDir(): cc.Vec2{
        return this._movDir
    }
    set moveDir(dir:cc.Vec2) {
        this._movDir.x = dir.x;
        this._movDir.y=dir.y
    }
    _moveSpeed: number = 0
    get moveSpeed (): number {
        return this._moveSpeed;
    }
    set moveSpeed(speed: number) {
        if (speed < 0) { return }
        this._moveSpeed = speed;
        
    }
    private tag: BulletType | undefined = undefined
    private bulletFactory: BulletFactory | undefined = undefined
    reuse(bulletFactory: BulletFactory, dir: cc.Vec2, speed: number, tag: BulletType): void{
        this.bulletFactory = bulletFactory;
        this.moveSpeed = speed;
        this.tag = tag;
        this.moveDir = dir;
    }
    unuse9(): void{
        
    }
    onLoad() {
     
 }

    start () {

    }

    update(dt:number):void {
     if (this.moveSpeed===0) {
         return
        }
        if (this.moveDir.y!==0) {
            this.node.y += this.moveDir.y*this.moveSpeed*dt
        }
        ///
        if (Math.abs(this.node.x)>540||Math.abs(this.node.y)>960) {
            this.bulletFactory.bulletPools[this.tag].put(this.node);
        
        }
 }
}
