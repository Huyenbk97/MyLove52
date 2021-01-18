
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property
    BulletSpeed: number = 800;
    @property(cc.Prefab)
    explosion: cc.Node = null; 
    @property(cc.Prefab)
    hit: cc.Node = null;  
    @property(cc.Node)
    Boss: cc.Node = null;
    onLoad() {
   }
    onCollisionEnter(otherCollider, selfCollider) {
       if (selfCollider.name=="new_bullet_pet4<CircleCollider>" ) {
           if (window.matchMedia("(orientation: portrait)").matches) {
               var explosion = cc.instantiate(this.explosion);
               explosion.setPosition(selfCollider.node.position);
               this.node.parent.addChild(explosion)
               selfCollider.node.destroy();
               var node = cc.find('Canvas/Boss_fa')
               node.getComponent('Boss').hpProcess();
           }
           
           if (selfCollider.name == "new_bullet_pet4<CircleCollider>") {
               if (window.matchMedia("(orientation: landscape)").matches) { 
            var explosion1 = cc.instantiate(this.hit);
            explosion1.setPosition(selfCollider.node.position);
            this.node.parent.addChild(explosion1)
            selfCollider.node.destroy();
            var node = cc.find('Canvas/Boss_fa')
            node.getComponent('Boss').hpProcess();
           } }
       }
       if (selfCollider.name=="shipBullet<BoxCollider>") {
           if (window.matchMedia("(orientation: portrait)").matches) {
               var explosion = cc.instantiate(this.explosion);
               explosion.setPosition(selfCollider.node.position);
               this.node.parent.addChild(explosion)
               selfCollider.node.destroy();
               var node = cc.find('Canvas/Boss_fa')
               node.getComponent('Boss').hpProcess();
           }
    
        }
        if (selfCollider.name == "shipBulletngang<BoxCollider>") {
            if (window.matchMedia("(orientation: landscape)").matches) { 
                var explosion1 = cc.instantiate(this.hit);
                explosion1.setPosition(selfCollider.node.position);
                this.node.parent.addChild(explosion1)
                selfCollider.node.destroy();
                var node = cc.find('Canvas/Boss_fa')
                node.getComponent('Boss').hpProcess();
               }
         }
     }
    start () {

    }
    
    update(dt) {
        if (window.matchMedia("(orientation: portrait)").matches) {
            this.BulletSpeed=800
            this.node.setPosition(this.node.position.x, this.node.position.y += this.BulletSpeed * dt)
            if (this.node.position.y >= cc.winSize.height) {
                this.node.destroy();
            }
            console.log();
        }
        if (window.matchMedia("(orientation: landscape)").matches) { 
            this.BulletSpeed = 300;
            this.node.setPosition(this.node.position.x, this.node.position.y += this.BulletSpeed * dt)
            if (this.node.position.y >= cc.winSize.width) {
                this.node.destroy();
            }
        }

        
   }
}
