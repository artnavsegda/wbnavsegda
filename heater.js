var heaters = [
  {name: "bathroom", sensor: "28-00000a42fdb0", out: 1, invert: false},
  {name: "balcony", sensor: "28-000008f2ce1a", out: 2, invert: false},
  {name: "livingroom", sensor: "28-00000a41fa1c", out: 4, invert: true},
  {name: "kitchen", sensor: "28-00000a420768", out: 5, invert: true},
  {name: "cabinet", sensor: "28-00000a42bbf3", out: 6, invert: true},
  {name: "bedroom", sensor: "28-00000a4054fa", out: 7, invert: true}
];

function heater_control(device, sensor, out, invert)
{
  if (dev[device]["active"]) {
    if ( dev["wb-w1"][sensor] > dev[device]["target_temperature"]) {
      dev["wb-mio-gpio_209:5"]["K" + out] = invert;
      dev[device]["current"] = 1;
    } else {
      dev["wb-mio-gpio_209:5"]["K" + out] = !invert;
      dev[device]["current"] = 2;
    }
  }
  else {
    dev["wb-mio-gpio_209:5"]["K" + out] = invert;
    dev[device]["current"] = 0;
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
              type: "switch",
              value : true
          },
        current: {
            type: "range",
            value: 2,
            max: 3,
            readonly: true
        },
        target: {
            type: "range",
            value: 2,
            max: 2
        }
      }
  });

//  heater_control(v.name + "_heater_control", v.sensor, v.out, v.invert);

  defineRule(v.name + "_heater_control_rule", {
    whenChanged: ["wb-w1/" + v.sensor, v.name + "_heater_control/target_temperature", v.name + "_heater_control/active"],
    then: function (newValue, devName, cellName) {
      heater_control(v.name + "_heater_control", v.sensor, v.out, v.invert);
    }
  });

  defineRule(v.name + "_heater_control_target", {
    whenChanged: v.name + "_heater_control/target",
    then: function (newValue, devName, cellName)  {
      dev[v.name + "_heater_control"]["current"] = newValue;
    }
  });
});

setInterval(function() {
	heaters.forEach(function() {
      heater_control(element.name + "_heater_control", element.sensor, element.out, element.invert);
    });
}, 60000);