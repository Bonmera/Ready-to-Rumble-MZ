var Imported = Imported || {}; 
Imported.ReadyToRumble = true;

//==========================================================================
// ReadyToRumble.js
//==========================================================================

/*:
@plugindesc Add rumble mode to your RPG Maker projects
@author BreakerZero, with consultation from OS87, edit by YoraeRasante
@target MZ

* @param Rumble Control Option
* @desc Options menu's option name.
* @type text
* @default Rumble

@help
* -------------------------------------------------------------------------------
* Ready to Rumble by BereakerZero V2.4.0
* With consultation from OS87
* Edits by YoraeRasante/Waterguy to add to Options and use last used Gamepad
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* - The above copyright notice and this permission notice shall be included in
*   all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
* 
* -------------------------------------------------------------------------------
* Special installation requirement: Because the launcher that ships with MV does
 * not have the required functions that allow the plugin to work, the installer
 * version will patch a compatible version of NWJS over the MV defaults as a
 * precaution. Second, the default launcher package will be replaced with a
 * 64-bit runtime stack deprecating any environment versions prior to Windows 7.
 * (Don't worry about the prospect of problems, though - as long as your install
 * and project are 1.6.x or newer the official NWJS redistributable and the MV
 * launcher are completely interchangeable. But then again, you should at least
 * back up the default launcher files before installing.) You can also download
 * the plugin separately, if that's all you need.
*	
* Instructions for patching the NWJS redistributable:
* http://bit.ly/2Zaahxb
* Download the latest NWJS redistributable:
* http://bit.ly/2XNqNGu
*
* -------------------------------------------------------------------------------
* Using the plugin
* -------------------------------------------------------------------------------
* To activate the rumble feature in a given event or scene, use the following
* script call:
* 
*  Rumble(strong,weak,time)
*     
* Strong: Maximum velocity of the effect's magnitude.
*         Default/maximum 1.0, minimum 0.2
* Weak:   Minimal velocity of the effect.
*         Default/maximum 1.0, minimum 0.2
* Time:   Defined in milliseconds, so 1000::1 and 5000 is 5 seconds.
*         Default 1000, maximum 5000.
*
* The values for weak and strong can also be reversed and still work properly.
*	
* For example:
*   Rumble(1,1,1000)
*   Rumble(0.4,0.2,500)
*   Rumble(0.3,0.6,5000)
*
* -------------------------------------------------------------------------------
* Rumble Option
* -------------------------------------------------------------------------------
* Option was based on Yanfly's GamepadConfig and YEP_FpsSynchOption.
* If you are using YEP_OptionsCore.js, here's the code/parameter settings.
 *
 * ---------
 * Settings:
 * ---------
 * 
 * Name:
 * \i[83]Rumble
 *
 * Help Description:
 * Activate gamepad's Rumble effect.
 *
 * Symbol:
 * rumbleOption
 *
 * Show/Hide:
 * if (Imported.ReadyToRumble && Input.isControllerConnected()) {
 *   show = !Utils.isMobileDevice();
 * } else {
 *   show = false;
 * }
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * Functions:
 * ----------
 * 
 * Make Option Code:
 * this.addCommand(name, symbol, enabled, ext);
 *
 * Draw Option Code:
 * var rect = this.itemRectForText(index);
 * var statusWidth = this.statusWidth();
 * var titleWidth = rect.width - statusWidth;
 * this.resetTextColor();
 * this.changePaintOpacity(this.isCommandEnabled(index));
 * this.drawOptionsName(index);
 * this.drawOptionsOnOff(index);
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, !value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, true);
 * 
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, false);
 *
 * Default Config Code:
 * ConfigManager[symbol] = true;
 *
 * Save Config Code:
 * config[symbol] = ConfigManager[symbol];
 *
 * Load Config Code:
 * ConfigManager[symbol] = (config[symbol] !== undefined) ? config[symbol] : true
 *
* -------------------------------------------------------------------------------
* Q&A
* -------------------------------------------------------------------------------
* What reasoning does the NW.JS update provide as part of the install process?
*     If you're on 64-bit, you can take advantage of improved access to your 
 *     system resources beyond the 3GB combined access limit, making for 
 *     improved game performance. It is also required in order to use the
 *     plugin so that the complete availability of the gamepad servicing
 *     libraries for NW.JS are presnt in the launcher package.
* Why limit licensing to Windows platforms?
*    Unfortunately since OpenGL is not automatically installed on macOS anymore 
 *    it would be difficult to gauge compatibility. Furthermore, the Apple support 
 *    requirements in the October 2019 amendments to the official developer 
 *    agreements mandate all apps to be distributed in x64 packages (meaning that 
 *    legacy x86 code will not run at all on macOS Catalina, or any later versions 
 *    for that matter). In addition, Big Sur marks a switch to Apple-specific
 *    versions of ARM which are not compatible with other computer systems. Please
 *    note that this will only affect NW.JS versions of the plugin (release 2.2
 *    and earlier) and has no effect on the Unity base that will be used starting
 *    with the release of RPG Maker Unite.
* Is RPG Maker MZ supported?
*    Yes. RPG Maker MZ has been tested and is fully compatible. Note that because
*    MZ is newer than MV, you will not need to patch MZ to use the plugin.
* What should I say if my customers are complaining of rumble malfunctioning?
*    Provided the gamepad has a rumble feature there shouldn't be an issue. But in 
 *    rare cases, making a change to the rumble option while the gamepad is 
 *    connected may desync the rumble feature. If this occurs, simply unplug and 
 *    reconnect your gamepad to cycle access to the rumble interface.
* Is support for RPG Maker Unite planned?
*    Yes, in version 3.0 there will be support for RPG Maker Unite. However, due
*    to the switch from NW.JS to Unity beginning with RPG Maker Unite there will
*    not be ANY further backward compatibility with previous versions of the
*    plugin.
* -------------------------------------------------------------------------------
* Release history:
* -------------------------------------------------------------------------------
* v1.0: Initial RTM
* v1.1: Unanticipated bugfix
* v1.2: Added control switch assignment to change rumble mode status
* v1.3: Small change to accommodate the possibility of a crash when a gamepad
*       is disconnected. Also set the maximum supported values to eliminate
*       the possibility of the effect not working if set too high or too low.
* v1.4: Replaces control switch with option menu function, and directs the
*       effect to the most recenty-used gamepad. A very special thanks to 
*       YoraeRasante/Waterguy for this update. 
* v1.5: Added verification to detect the availability of a supported gamepad.
*       As of this update, the functions will not be available if gamepad
*       detection fails.
* v1.6: Community circulation revoked and user requirements changed. You must
*       have a license to use the plugin and can no longer freely dstribute
*       or modify its code. Note that this only applies starting with version
*       1.6 and does not affect existing users.
* v2.0: Added code and instructions for the Universal Windows interface, as well
*       as for mobile device rumble. Additionally, the license has been changed
 *       to a "pay your way" model; you can download without charge from any of
 *       my authorized storefronts, or pay as you believe the plugin is worth.
 *       An MZ-compatible release is also being planned; stay tuned for updates!
* v2.1: Changed the mobile device rumble call because of an unforeseen issue
*       with the detection method. Also updated with bugcheck detection for the
 *       Universal Windows instructions in the event that a gamepad is not
 *       detected by the system. MZ support has also been verified with this
 *       release and is now the primary target for the plugin.
* v2.2: Changed the order of the verifications so that the status of the rumble
*       setting is more accurately detected, and removed the WinUI2 (formerly
*	Universal Windows) setup instructions due to the required switch
*       from the existing MSHTML-based derivatives to the open Chromium framework
*       in the WebView2 interface.
* v2.3: Added configuration code for the persistence of preference.
* v2.4: Licensing changed to conform to the MIT License, and commercial licensing
*       requirements are removed in conjunction with the change.
* -------------------------------------------------------------------------------
*/

var bZero = bZero || {};
 
//Setting the Options parameters
var parameters = PluginManager.parameters('ReadyToRumble');
bZero.rumbleOption = String(parameters['Rumble Control Option']);
ConfigManager.rumbleOption = true;

(function($) {
	
	var saveRumbleModeSettings = $.makeData;
	$.makeData = function() {
        var config = saveRumbleModeSettings.call(this);
        config.rumble = this.rumbleOption;
        return config;
	}

	var readRumbleModeSettings = $.applyData;
	$.applyData = function(config) {
            readRumbleModeSettings.call(this, config);
            this.rumbleOption = config.rumble;
	}

})(ConfigManager);


//Detecting last gamepad used and saving the index
  bZero.rumble_Input_updateGamepad = Input._updateGamepadState;
  Input._updateGamepadState = function(gamepad) {
      bZero.rumble_Input_updateGamepad.call (this, gamepad);
      var buttons = gamepad.buttons;
      var axes = gamepad.axes;
      var threshold = 0.5;
      var used = buttons.some(function(button){
              if (button.pressed) return true;
              return false;
          });
      used = used || axes.some(function(axe){
              if (axe > threshold || axe < -threshold) return true;
              return false;
          });
      if (used) {
        this._lastGamepadUsed = gamepad.index;
      }
  }
 
  //The main rumble function
function Rumble(strong, weak, time) {
    if (ConfigManager.rumbleOption) {
        if (navigator.userAgent.indexOf('Android') != -1 || navigator.userAgent.indexOf('iPhone') != -1) {
            navigator.vibrate(time);
        } else if (Input._lastGamepadUsed || Input._lastGamepadUsed === 0) {
            if (!strong) { strong = 1.0 }
            if (strong > 1.0) { strong = 1.0 }
            if (strong <= 0.2) { strong = 0.2 }
            if (!weak) { weak = 1.0 }
            if (weak > 1.0) { weak = 1.0 }
            if (weak <= 0.2) { weak = 0.2 }
            if (!time) { time = 1000 }
            if (time >= 5000) { time = 5000 }
            var gamepad = navigator.getGamepads()[Input._lastGamepadUsed]; //This is the whole point of the previous section, to detect what gamepad to rumble on
            if (!!gamepad && !!gamepad.vibrationActuator) {
                gamepad.vibrationActuator.playEffect("dual-rumble", {
                    duration: time,
                    strongMagnitude: strong,
                    weakMagnitude: weak
                });
            }
        }
    }
}

  //Check if any gamepad is connected
  if (!Input.isControllerConnected) Input.isControllerConnected = function() {
    if (navigator.getGamepads) {
      var gamepads = navigator.getGamepads();
      if (gamepads) {
        for (var i = 0; i < gamepads.length; i++) {
          var gamepad = gamepads[i];
          if (gamepad && gamepad.connected) return true;
        }
      }
    }
    return false;
  };
 
  //Adding to Options
  bZero.rumble_Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
  Window_Options.prototype.addGeneralOptions = function() {
    bZero.rumble_Window_Options_addGeneralOptions.call(this);
    if (!Imported.YEP_OptionsCore) this.addRumbleOptionCommand();
  };
 
  Window_Options.prototype.addRumbleOptionCommand = function() {
    if (Input.isControllerConnected()) {
      this.addCommand(bZero.rumbleOption, 'rumbleOption', true);
      this._addedController = true;
    }
  };
 
  bZero.rumble_Window_Options_update = Window_Options.prototype.update;
  Window_Options.prototype.update = function() {
    bZero.rumble_Window_Options_update.call(this);
    if (this._addedController && !Input.isControllerConnected()) {
      this.refresh();
      this.height = this.windowHeight();
      this.updatePlacement();
	  $gameSwitches.setValue(ConfigManager.rumbleModeSwitch, ConfigManager.rumbleOption);
    }
  };