
function uploadCustomRoute(){
  let url = `https://fleet.ls.hereapi.com/2/overlays/upload.json`+
    `?apikey=${window.hereCreds.JS_KEY}`+
    `&map_name=OVERLAYROUTE3`+
    `&overlay_spec=[{
      "op":"create",
      "shape":[
        [52.52687,13.37435],
        [52.52687,13.37425],
        [52.52687,13.37415],
        [52.52687,13.37405],
        [52.52687,13.37395],
        [52.52687,13.37385],
        [52.52687,13.37375],
        [52.52687,13.37365],
        [52.52687,13.37355],
        [52.52687,13.37345]],
      "layer":"LINK_ATTRIBUTE_FCN",
      "data":{"TRAVEL_DIRECTION":"B"}
    }]`+
    `&storage=readonly`;
    


  fetch(url)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      let points = [
        {lat:52.52687,lng:13.37435},
        {lat:52.52687,lng:13.37425},
        {lat:52.52687,lng:13.37415},
        {lat:52.52687,lng:13.37405},
        {lat:52.52687,lng:13.37395},
        {lat:52.52687,lng:13.37385},
        {lat:52.52687,lng:13.37375},
        {lat:52.52687,lng:13.37365},
        {lat:52.52687,lng:13.37355},
        {lat:52.52687,lng:13.37345}];
     

      var linestring = new H.geo.LineString();
      points.forEach(function(point) {
        linestring.pushPoint(point);
      });

      // Initialize a polyline with the linestring:
      var polyline = new H.map.Polyline(linestring, { style: {strokeColor: "rgba(255,0,0,0.5)",  lineWidth: 10 }});

      // Add the polyline to the map:
      map.addObject(polyline);

      // Zoom the map to fit the rectangle:
      map.getViewModel().setLookAtData({bounds: polyline.getBoundingBox()});

      
    }, error =>{
      console.error(error);
    });
}

uploadCustomRoute();

