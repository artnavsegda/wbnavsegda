defineVirtualDevice("ac_control", {
    title: "AC Control",
    cells: {
      enabled: {
          type: "switch",
          value: false
      },
      temperature: {
          type: "range",
          value: 10,
          max: 100
      },
      heat: {
          type: "range",
          value: 10,
          max: 100
      },
      cool: {
          type: "range",
          value: 10,
          max: 100
      },
      mode: {
          type: "range",
          value: 4,
          max: 4
      },
      targetmode: {
          readonly: true,
          type: "range",
          value: 4,
          max: 4
      },
      rotation: {
          type: "range",
          value: 0,
          max: 100
      }
    }
});

defineRule("ac_control_enable", {
  whenChanged: "ac_control/enabled",
  then: function (newValue, devName, cellName)  {
	dev["mh-rc-mbs-1_1"]["AC unit on off"] = newValue;
  }
});

defineRule("ac_control_temperature", {
  whenChanged: "ac_control/temperature",
  then: function (newValue, devName, cellName)  {
	dev["mh-rc-mbs-1_1"]["AC unit Temperature Setpoint"] = newValue;
  }
});

defineRule("ac_control_heat", {
  whenChanged: "ac_control/heat",
  then: function (newValue, devName, cellName)  {
    if (dev["ac_control"]["mode"] == 0)
    {
      ac_control(newValue);
    }
    else
	   dev["mh-rc-mbs-1_1"]["AC unit Temperature Setpoint"] = newValue;
  }
});

defineRule("ac_control_cool", {
  whenChanged: "ac_control/cool",
  then: function (newValue, devName, cellName)  {
    if (dev["ac_control"]["mode"] == 0)
    {
      ac_control(newValue);
    }
    else
	   dev["mh-rc-mbs-1_1"]["AC unit Temperature Setpoint"] = newValue;
  }
});

defineRule("ac_control_rotation", {
  whenChanged: "ac_control/rotation",
  then: function (newValue, devName, cellName)  {
	dev["mh-rc-mbs-1_1"]["AC unit Fan Speed"] = Math.floor(newValue/25);
  }
});

function ac_control(control_temperature)
{
  if (control_temperature > dev["ac_control"]["cool"])
  {
    dev["ac_control"]["targetmode"] = 4;
    dev["mh-rc-mbs-1_1"]["AC unit mode"] = 4;
    dev["mh-rc-mbs-1_1"]["AC unit Temperature Setpoint"] = dev["ac_control"]["cool"];
  }
  else if (control_temperature < dev["ac_control"]["heat"])
  {
    dev["ac_control"]["targetmode"] = 1;
    dev["mh-rc-mbs-1_1"]["AC unit mode"] = 1;
    dev["mh-rc-mbs-1_1"]["AC unit Temperature Setpoint"] = dev["ac_control"]["heat"];
  }
  else
  {
    dev["ac_control"]["targetmode"] = 3;
    dev["mh-rc-mbs-1_1"]["AC unit mode"] = 3;
    dev["mh-rc-mbs-1_1"]["AC unit Temperature Setpoint"] = dev["mh-rc-mbs-1_1"]["AC unit Temperature Reference"];
  }
}

defineRule("ac_control_mode", {
  whenChanged: "ac_control/mode",
  then: function (newValue, devName, cellName)  {
    if (newValue == 0)
    {
      ac_control(dev["mh-rc-mbs-1_1"]["AC unit Temperature Reference"]);
    }
    else
      dev["mh-rc-mbs-1_1"]["AC unit mode"] = newValue;
      dev["ac_control"]["targetmode"] = newValue;
  }
});

defineRule("ac_control_auto", {
  whenChanged: "mh-rc-mbs-1_1/AC unit Temperature Reference",
  then: function (newValue, devName, cellName)  {
    if (dev["ac_control"]["mode"] == 0)
    {
      ac_control(newValue);
    }
  }
});
