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
