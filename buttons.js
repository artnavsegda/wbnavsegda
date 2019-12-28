var table = [
  [1,1,4,1],
  [1,2,4,2],
  [1,4,4,3],
  [1,5,4,4],
  [1,6,4,5],
  [1,7,6,6],
  [1,8,4,3],
  [1,9,4,4],
  [1,12,5,1],
  [1,13,4,6],
  [1,14,4,8],
  [2,1,5,3],
  [2,2,5,2],
  [2,3,4,2],
  [2,4,4,1],
  [2,5,5,3],
  [2,6,5,2],
  [2,7,5,4],
  [2,8,6,7],
  [2,9,5,7],
  [2,10,5,5],
  [2,11,5,6],
  [2,12,6,1],
  [2,13,6,2],
  [3,1,6,3],
  [3,2,6,1],
  [3,3,6,2],
  [3,4,6,3],
  [3,5,6,1]
];

table.forEach(function(v) {
  //log(v);
  defineRule("bnpress_"+v[0]+"_"+v[1], {
      whenChanged: "wb-mio-gpio_211:"+v[0]+"/Counter "+v[1],
      then: function(newValue, devName, cellName) {
        if (!dev["wb-mio-gpio_211:"+v[0]]["DR"+v[1]])
        {
          dev["wb-mio-gpio_211:"+v[2]]["K"+v[3]] = !dev["wb-mio-gpio_211:"+v[2]]["K"+v[3]];
        }
      }
    }
  )
});
