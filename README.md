# Ready-to-Rumble-MZ

A lot of games these days offer a rumble mode that activates in response to certain game events (an explosion set off during a major plot twist, getting knocked out during a fight, or simply taking a hard fall to the ground) and this plugin has been designed to bring that experience to RPG Maker.

## Release history:

v1.0: Initial RTM
v1.1: Unanticipated bugfix
v1.2: Added control switch assignment to change rumble mode status
v1.3: Small change to accommodate the possibility of a crash when a gamepad is disconnected. Also set the maximum supported values to eliminate possibility of the effect not working if set too high or too low.
v1.4: Replaces control switch with option menu function, and directs the effect to the most recenty-used gamepad. A very special thanks to YoraeRasante for this update.
v1.5: Added verification to detect the availability of a supported gamepad. As of this update, the functions will not be available if gamepad detection fails.
v1.6: Changed to a commercial, non-redistribution license.
v2.0: Added code and instructions for the Universal Windows interface, as well as for mobile device rumble. Additionally, the commercial license now uses a "pay your way" model; you can download without charge from any of my authorized storefronts, or pay as you believe the plugin is worth.
v2.1: Changed the plugin status to an MZ plugin due to compatibility verification. Also changed the mobile device rumble detection method due to unexpected issues with the prior method. You can still use the plugin with MV through special procedures.
v2.2: Changed the order of the verifications so that the status of the rumble setting is more accurately detected and removed the WinUI2 (formerly Universal Windows) setup instructions due to the required switch from the existing MSHTML-based derivatives to the open Chromium framework in the WebView2 interface.
v2.3: Added configuration code for the persistence of preference.
v2.4: Licensing changed to conform to the MIT License, and commercial licensing requirements are removed in conjunction with this change.

## Using the plugin

To activate the rumble feature in a given event or scene, use the following script call:

Rumble(strong,weak,time)

Strong is the maximum velocity of the effect's magnitude.
Weak is the exact opposite: the weak end of the effect.
Time is defined in milliseconds, so 1000::1 and 5000 is 5 seconds. (Get it?)
Note that neither weak nor strong can go over 1.0, and that magnitude values of 0.1 are completely ignored (and for obvious reasons). Also, the values for weak and strong can be reversed and still work properly.

For example:

Rumble(1,1,1000)
Rumble(0.4,0.2,500)
Rumble(0.3,0.6,5000)

## Q&A

### What reasoning does the NW.JS update provide as part of the install process?
If you're on 64-bit, you can take advantage of improved access to your system resources beyond the 3GB combined access limit, making for improved game performance. Also, it is required on MV in order to guarantee the complete availability of the gamepad servicing libraries for NW.JS that allow for the plugin to work properly.

### Is RPG Maker MZ supported?
Yes. RPG Maker MZ has been tested and is fully compatible. Note that because MZ is newer than MV, you will not need to patch MZ to use the plugin.

### Why limit licensing to Windows platforms?
Unfortunately, since OpenGL is not automatically installed on macOS anymore it would be difficult to gauge compatibility. Furthermore, Apple support requirements beginning with the October 2019 amendments to the official developer agreements mandate all apps to be distributed in x64 packages (meaning that legacy x86 code will not run at all on macOS Catalina, or any later versions for that matter). In addition, Big Sur marks a switch to Apple-specific versions of ARM which are not compatible with other computer systems. Please note that this will only affect NW.JS versions of the plugin (release 2.3 and earlier) and has no effect on the Unity base that will be used starting with the release of RPG Maker Unite.

### What should I say if my customers are complaining of rumble malfunctioning?
Provided the gamepad has a rumble feature there shouldn't be an issue. But in rare cases, making a change to the rumble option while the gamepad is connected may desync the rumble feature. If this occurs, simply unplug and reconnect your gamepad to cycle access to the rumble interface.
