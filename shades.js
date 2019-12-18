var shades = [
  {name: "bathroom", dev:2 out:2, in: {addr:209, dev:1, up:1, down:2}},
  {name: "livingroom one", dev:2, out:2, in: {addr:211, dev:1, up:10, down:11}},
  {name: "livingroom two", dev:2, out:3, in: {addr:209, dev:1, up:3, down:4}},
  {name: "kitchen", dev:2, out:4, in: {addr:209, dev:1, up:5, down:6}},
  {name: "cabinet", dev:3, out:1, in: {addr:209, dev:1, up:9, down:10}},
  {name: "bedroom", dev:3, out:2, in: {addr:209, dev:1, up:11, down:12}}
];

defineVirtualDevice("shade one", {
    title: "control shade one",
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

defineRule("shade_one_control", {
  whenChanged: "shade one/target",
  then: function (newValue, devName, cellName)  {
    if (newValue != dev["shade one"]["current"] && timerID == 0)
    {
      	timerID = setInterval(function(){
          if (dev["shade one"]["current"] == dev["shade one"]["target"])
          {
            clearTimeout(timerID);
            timerID = 0;
            dev["shade one"]["state"] = 2;
          }
          else if (dev["shade one"]["current"] > dev["shade one"]["target"])
          {
            dev["shade one"]["current"]--;
            if (dev["shade one"]["state"] != 0)
            {
            	dev["shade one"]["state"] = 0;
            }
          }
          else if (dev["shade one"]["current"] < dev["shade one"]["target"])
          {
            dev["shade one"]["current"]++;
            if (dev["shade one"]["state"] != 1)
            {
            	dev["shade one"]["state"] = 1;
            }
          }
        },1000);
		//dev["shade one"]["current"] = newValue;
    }
    else
    {
      	//setInterval
    }
  }
});
