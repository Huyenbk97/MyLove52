// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    Ship:cc.Node=null
    @property
    text: string = 'hello';
    @property(cc.Node)
    Laser: cc.Node = null;
    @property
    distance: number = 0;
    @property
     line:number =400;
    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.node.setContentSize(45, cc.winSize.height);
         var manager= cc.director.getCollisionManager();    
         manager.enabled = true;
         this.distance = 0;
         //this.schedule(this.setHEIGHT, 0.1, cc.macro.REPEAT_FOREVER);
    }
    // setHEIGHT(distance) {
    //     this.node.setContentSize(45, 400);
    //  }
    start () {

    }
    onCollisionEnter(otherCollider, selfCollider) { 
       
        var endPoint = cc.v2();
        endPoint.x = this.Ship.getPosition().x;
        endPoint.y = this.Ship.getPosition().y;
        var startPoint = cc.v2();
        startPoint.x = selfCollider.node.getPosition().x;
        startPoint.y = selfCollider.node.getPosition().y;
        this.distance = endPoint.sub(startPoint).mag();
        //console.log(selfCollider.node.getPosition());
        console.log(this.distance);
        //this.setHEIGHT(distance);
    }
    update(dt) {
      
        if (this.line > this.distance) {
            this.line = cc.winSize.height;
           this.node.setContentSize(45,this.line)
        
        } else {
            this.line = this.distance
            this.node.setContentSize(45,this.line)
        }
        //this.node.setScale(1, this.line/50);
        //console.log(cc.winSize.height);
        
        // if (this.X<=50) {
        //     this.Laser.scaleY+=this.X * dt ; 
        // }
       
    }
}
