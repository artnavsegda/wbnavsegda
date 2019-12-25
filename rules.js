// place your rules here or add more .js files in this directory
log("reload");

//balcony

function heater_control()
{
  if (dev["heater_control"]["active"] == 1) {
    if ( dev["wb-w1"]["28-000008f2ce1a"] > dev["heater_control"]["target_temperature"]) {
      dev["wb-mio-gpio_209:5"]["K2"] = 0;
    } else {
      dev["wb-mio-gpio_209:5"]["K2"] = 1;
    }
  }
  else {
    dev["wb-mio-gpio_209:5"]["K2"] = 0;
  }
}

defineRule("heater_control_rule", {
  whenChanged: "wb-w1/28-000008f2ce1a",
  then: function (newValue, devName, cellName) {
    heater_control();
  }
});

defineRule("heater_control_rule_back", {
  whenChanged: "heater_control/target_temperature",
  then: function (newValue, devName, cellName) {
    heater_control();
  }
});

defineRule("heater_control_rule_active", {
  whenChanged: "heater_control/active",
  then: function (newValue, devName, cellName) {
    heater_control();
  }
});

defineVirtualDevice("heater_control", {
    title: "Heater control",
    cells: {
      target_temperature: {
          type: "range",
          value : 22,
          max : 100
      },
      active: {
            type: "range",
            value : 1,
            max : 1
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
      }
    }
});

defineRule("heater_control_target", {
  whenChanged: "heater_control/target",
  then: function (newValue, devName, cellName)  {
    switch(newValue)
    {
      case 0:
        dev["heater_control"]["current"] = 1;
       break;
      case 1:
        dev["heater_control"]["current"] = 2;
       break;
      case 2:
        dev["heater_control"]["current"] = 3;
      break;
    }
  }
});

//bath

function heater_control_bath()
{
  if (dev["heater_control_bath"]["active"] == 1) {
    if ( dev["wb-w1"]["28-00000a42fdb0"] > dev["heater_control_bath"]["target_temperature"]) {
      dev["wb-mio-gpio_209:5"]["K1"] = 0;
    } else {
      dev["wb-mio-gpio_209:5"]["K1"] = 1;
    }
  }
  else {
    dev["wb-mio-gpio_209:5"]["K1"] = 0;
  }
}

defineRule("heater_control_bath_rule", {
  whenChanged: "wb-w1/28-00000a42fdb0",
  then: function (newValue, devName, cellName) {
    heater_control_bath();
  }
});

defineRule("heater_control_bath_rule_back", {
  whenChanged: "heater_control_bath/target_temperature",
  then: function (newValue, devName, cellName) {
    heater_control_bath();
  }
});

defineRule("heater_control_bath_rule_active", {
  whenChanged: "heater_control_bath/active",
  then: function (newValue, devName, cellName) {
    heater_control_bath();
  }
});

defineVirtualDevice("heater_control_bath", {
    title: "Heater control bathroom",
    cells: {
      target_temperature: {
          type: "range",
          value : 22,
          max : 100
      },
      active: {
            type: "range",
            value : 1,
            max : 1
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
      }
    }
});

defineRule("heater_control_bath_target", {
  whenChanged: "heater_control_bath/target",
  then: function (newValue, devName, cellName)  {
    switch(newValue)
    {
      case 0:
        dev["heater_control_bath"]["current"] = 1;
       break;
      case 1:
        dev["heater_control_bath"]["current"] = 2;
       break;
      case 2:
        dev["heater_control_bath"]["current"] = 3;
      break;
    }
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
  whenChanged: "wb-mio-gpio_211:1/Counter 3", //Следим за Input 2
  then: function (newValue, devName, cellName)  {
    if (!dev["wb-mio-gpio_211:1"]["DR3"])
    {
      dev["wb-mio-gpio_211:4"]["K1"] = !dev["wb-mio-gpio_211:4"]["K1"]
    	dev["stateless_button"]["press"] = 1;
    }
  }
});
