defineVirtualDevice("ac_control", {
    title: "AC Control",
    cells: {
      enabled: {
          type: "switch",
          value: false
      },
      temperature: {
          type: "range",
          value: 10
      },
      mode: {
          type: "range",
          value: 4,
          max: 4
      },
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

defineRule("ac_control_mode", {
  whenChanged: "ac_control/mode",
  then: function (newValue, devName, cellName)  {
	dev["mh-rc-mbs-1_1"]["AC unit mode"] = newValue;
  }
});
