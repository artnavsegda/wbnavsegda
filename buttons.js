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
  [2,2,5,3],
  [2,3,4,1],
  [2,4,4,2],
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
]

table.forEach(function(value) {
  //console.log(value);
});

function makeMotionDetector(name, timeout_ms, detector_control, relay_control) {
 var motion_timer_id = null;
 defineRule(name, {
     whenChanged: "wb-gpio/" + detector_control,
     then: function(newValue, devName, cellName) {
         if (!newValue) {
             dev["wb-gpio"][relay_control] = 1;
             if (motion_timer_id) {
                 clearTimeout(motion_timer_id);
             }

             motion_timer_id = setTimeout(function() {
                 dev["wb-gpio"][relay_control] = 0;
                 motion_timer_id = null;
             }, timeout_ms);
         }
     }
 });
}

makeMotionDetector("motion_detector_1", 20000, "EXT1_DR1", "EXT2_R3A1");
makeMotionDetector("motion_detector_2", 10000, "EXT1_DR2", "EXT2_R3A2");
makeMotionDetector("motion_detector_3", 10000, "EXT1_DR3", "EXT2_R3A3");
