game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({
  init: function () {
    // call the constructor
    this._super(me.Container, 'init');
    // persistent across level change
    this.isPersistent = true;

    // non collidable
    this.collidable = false;

    // make sure our object is always draw first
    this.z = Infinity;

    // give a name
    this.name = "HUD";

    // add our child score object at the top left corner
    this.addChild(new game.HUD.ScoreItem(5, 5));
  }
});


/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
  /**
   * constructor
   */
  init: function (x, y) {
    // call the parent constructor
    // (size does not matter here)
    this._super(me.Renderable, "init", [x, y, 10, 10]);

    // local copy of the global score
    this.stepsFont = new me.Font('gamefont', 80, '#000', 'center');

    // make sure we use screen coordinates
    this.floating = true;
  },

  draw: function (renderer) {
    var context = renderer.getContext();
    if (game.data.start && me.state.isCurrent(me.state.PLAY))
      this.stepsFont.draw(context, game.data.steps, me.video.renderer.getWidth() / 2, 10);
  }

});

var BackgroundLayer = me.ImageLayer.extend({
  init: function (image, z, speed) {
    name = image;
    width = 900;
    height = 600;
    ratio = 1;
    // call parent constructor
    this._super(me.ImageLayer, 'init', [name, width, height, image, z, ratio]);
  },

  update: function () {

    if (me.input.isKeyPressed('mute')) {
      game.data.muted = !game.data.muted;
      if (game.data.muted) {
        me.audio.disable();
      } else {
        me.audio.enable();
      }
    }
    return true;
  }
});

var Share = me.GUI_Object.extend({
  init: function (x, y) {
    var settings = {};
    settings.image = "share";
    settings.spritewidth = 150;
    settings.spriteheight = 75;
    this._super(me.GUI_Object, 'init', [x, y, settings]);
  },

  onClick: function (event) {
    var shareText = 'I just made ' + game.data.steps + ' steps on Dopply Bird! Can you beat me? Try online here!';
    var url = 'https://wrakky.github.io/dopply-bird/';

    if (window.FB) {
      FB.ui(
        {
          method: 'feed',
          name: 'My Dopply Bird Score!',
          caption: "Share to your friends",
          description: (
            shareText
          ),
          link: url,
          picture: 'http://wrakky.github.io/dopply-bird/data/img/clumsy.png'
        }
      );
    }
    return false;
  }

});

var Tweet = me.GUI_Object.extend({
  init: function (x, y) {
    var settings = {};
    settings.image = "tweet";
    settings.spritewidth = 152;
    settings.spriteheight = 75;
    this._super(me.GUI_Object, 'init', [x, y, settings]);
  },

  onClick: function (event) {
    var shareText = 'I just made ' + game.data.steps + ' steps on Dopply Bird! Can you beat me? Try online here!';
    var url = 'https://wrakky.github.io/dopply-bird/';
    var hashtags = 'dopplybird';
    window.open('https://twitter.com/intent/tweet?text=' + shareText + '&hashtags=' + hashtags + '&count=' + url + '&url=' + url, 'Tweet!', 'height=300,width=400')
    return false;
  }

});
