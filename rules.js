// place your rules here or add more .js files in this directory
log("add your rules to /etc/wb-rules/");

defineRule("heater_control", { //название правила - "контроль обогревателя", может быть произвольным
  whenChanged: "hwmon/controls/Board Temperature", //при изменении состояния датчика 1-Wire с идентификатором 28-0115a48fcfff
  then: function (newValue, devName, cellName) { //выполняй следующие действия
    if ( newValue > 35) { //если температура датчика больше 30 градусов
      dev["wb-mio-gpio_211:4"]["K1"] = 0; //установи Реле 1 модуля WB-MRM2 с адресом 130 в состояние "выключено"
    } else {
      dev["wb-mio-gpio_211:4"]["K1"] = 1; //установи Реле 1 модуля WB-MRM2 с адресом 130 в состояние "включено"
    }
  }
});

defineVirtualDevice("switch_both", {
    title: "Switch both relays",
    cells: {
	enabled: {
	    type: "switch",
	    value: false
	},
    }
});

defineRule("control_both", {
  whenChanged: "switch_both/enabled",
  then: function (newValue, devName, cellName)  {
	dev["wb-mio-gpio_211:4"]["K2"] = newValue;
    dev["wb-mio-gpio_211:4"]["K3"] = newValue;
  }
});

defineVirtualDevice("co2_alarm", {
    title: "CO2 critical",
    cells: {
	enabled: {
	    type: "switch",
	    value: false,
      	readonly : true
	},
    }
});

defineRule("co2_critical", {
  whenChanged: "wb-msw-v3_135/CO2",
  then: function (newValue, devName, cellName)  {
    if ( newValue > 1000) { //если датчик больше 1000 PPM
		dev["co2_alarm"]["enabled"] = 1;
    } else {
      	dev["co2_alarm"]["enabled"] = 0;
    }
  }
});

defineVirtualDevice("motion_detect", {
    title: "Motion detected",
    cells: {
	enabled: {
	    type: "switch",
	    value: false,
      	readonly : true
	},
    }
});

defineRule("motion_threshold", {
  whenChanged: "wb-msw-v3_135/Max Motion",
  then: function (newValue, devName, cellName)  {
    if ( newValue > 100) { //если датчик больше 1000 PPM
		dev["motion_detect"]["enabled"] = 1;
    } else {
      	dev["motion_detect"]["enabled"] = 0;
    }
  }
});

defineVirtualDevice("shade one", {
    title: "control shade one",
    cells: {
	target: {
	    type: "range",
	    value : 50,
      	max : 100
	},
	current: {
	    type: "range",
	    value : 50,
      	max : 100,
      	readonly : true
	},
    state: {
      	type: "range",
      	value: 2,
      	max: 2,
      	readonly: true
    },
    hold: {
      	type: "switch",
      	value: false
    }
  }
});

var timerID = 0;

defineRule("shade_one_control", {
  whenChanged: "shade one/target",
  then: function (newValue, devName, cellName)  {
    if (newValue != dev["shade one"]["current"] && timerID == 0)
    {
      	timerID = setInterval(function(){
          if (dev["shade one"]["current"] == dev["shade one"]["target"])
          {
            clearTimeout(timerID);
            timerID = 0;
            dev["shade one"]["state"] = 2;
          }
          else if (dev["shade one"]["current"] > dev["shade one"]["target"])
          {
            dev["shade one"]["current"]--;
            if (dev["shade one"]["state"] != 0)
            {
            	dev["shade one"]["state"] = 0;
            }
          }
          else if (dev["shade one"]["current"] < dev["shade one"]["target"])
          {
            dev["shade one"]["current"]++;
            if (dev["shade one"]["state"] != 1)
            {
            	dev["shade one"]["state"] = 1;
            }
          }
        },1000);
		//dev["shade one"]["current"] = newValue;
    }
    else
    {
      	//setInterval
    }
  }
});

defineVirtualDevice("heatercooler", {
    title: "control heater cooler device",
    cells: {
	active: {
	    type: "range",
	    value : 1,
      	max : 1
	},
	temperature: {
	    type: "temperature",
	    value : 20,
      	max : 100,
      	readonly : true
	},
    current: {
      	type: "range",
      	value: 1,
      	max: 3,
      	readonly: true
    },
    target: {
      	type: "range",
      	value: 0,
      	max: 2
    },
    coolingThreshold: {
      	type: "range",
      	value: 20,
      	max: 35
    },
    heatingThreshold: {
      	type: "range",
      	value: 20,
      	max: 25
    }
  }
});

defineRule("heatercooler_control", {
  whenChanged: "heatercooler/target",
  then: function (newValue, devName, cellName)  {
    switch(newValue)
    {
      case 0:
        dev["heatercooler"]["current"] = 1;
       break;
      case 1:
        dev["heatercooler"]["current"] = 2;
       break;
      case 2:
        dev["heatercooler"]["current"] = 3;
      break;
    }
  }
});

defineVirtualDevice("thermostat", {
    title: "control thermostat device",
    cells: {
	current_temperature: {
	    type: "temperature",
	    value : 20,
      	max : 100,
      	readonly : true
	},
	target_temperature: {
	    type: "range",
	    value : 20,
      	max : 100
	},
    current: {
      	type: "range",
      	value: 0,
      	max: 2,
      	readonly: true
    },
    target: {
      	type: "range",
      	value: 0,
      	max: 3
    },
    coolingThreshold: {
      	type: "range",
      	value: 20,
      	max: 35
    },
    heatingThreshold: {
      	type: "range",
      	value: 20,
      	max: 25
    },
	temperatureDisplayUnits: {
	    type: "range",
	    value : 0,
      	max : 1
	},
  }
});

defineRule("thermostat_control", {
  whenChanged: "thermostat/target",
  then: function (newValue, devName, cellName)  {
    switch(newValue)
    {
      case 0:
        dev["thermostat"]["current"] = 0;
       break;
      case 1:
        dev["thermostat"]["current"] = 1;
       break;
      case 2:
        dev["thermostat"]["current"] = 2;
      break;
      case 3:
        dev["thermostat"]["current"] = 0;
      break;
    }
  }
});

defineVirtualDevice("stateless_button", {
  title: "Control stateless button",
  cells: {
	   press: {
       type: "range",
       value: 0
     },
   }
});

defineRule("stateless_button_control", {
  whenChanged: "wb-mio-gpio_211:1/Counter 2", //Следим за Input 2
  then: function (newValue, devName, cellName)  {
    dev["stateless_button"]["press"] = 1;
  }
});
