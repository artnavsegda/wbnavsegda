defineVirtualDevice("cabinet_dimmer", {
    title: "Cabinet dimmer",
    cells: {
    	enabled: {
    	    type: "switch",
    	    value: true
    	},
        brightness: {
            type: "range",
            value: 20,
            max: 100
        },
    }
});

defineRule("cabinet_dimmer_brightness", {
  whenChanged: "cabinet_dimmer/brightness",
  then: function (newValue, devName, cellName)  {
    if (dev["cabinet_dimmer"]["enabled"])
		dev["wb-mrgbw-d_81"]["Blue"] = Math.floor(newValue * 2.5);
  }
});

defineRule("cabinet_dimmer_enabled", {
  whenChanged: "cabinet_dimmer/enabled",
  then: function (newValue, devName, cellName)  {
    if (newValue)
    {
      dev["wb-mrgbw-d_81"]["Blue"] = Math.floor(dev["cabinet_dimmer"]["brightness"] * 2.5);
    }
    else
    {
      dev["wb-mrgbw-d_81"]["Blue"] = 0;
    }
  }
});

defineVirtualDevice("bedroom_dimmer", {
    title: "Bedroom dimmer",
    cells: {
    	enabled: {
    	    type: "switch",
    	    value: true
    	},
        brightness: {
            type: "range",
            value: 20,
            max: 100
        },
    }
});

defineRule("bedroom_dimmer_brightness", {
  whenChanged: "bedroom_dimmer/brightness",
  then: function (newValue, devName, cellName)  {
    if (dev["bedroom_dimmer"]["enabled"])
		dev["wb-mrgbw-d_81"]["Red"] = Math.floor(newValue * 2.5);
  }
});

defineRule("bedroom_dimmer_enabled", {
  whenChanged: "bedroom_dimmer/enabled",
  then: function (newValue, devName, cellName)  {
    if (newValue)
    {
      dev["wb-mrgbw-d_81"]["Red"] = Math.floor(dev["bedroom_dimmer"]["brightness"] * 2.5);
    }
    else
    {
      dev["wb-mrgbw-d_81"]["Red"] = 0;
    }
  }
});

var cabinet_dimmer_keypad_timerID = 0;

defineRule("cabinet_dimmer_keypad", {
  whenChanged: "wb-mio-gpio_211:2/Counter 11",
  then: function (newValue, devName, cellName)  {
	if (newValue % 2 == 0)
	{
      if (cabinet_dimmer_keypad_timerID)
      {
        clearTimeout(cabinet_dimmer_keypad_timerID);
        cabinet_dimmer_keypad_timerID = 0;
      }
      else
      {
		dev["cabinet_dimmer"]["enabled"] = !dev["cabinet_dimmer"]["enabled"];
      }
	}
    else
    {
      	if (dev["cabinet_dimmer"]["brightness"] > 50)
        {
          cabinet_dimmer_keypad_timerID = setInterval(function(){
            if (dev["cabinet_dimmer"]["brightness"] == 0)
            {
              clearTimeout(cabinet_dimmer_keypad_timerID);
              cabinet_dimmer_keypad_timerID = 0;
            }
            else
            {
              dev["cabinet_dimmer"]["brightness"]--;
            }
          },100);
        }
      	else
        {
          cabinet_dimmer_keypad_timerID = setInterval(function(){
            if (dev["cabinet_dimmer"]["brightness"] == 100)
            {
              clearTimeout(cabinet_dimmer_keypad_timerID);
              cabinet_dimmer_keypad_timerID = 0;
            }
            else
            {
			  dev["cabinet_dimmer"]["brightness"]++;
            }
          },100);
        }
    }
  }
});