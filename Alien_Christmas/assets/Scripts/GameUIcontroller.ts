// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameUIcontroller extends cc.Component {
  static Instance: GameUIcontroller=null;
    @property(cc.Node)
    revicePopup:cc.Node=null;



    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        GameUIcontroller.Instance = this;
    }

    start () {
    
    }
  
  showBanner() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      cc.find("Canvas/Ship").active = false;
      cc.find("Canvas/Node3").active = false;
      console.log("màn hình dọc");
      cc.audioEngine.pauseMusic();
      cc.audioEngine.pauseAllEffects();
      this.revicePopup.active = true;
      // this.revicePopup.opacity=0;
      // this.revicePopup.scale=0.2;
      this.node = cc.find("Canvas/Popup/YES");
      this.node.setPosition(181, -210);
      this.node.setScale(1.4, 1.4);
      this.node = cc.find("Canvas/Popup/NO");
      this.node.setPosition(-187, -210);
      this.node.setScale(1.4, 1.4);
      this.node = cc.find("Canvas/Popup/Text");
      this.node.setPosition(72, 27);
      this.node.setScale(1.5, 1.5);
   
    }
             
    if (window.matchMedia("(orientation: landscape)").matches) {
      cc.find("Canvas/Ship").active = false;
      cc.find("Canvas/Node3").active = false;
      console.log("màn hình ngang");
      cc.audioEngine.pauseMusic();
      cc.audioEngine.pauseAllEffects();
      //this.revicePopup.active = true;
      // this.revicePopup.opacity=0;
      // this.revicePopup.scale=0.2;
      this.revicePopup.active = true;
      // this.revicePopup.opacity=0;
      // this.revicePopup.scale=0.2;
      this.node = cc.find("Canvas/Popup/YES");
      this.node.setPosition(190, -210);
      this.node.setScale(1, 1);
      this.node = cc.find("Canvas/Popup/NO");
      this.node.setPosition(-141, -210);
      this.node.setScale(1, 1);
      this.node = cc.find("Canvas/Popup/Text");
      this.node.setPosition(60, 28);
      this.node.setScale(1, 1);
     
    }
 
    }
    hideBanner(){
        this.revicePopup.active=false;
    }
    update (dt) {}
}
