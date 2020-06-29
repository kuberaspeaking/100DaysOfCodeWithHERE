function getCustomRoute(){
  let url = `https://fleet.ls.hereapi.com/2/calculateroute.json`+
    `?apikey=${window.hereCreds.JS_KEY}`+
    `&overlays=OVERLAYROUTE3`+// your overlay name
    `&mode=fastest;truck`+
    `&waypoint0=52.52687,13.37435`+
    `&waypoint1=52.52687,13.37345`+
    `&routeAttributes=shape`+
    `&storage=readonly`;
    


  fetch(url)
    .then(result => result.json())
    .then(result => {
      console.log(result);
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
      var polyline = new H.map.Polyline(linestring, { style: { strokeColor: "rgba(255,0,0,0.5)", lineWidth: 10 }});

      // Add the polyline to the map:
      map.addObject(polyline);


      var route = result.response.route[0];

      

      let routeShape = route.shape;
      if(routeShape.length > 3){

      let string = new H.geo.LineString.fromLatLngArray(routeShape);

      // let string = new H.geo.LineString();

      // routeShape.forEach(function(point) {
      //   var parts = point.split(',');
      //   string.pushLatLngAlt(parts[0], parts[1]);
      // });

      var routeline = new H.map.Polyline(string, { style: {lineWidth: 4 }});

      map.addObject(routeline);

      // map.getViewModel().setPadding(10,0,0);
      // Zoom the map to fit the rectangle:
      map.getViewModel().setLookAtData({bounds: routeline.getBoundingBox()});
      }
      else{
        map.getViewModel().setLookAtData({bounds: polyline.getBoundingBox()});
        alert("No Route found")

      }    

      

      
    }, error =>{
      console.error(error);
    });
}

getCustomRoute();
