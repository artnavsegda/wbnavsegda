// place your rules here or add more .js files in this directory
log("add your rules to /etc/wb-rules/");

//balcony

defineRule("heater_control_rule", { //название правила - "контроль обогревателя", может быть произвольным
  whenChanged: "wb-w1/28-000008f2ce1a", //при изменении состояния датчика 1-Wire с идентификатором 28-000008f2ce1a
  then: function (newValue, devName, cellName) { //выполняй следующие действия
    if ( newValue > dev["heater_control"]["target_temperature"]) { //если температура датчика больше 30 градусов
      dev["wb-mio-gpio_209:5"]["K2"] = 0; //установи Реле 1 модуля WB-MRM2 с адресом 130 в состояние "выключено"
    } else {
      dev["wb-mio-gpio_209:5"]["K2"] = 1; //установи Реле 1 модуля WB-MRM2 с адресом 130 в состояние "включено"
    }
  }
});

defineRule("heater_control_rule_back", { //название правила - "контроль обогревателя", может быть произвольным
  whenChanged: "heater_control/target_temperature", //при изменении состояния датчика 1-Wire с идентификатором 28-000008f2ce1a
  then: function (newValue, devName, cellName) { //выполняй следующие действия
    if ( newValue < dev["wb-w1"]["28-000008f2ce1a"]) { //если температура датчика больше 30 градусов
      dev["wb-mio-gpio_209:5"]["K2"] = 0; //установи Реле 1 модуля WB-MRM2 с адресом 130 в состояние "выключено"
    } else {
      dev["wb-mio-gpio_209:5"]["K2"] = 1; //установи Реле 1 модуля WB-MRM2 с адресом 130 в состояние "включено"
    }
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
    }
});

//00000a42fdb0

defineRule("heater_control_bath_rule", { //название правила - "контроль обогревателя", может быть произвольным
  whenChanged: "wb-w1/28-00000a42fdb0", //при изменении состояния датчика 1-Wire с идентификатором 28-000008f2ce1a
  then: function (newValue, devName, cellName) { //выполняй следующие действия
    if ( newValue > dev["heater_control"]["target_temperature"]) { //если температура датчика больше 30 градусов
      dev["wb-mio-gpio_209:5"]["K1"] = 0; //установи Реле 1 модуля WB-MRM2 с адресом 130 в состояние "выключено"
    } else {
      dev["wb-mio-gpio_209:5"]["K1"] = 1; //установи Реле 1 модуля WB-MRM2 с адресом 130 в состояние "включено"
    }
  }
});

defineRule("heater_control_bath_rule_back", { //название правила - "контроль обогревателя", может быть произвольным
  whenChanged: "heater_control_bath/target_temperature", //при изменении состояния датчика 1-Wire с идентификатором 28-000008f2ce1a
  then: function (newValue, devName, cellName) { //выполняй следующие действия
    if ( newValue < dev["wb-w1"]["28-00000a42fdb0"]) { //если температура датчика больше 30 градусов
      dev["wb-mio-gpio_209:5"]["K1"] = 0; //установи Реле 1 модуля WB-MRM2 с адресом 130 в состояние "выключено"
    } else {
      dev["wb-mio-gpio_209:5"]["K1"] = 1; //установи Реле 1 модуля WB-MRM2 с адресом 130 в состояние "включено"
    }
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
