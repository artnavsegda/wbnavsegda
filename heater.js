var heaters = [
  {name: "balcony", sensor: "28-000008f2ce1a"},
  {name: "bathroom", sensor: "28-00000a42fdb0"},
  {name: "livingroom", sensor: "28-00000a41fa1c"},
  {name: "kitchen", sensor: "28-00000a420768"},
  {name: "cabinet", sensor: "28-00000a42bbf3"},
  {name: "bedroom", sensor: "28-00000a4054fa"}
];



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
