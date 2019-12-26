var shades = [
  {name: "bathroom", dev:2, out:1, in: {addr:209, dev:1, up:1, down:2}, speed: 70},
  {name: "livingroom one", dev:2, out:2, in: {addr:211, dev:1, up:10, down:11}, speed: 1000},
  {name: "livingroom two", dev:2, out:3, in: {addr:209, dev:1, up:3, down:4}, speed: 100},
  {name: "kitchen", dev:2, out:4, in: {addr:209, dev:1, up:5, down:6}, speed: 1000},
  {name: "cabinet", dev:3, out:1, in: {addr:209, dev:1, up:9, down:10}, speed: 1000},
  {name: "bedroom", dev:3, out:2, in: {addr:209, dev:1, up:11, down:12}, speed: 150}
];

shades.forEach(function (v) {
  //log(v);
  var devname = "shade "+v.name;
  defineVirtualDevice(devname, {
      title: "control " + devname,
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
  defineRule(devname + " control", {
    whenChanged: devname + "/target",
    then: function (newValue, devName, cellName)  {
      if (newValue != dev[devname]["current"] && timerID == 0)
      {
        timerID = setInterval(function(){
          if (dev[devname]["current"] == dev[devname]["target"])
          {
            clearTimeout(timerID);
            timerID = 0;
            dev[devname]["state"] = 2;
            dev["wb-mio-gpio_209:"+v.dev]["ON"+v.out] = 0;
          }
          else if (dev[devname]["current"] > dev[devname]["target"])
          {
            dev[devname]["current"]--;
            if (dev[devname]["state"] != 0)
            {
            	dev[devname]["state"] = 0;
            }
            dev["wb-mio-gpio_209:"+v.dev]["ON"+v.out] = 1;
            dev["wb-mio-gpio_209:"+v.dev]["DIR"+v.out] = 1;
          }
          else if (dev[devname]["current"] < dev[devname]["target"])
          {
            dev[devname]["current"]++;
            if (dev[devname]["state"] != 1)
            {
            	dev[devname]["state"] = 1;
            }
            dev["wb-mio-gpio_209:"+v.dev]["ON"+v.out] = 1;
            dev["wb-mio-gpio_209:"+v.dev]["DIR"+v.out] = 0;
          }
        },v.speed);
      }
    }
  });
});
