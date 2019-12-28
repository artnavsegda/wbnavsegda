var heaters = [
  {name: "balcony", sensor: "28-000008f2ce1a", out: 1},
  {name: "bathroom", sensor: "28-00000a42fdb0", out: 2},
  {name: "livingroom", sensor: "28-00000a41fa1c", out: 4},
  {name: "kitchen", sensor: "28-00000a420768", out: 5},
  {name: "cabinet", sensor: "28-00000a42bbf3", out: 6},
  {name: "bedroom", sensor: "28-00000a4054fa", out: 7}
];

function heater_control(device, sensor, out)
{
  if (dev[device]["active"] == 1) {
    if ( dev["wb-w1"][sensor] > dev[device]["target_temperature"]) {
      dev["wb-mio-gpio_209:5"]["K" + out] = 0;
    } else {
      dev["wb-mio-gpio_209:5"]["K" + out] = 1;
    }
  }
  else {
    dev["wb-mio-gpio_209:5"]["K" + out] = 0;
  }
}

heaters.forEach(function (v) {
  //log(v);
  defineVirtualDevice(v.name + "_heater_control", {
      title: v.name + " heater control",
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

  defineRule(v.name + "_heater_control_rule", {
    whenChanged: "wb-w1/" + v.sensor,
    then: function (newValue, devName, cellName) {
      heater_control(v.name + "_heater_control", v.sensor, v.out);
    }
  });

  defineRule(v.name + "_heater_control_rule_back", {
    whenChanged: v.name + "_heater_control/target_temperature",
    then: function (newValue, devName, cellName) {
      heater_control(v.name + "_heater_control", v.sensor, v.out);
    }
  });

  defineRule(v.name + "_heater_control_rule_active", {
    whenChanged: v.name + "_heater_control/active",
    then: function (newValue, devName, cellName) {
      heater_control();
    }
  });

  defineRule(v.name + "_heater_control_target", {
    whenChanged: v.name + "_heater_control/target",
    then: function (newValue, devName, cellName)  {
      switch(newValue)
      {
        case 0:
          dev[v.name + "_heater_control"]["current"] = 1;
         break;
        case 1:
          dev[v.name + "_heater_control"]["current"] = 2;
         break;
        case 2:
          dev[v.name + "_heater_control"]["current"] = 3;
        break;
      }
    }
  });
});
