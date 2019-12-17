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
