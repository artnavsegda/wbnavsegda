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
	dev["mh-rc-mbs-1_1"]["AC unit Temperature Setpoint"] = newValue;
  }
});

defineRule("ac_control_cool", {
  whenChanged: "ac_control/cool",
  then: function (newValue, devName, cellName)  {
	dev["mh-rc-mbs-1_1"]["AC unit Temperature Setpoint"] = newValue;
  }
});

defineRule("ac_control_rotation", {
  whenChanged: "ac_control/rotation",
  then: function (newValue, devName, cellName)  {
	dev["mh-rc-mbs-1_1"]["AC unit Fan Speed"] = Math.floor(newValue/25);
  }
});

defineRule("ac_control_mode", {
  whenChanged: "ac_control/mode",
  then: function (newValue, devName, cellName)  {
	dev["mh-rc-mbs-1_1"]["AC unit mode"] = newValue;
  }
});
