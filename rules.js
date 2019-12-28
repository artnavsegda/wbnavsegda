// place your rules here or add more .js files in this directory
log("reload");

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

defineRule("stateless_button_control", {
  whenChanged: "wb-mio-gpio_211:1/Counter 3", //Следим за Input 2
  then: function (newValue, devName, cellName)  {
    if (!dev["wb-mio-gpio_211:1"]["DR3"])
    {
        dev["wb-mio-gpio_211:4"]["K1"] = 0;
        dev["wb-mio-gpio_211:4"]["K2"] = 0;
        dev["wb-mio-gpio_211:4"]["K3"] = 0;
        dev["wb-mio-gpio_211:4"]["K4"] = 0;
        dev["wb-mio-gpio_211:4"]["K5"] = 0;
        dev["wb-mio-gpio_211:4"]["K6"] = 0;
        dev["wb-mio-gpio_211:4"]["K7"] = 0;
        dev["wb-mio-gpio_211:4"]["K8"] = 0;

        dev["wb-mio-gpio_211:5"]["K1"] = 0;
        dev["wb-mio-gpio_211:5"]["K2"] = 0;
        dev["wb-mio-gpio_211:5"]["K3"] = 0;
        dev["wb-mio-gpio_211:5"]["K4"] = 0;
        dev["wb-mio-gpio_211:5"]["K5"] = 0;
        dev["wb-mio-gpio_211:5"]["K6"] = 0;
        dev["wb-mio-gpio_211:5"]["K7"] = 0;
        dev["wb-mio-gpio_211:5"]["K8"] = 0;

        dev["wb-mio-gpio_211:6"]["K1"] = 0;
        dev["wb-mio-gpio_211:6"]["K2"] = 0;
        dev["wb-mio-gpio_211:6"]["K3"] = 0;
        dev["wb-mio-gpio_211:6"]["K4"] = 0;
        dev["wb-mio-gpio_211:6"]["K5"] = 0;
        dev["wb-mio-gpio_211:6"]["K6"] = 0;
        dev["wb-mio-gpio_211:6"]["K7"] = 0;
        dev["wb-mio-gpio_211:6"]["K8"] = 0;
    }
  }
});
