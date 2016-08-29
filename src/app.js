var size;
var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer0 = new fieldLayer();
    var layer1 = new gameLayer();
    var layer2 = new charaLayer();
    var layer3 = new particleLayer();
    this.addChild(layer0);
    this.addChild(layer1);
    this.addChild(layer2);
    this.addChild(layer3);

  }
});

//デバッグ用ラベル
var debugText;
var gameLayer = cc.Layer.extend({
  sprite: null,
  ctor: function() {
    this._super();
    size = cc.winSize;
    //デバッグ用ラベルをcreate
    debugText = cc.LabelTTF.create("debug","Arial","32", cc.TEXT_ALIGNMENT_CENTER);
    return true;
  },

});

var fieldLayer = cc.Layer.extend({
  ctor: function() {
    this._super();

    var size = cc.director.getWinSize();

    var sprite = cc.Sprite.create(res.ss_BattleScene_bg1);
    sprite.setPosition(size.width / 2, size.height / 2);
    sprite.setScale(0.8);
    this.addChild(sprite, 0);
  }
});

var charaLayer = cc.Layer.extend({
  ctor: function() {
    this._super();

    var size = cc.director.getWinSize();
    //火属性のキャラクター
    var sprite10 = cc.Sprite.create(res.chara_princessselect_10);
    sprite10.setPosition(size.width * 0.3, size.height * 0.3);
    sprite10.setScale(0.8);
    this.addChild(sprite10, 0);
    //火属性　敵ｻｺキャラクター
    var sprite1 = cc.Sprite.create(res.chara_enemy_1);
    sprite1.setPosition(size.width * 0.65, size.height * 0.45);
    sprite1.setScale(1.2);
    this.addChild(sprite1, 0);
    //水属性　敵ｻｺキャラクター
    var sprite2 = cc.Sprite.create(res.chara_enemy_2);
    sprite2.setPosition(size.width * 0.70, size.height * 0.35);
    sprite2.setScale(1.2);
    this.addChild(sprite2, 0);
    //火属性　敵ｻｺ中ボスキャラクター
    var sprite4 = cc.Sprite.create(res.chara_enemy_4);
    sprite4.setPosition(size.width * 0.5, size.height * 0.40);
    sprite4.setScale(1.2);
    this.addChild(sprite4, 0);
  }
});

//パーティクル用のレイヤー
var particleLayer = cc.Layer.extend({
  skillSelect: 0,
  skillLevel: 1,
  skillCnt: 1,

  ctor: function() {
    this._super();
    size = cc.winSize;
    this.scheduleUpdate();
    return true;
  },
  update: function(_dt) {


    if (this.skillCnt == 1) {

      debugText.setString("this.skillCnt:"+this.skillCnt
      + " skillSelect:"+this.skillSelect
      + " skillLevel:"+this.skillLevel
    );

     this.skillParticle(this.skillSelect, this.skillLevel, 350, 100);
     //debug
     //this.skillParticle(2,4, 350, 100);

    }
    if ((this.skillCnt % 200) == 0) {
      this.skillCnt = 0;
      this.skillLevel++;
      //HealとSlipスキル追加
      if(this.skillSelect<1) {
        this.skillLevel = this.skillLevel  % 4;
      } else {
        this.skillLevel = this.skillLevel  % 2;
      }

      this.removeAllChildren();
      if (this.skillLevel == 0) {
        this.skillLevel++;
        this.skillSelect++;
        this.skillSelect = this.skillSelect % 2;
      }

    }
    //フレームをカウントする
    this.skillCnt++;
    /*
    debugText.setString("this.skillCnt:"+this.skillCnt
    + " skillSelect:"+this.skillSelect
    + " skillLevel:"+this.skillLevel);
*/
  },

//属性とスキルレベルと座標を与えてパーティクルを生成する関数
  skillParticle: function(attrib, rare, x, y) {

    //debugText.setString("attrib:"+attrib);
  　　//HealとSlipスキル追加
    var skillName = ["Burst","D"];
    var sName = "res." + skillName[attrib] + "_flame" + rare + "_plist";

    debugText.setString(sName);

    var tempParticle = new cc.ParticleSystem(eval(sName));
    tempParticle.setPosition(400, y);

    this.addChild(tempParticle, 20);
    tempParticle.setAutoRemoveOnFinish(true);

  },


});
