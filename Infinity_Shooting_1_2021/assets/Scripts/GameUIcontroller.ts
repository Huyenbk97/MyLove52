const {ccclass, property} = cc._decorator;
@ccclass
export default class GameUIcontroller extends cc.Component {
  static Instance: GameUIcontroller = null;
    @property
    portrait: boolean = true;
    @property
    landscape: boolean = true;
    @property(cc.Node)
    Ship: cc.Node = null;
    @property(cc.Node)
    Boss: cc.Node = null;
    @property(cc.Node)
    Text: cc.Node = null;
    @property(cc.Node)
    IconGame: cc.Node = null;
    @property(cc.Node)
    ButtonPlay: cc.Node = null;
    @property(cc.Node)
    Canvas: cc.Node = null;
    @property
    width: number = 414;
    @property
    setPositionDoc: boolean = true;
    @property
    manhinhxoay: boolean = false;
    @property
    setPositionNgang: boolean = true;
    @property
    height: number=736;
    onLoad() {
        GameUIcontroller.Instance = this;
      if (window.matchMedia("(orientation: portrait)").matches) {
        this.Ship.setPosition(this.Canvas.getPosition().x * 28.331 / 540, -this.Canvas.getPosition().y * 420.449 / 950);
       }
      if (window.matchMedia("(orientation: landscape)").matches) {
        this.Ship.setPosition(this.Canvas.getPosition().x * 20 / 540, -this.Canvas.getPosition().y * 155 / 950);
       }
    }
    start () {
    }
  reSize() {
    this.manhinhxoay = false;
    
    
    if (screen.width >= 768) {
      if (window.matchMedia("(orientation: portrait)").matches) {
        this.ButtonPlay.setPosition(this.Canvas.getPosition().x * 28 / 540, -this.Canvas.getPosition().y * 630 / 950);
        this.IconGame.setPosition(this.Canvas.getPosition().x * 340 / 540, -this.Canvas.getPosition().y * 630 / 950);
        this.ButtonPlay.setScale(1, 1);
        this.IconGame.setScale(0.5, 0.5);
      }
    }
    else
      if (window.matchMedia("(orientation: portrait)").matches) {
        if (screen.width == 375) {
          console.log("iphone x");
          
          this.IconGame.setScale(0.7, 0.7);
          this.IconGame.setPosition(cc.v2(this.Canvas.width / 2 * 2 / 3, -this.Canvas.height / 2 * 6.5 / 8));
        } else {
          this.Ship.setScale(1, 1);
          try {
            this.Boss.setScale(0.7, 0.7);
          } catch (error) {
          }
          this.ButtonPlay.setPosition(this.Canvas.getPosition().x * 18 / 540, -this.Canvas.getPosition().y * 800 / 950);
          this.IconGame.setPosition(this.Canvas.getPosition().x * 395 / 540, -this.Canvas.getPosition().y * 798.587 / 950);
          this.ButtonPlay.setScale(1, 1);
          this.IconGame.setScale(1, 1);
          this.width = window.innerWidth;
          this.height = window.innerHeight;
          this.IconGame.setContentSize(cc.size(180 * this.width / 414, 180 * this.height / 736);
          this.Text.setScale(1, 1);
        }
      }     
     if (window.matchMedia("(orientation: landscape)").matches) {
       this.Ship.setScale(0.4, 0.4);
       try {
        this.Boss.setScale(0.3, 0.3);
       } catch (error) {      
       }
       this.IconGame.setPosition(cc.v2(this.Canvas.width / 2 * 2.5/ 3, -this.Canvas.height / 2 * 2/ 8));
       this.ButtonPlay.setScale(0.5, 0.5);
       this.ButtonPlay.setPosition(cc.v2(16, -this.Canvas.height / 2 * 2.3/ 8));
       this.ButtonPlay.setScale(0.6, 0.6);
       this.IconGame.setScale(0.4, 0.4);
       this.Text.setScale(0.6,0.6);
     }
 
  }
 
  update(dt) {

    window.addEventListener('orientationchange', this.reSize);  
    this.reSize();
    }
}
