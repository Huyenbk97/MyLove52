import Ship from "./Ship";
import subShip from "./subShip";
const { ccclass, property } = cc._decorator;
@ccclass
export default class Boss extends cc.Component {
    static Instance: Boss = null;
    @property(cc.AudioClip)
    ExpolosionBoss = null;
    @property
    duration: number = 0;
    @property
    moveAmountX:number = 300;
    @property
    moveAmountY: number = 75;
    moveEnemy:cc.ActionInterval;
    @property(cc.Prefab)
    BulletBoss: cc.Prefab = null;
    @property(cc.Sprite)
    hp: cc.Sprite = null;
    @property
    ShootFrequency: number = 3.0;
    @property
    enemyLife: number = 200;
    @property
    progress: number = 1;
    @property
    game: number = 0;
    @property
    gameStar: boolean = false;
    @property
    enemyClear: boolean = false;
    @property
    bossClear: boolean = false;
    @property
    playAnimation: boolean = true;
    @property(cc.Prefab)
    explosion: cc.Node = null;
    @property(cc.Node)
    Ship: cc.Node = null;
    @property(cc.Node)
    Boss: cc.Node = null;
    @property(cc.Node)
    text: cc.Node = null;
    @property(cc.Node)
    bossFA: cc.Node = null;
    @property(cc.Node)
    redDes: cc.Node = null;
    @property(cc.Sprite)
    hpBar: cc.Sprite = null;
    @property(cc.Node)
    bgBlack: cc.Node = null;
    @property(cc.Prefab)
    explosion1: cc.Node = null;
    @property(cc.Prefab)
    hitDame: cc.Node = null;
    @property
    enemyNumber: number = 9;
    @property
    shieldHp: number = 10;
    @property
    BossHp: number = 10;
    @property
    BossMove: number = 10;
    @property(cc.Node)
    textHand: cc.Node = null; 
    @property(cc.Node)
    redDis: cc.Node = null; 
    @property(cc.Prefab)
    expolosionNode: cc.Node = null;
    @property({
        type:cc.AudioClip
    })
    Boss_explosion = null;
    onLoad() {
        Boss.Instance = this;
        var manager= cc.director.getCollisionManager();
        manager.enabled = true;
        this.progress = 1;
        this.hpBar.fillRange = this.progress;
    }
    open() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.node.runAction(this.moveEnemy);
        this.schedule(this.spawnBullet, 3, cc.macro.REPEAT_FOREVER, 3.0);  
    }
    hpProcess() {
        this.progress -= 0.002;
        this.hpBar.fillRange = this.progress;
            }
    spawnBullet() {
    }
    explosionRun() {  
        if (window.matchMedia("(orientation: portrait)").matches) {
            try {
                var explosionRun = cc.instantiate(this.explosion);
                explosionRun.setPosition(this.Boss.position.x, this.Boss.position.y);
                this.Boss.parent.addChild(explosionRun);
                this.scheduleOnce(this.destroy1, 1)
            }
            catch (error) {
            }
        }
        if (window.matchMedia("(orientation: landscape)").matches) {
            try {
                var explosionRun = cc.instantiate(this.explosion1);
                explosionRun.setPosition(this.Boss.position.x, this.Boss.position.y);
                this.Boss.parent.addChild(explosionRun);
                this.scheduleOnce(this.destroy1, 1)
            }
            catch (error) {
            }
         }
    }
    destroy1() {
        this.bossFA.destroy();
    }
    start () {
    }
    update(dt) {
        try {
            
       
        if (this.progress<=0) {
            this.explosionRun();
            Ship.Instance.pauseGame();
            this.Boss.destroy();
            subShip.Instance.stopGame = true;

        }
    } catch (error) {
            
    }
     }
}
      