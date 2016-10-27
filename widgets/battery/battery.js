/*
 *  Project: Battery jQuery plugin
 *  Author: Jan Gabriel <jan.gabriel@foxon.cz>
 *  License: MIT
 */

(function($, window, document, undefined) {

  var pluginName = "battery",
    dataKey = "plugin_" + pluginName;

  var Plugin = function(element, options) {

    this.element = element;

    this.options = {
      full: false,
      error: false,
      charging: false,
      inverse: false,
      level: 0
    };

    this.init(options);
  };

  Plugin.prototype = {
    init: function(option) {
      $.extend(this.options, option);
      this.full(this.options.full);
      this.error(this.options.error);
      this.charging(this.options.charging);
      this.inverse(this.options.inverse);
      this.level(this.options.level);
    },
    full: function(full) {
      if (typeof(full) != "undefined") {
        if (full) {
          this.options.full = true;
          this.element.find('.battery').addClass('battery-full');
        } else {
          this.options.full = false;
          this.element.find('.battery').removeClass('battery-full');
        }
        return this;
      } else {
        return this.options.full;
      }
    },
    error: function(error) {
      if (typeof(error) != "undefined") {
        if (error) {
          this.options.error = true;
          this.element.find('.battery').addClass('battery-error');
        } else {
          this.options.error = false;
          this.element.find('.battery').removeClass('battery-error');
        }
        return this;
      } else {
        return this.options.error;
      }
    },
    charging: function(charging) {
      if (typeof(charging) != "undefined") {
        if (charging) {
          this.options.charging = true;
          this.element.find('.battery').addClass('battery-charging');
        } else {
          this.options.charging = false;
          this.element.find('.battery').removeClass('battery-charging');
        }
        return this;
      } else {
        return this.options.charging;
      }
    },
    inverse: function(inverse) {
      if (typeof(inverse) != "undefined") {
        if (inverse) {
          this.options.inverse = true;
          this.element.find('.battery').addClass('battery-variant-inverse');
        } else {
          this.options.inverse = false;
          this.element.find('.battery').removeClass('battery-variant-inverse');
        }
        return this;
      } else {
        return this.options.inverse;
      }
    },
    level: function(level) {
      if (typeof(level) != "undefined") {
        var value = Number(level);
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        this.options.level = value;
        this.element.find('.bar').removeClass("active bar-red bar-orange bar-yellow bar-lime bar-green");
        if (value > 0 && value < 20) {
          this.element.find('.bar').eq(4).addClass('bar-red active');
        }
        else if (value >= 20 && value < 40) {
          this.element.find('.bar').eq(3).addClass('bar-orange active');
          this.element.find('.bar').eq(4).addClass('bar-orange active');
        }
        else if (value >= 40 && value < 60) {
          this.element.find('.bar').eq(2).addClass('bar-yellow active');
          this.element.find('.bar').eq(3).addClass('bar-yellow active');
          this.element.find('.bar').eq(4).addClass('bar-yellow active');
        }
        else if (value >= 60 && value < 80) {
          this.element.find('.bar').eq(1).addClass('bar-lime active');
          this.element.find('.bar').eq(2).addClass('bar-lime active');
          this.element.find('.bar').eq(3).addClass('bar-lime active');
          this.element.find('.bar').eq(4).addClass('bar-lime active');
        }
        else if (value >= 80 && value < 100) {
          this.element.find('.bar').eq(0).addClass('bar-green active');
          this.element.find('.bar').eq(1).addClass('bar-green active');
          this.element.find('.bar').eq(2).addClass('bar-green active');
          this.element.find('.bar').eq(3).addClass('bar-green active');
          this.element.find('.bar').eq(4).addClass('bar-green active');
        }
        return this;
      } else {
        return this.options.level;
      }
    }
  };

  /*
   * Plugin wrapper, preventing against multiple instantiations and
   * return plugin instance.
   */
  $.fn[pluginName] = function(options) {

    var plugin = this.data(dataKey);

    // has plugin instantiated ?
    if (plugin instanceof Plugin) {
      // if have options arguments, call plugin.init() again
      if (typeof options !== 'undefined') {
        plugin.init(options);
      }
    } else {
      plugin = new Plugin(this, options);
      this.data(dataKey, plugin);
    }

    return plugin;
  };

}(jQuery, window, document));

var jqElement = $('.widget-content');
var battery = jqElement.battery();
console.log(battery.level(62).inverse(true));