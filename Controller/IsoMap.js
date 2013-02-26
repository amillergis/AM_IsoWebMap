var map;

/////////////////////////////////////////////////////////////////////
var markers;
//disable the autosize for the purpose of our matrix
OpenLayers.Popup.FramedCloud.prototype.autoSize = false;
AutoSizeFramedCloud = OpenLayers.Class(OpenLayers.Popup.FramedCloud, {
  'autoSize': true
});
AutoSizeFramedCloudMinSize = OpenLayers.Class(OpenLayers.Popup.FramedCloud, {
  'autoSize': true, 
  'minSize': new OpenLayers.Size(400,400)
});
AutoSizeFramedCloudMaxSize = OpenLayers.Class(OpenLayers.Popup.FramedCloud, {
  'autoSize': true, 
  'maxSize': new OpenLayers.Size(100,100)
});
/**
* Function: addMarker
* Add a new marker to the markers layer given the following lonlat, 
*     popupClass, and popup contents HTML. Also allow specifying 
*     whether or not to give the popup a close box.
* 
* Parameters:
* ll - {<OpenLayers.LonLat>} Where to place the marker
* popupClass - {<OpenLayers.Class>} Which class of popup to bring up 
*     when the marker is clicked.
* popupContentHTML - {String} What to put in the popup
* closeBox - {Boolean} Should popup have a close box?
* overflow - {Boolean} Let the popup overflow scrollbars?
*/

function addMarker(ll, popupClass, popupContentHTML, closeBox, overflow) {
  var feature = new OpenLayers.Feature(markers, ll); 
  feature.closeBox = closeBox;
  feature.popupClass = popupClass;
  feature.data.popupContentHTML = popupContentHTML;
  feature.data.overflow = (overflow) ? "auto" : "hidden";

  var marker = feature.createMarker();

  var markerClick = function (evt) {
    if (this.popup == null) {
      this.popup = this.createPopup(this.closeBox);
      map.addPopup(this.popup);
      this.popup.show();
    }
    else {
      this.popup.toggle();
    }
    currentPopup = this.popup;
    OpenLayers.Event.stop(evt);
  };
  marker.events.register("mousedown", feature, markerClick);
  markers.addMarker(marker);
}

function addMarkers() {
  var ll, popupClass, popupContentHTML;
  //anchored bubble popup wide long fixed contents autosize closebox
  ll = new OpenLayers.LonLat(800,300);
  popupClass = AutoSizeFramedCloud;
  popupContentHTML = '<img src="../Model/Brentwood.png"></img>';
  addMarker(ll, popupClass, popupContentHTML, true);
}

/////////////////////////////////////////////////////////////////////////////////////////


var style_hidden = OpenLayers.Util.extend({},OpenLayers.Feature.Vector.style['default'] );
  style_hidden.strokeColor = "yellow";
  style_hidden.fillColor = "green";
  style_hidden.strokeWidth = 1;
  style_hidden.fillOpacity = 0;

var style_blue = OpenLayers.Util.extend({},OpenLayers.Feature.Vector.style['default'] );
  style_blue.strokeColor = "yellow";
  style_blue.fillColor = "yellow";
  style_blue.strokeWidth = 1;


function init(){
  
  map = new OpenLayers.Map('map');
//////////////////////////////////////////////////
  markers = new OpenLayers.Layer.Markers("zibo");
  map.addLayer(markers);
  addMarkers();
/////////////////////////////////////////////////
  var graphic = new OpenLayers.Layer.Image(
    'City Lights',
    '../Model/Brentwood.png',
    new OpenLayers.Bounds(0, 0, 1681, 918),
    new OpenLayers.Size(1681, 918),
    {numZoomLevels: 5}
  );

  graphic.events.on({
    loadstart: function() {
      OpenLayers.Console.log("loadstart");
    },
    loadend: function() {
      OpenLayers.Console.log("loadend");
    }
  });

  map.addLayers([graphic]);

  var vectors = new OpenLayers.Layer.Vector("vector", {isBaseLayer: false});
  
  map.addLayers([vectors]);
  var feature = new OpenLayers.Feature.Vector(
    OpenLayers.Geometry.fromWKT(
      "POLYGON ((381.399108886719 347.054077148438,382.390319824219 374.148681640625,426.006103515625 391.991516113281,416.093505859375 397.939086914063,426.997314453125 400.58251953125,438.562072753906 398.930297851563,444.179321289063 402.564880371094,448.144287109375 400.58251953125,531.410522460938 388.356872558594,539.010314941406 373.157470703125,538.349487304688 361.262329101563,518.854675292969 344.741088867188,519.184875488281 342.758728027344,502.33349609375 332.515502929688,430.301513671875 342.097717285156,417.084716796875 338.132690429688,409.484924316406 339.784912109375,408.493713378906 344.741088867188,381.399108886719 347.054077148438))"
    ),
    null,
    style_hidden
  );
  vectors.addFeatures([feature]);
  var feature2 = new OpenLayers.Feature.Vector(
    OpenLayers.Geometry.fromWKT(
      "POLYGON ((324.236083984375 342.097717285156,307.715087890625 349.367126464844,303.749877929688 346.393310546875,287.889709472656 352.671325683594,279.959716796875 349.697509765625,261.786499023438 353.662475585938,259.803894042969 375.470275878906,258.482299804688 378.774719238281,283.924682617188 384.061279296875,284.585510253906 391.991516113281,376.1123046875 422.059875488281,383.051330566406 413.79931640625,389.329284667969 409.834289550781,392.303100585938 423.7119140625,398.250671386719 425.03369140625,400.233093261719 416.442687988281,404.198303222656 417.103515625,409.154479980469 413.79931640625,412.046508789063 386.280700683594,382.390319824219 374.148681640625,375.781921386719 371.505310058594,376.1123046875 359.279724121094,356.617492675781 350.688720703125,352.322082519531 353.001708984375,324.236083984375 342.097717285156))"
    ),
    null,
    style_hidden
  );
  vectors.addFeatures([feature2]);
  var feature3 = new OpenLayers.Feature.Vector(
    OpenLayers.Geometry.fromWKT(
      "POLYGON ((354.763305664063 415.046325683594,296.480712890625 430.981323242188,297.141479492188 436.598510742188,286.568115234375 440.233093261719,312.010498046875 457.414916992188,320.271118164063 466.005920410156,320.271118164063 469.640502929688,327.870727539063 472.614318847656,341.087707519531 476.249084472656,341.418090820313 479.222717285156,368.182312011719 486.822509765625,395.276916503906 481.866088867188,395.607299804688 463.693115234375,407.502502441406 460.058288574219,416.093505859375 460.719116210938,419.067077636719 458.406311035156,420.058471679688 440.893920898438,409.815490722656 436.928894042969,404.198303222656 438.911315917969,372.147277832031 427.01611328125,372.137329101563 420.754089355469,354.763305664063 415.046325683594))"
    ),
    null,
    style_hidden
  );
  vectors.addFeatures([feature3]);

/////////////////////////////////////////////////////////////////

  var highlightCtrl = new OpenLayers.Control.SelectFeature(vectors, {
                hover: true,
                highlightOnly: true,
                renderIntent: "temporary",
                selectStyle: style_blue
                //eventListeners: {
                //    beforefeaturehighlighted: report,
                //    featurehighlighted: report,
                //    featureunhighlighted: report
                //}
            });
  map.addControl(highlightCtrl);
  highlightCtrl.activate();
  map.addControl(new OpenLayers.Control.LayerSwitcher());
  map.setCenter(new OpenLayers.LonLat(840, 459), 0);
}
