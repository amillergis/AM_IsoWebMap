var popup;
var map;
var selectCtrl;
var selectedFeature;

var zoomify_width = 10000;
var zoomify_height = 5487;
var zoomify_url = "../Model/BrentwoodCampusMap/";
var map, zoomify;

var style_hidden = OpenLayers.Util.extend({},OpenLayers.Feature.Vector.style['default'] );
  style_hidden.strokeColor = "yellow";
  style_hidden.fillColor = "green";
  style_hidden.strokeWidth = 0;
  style_hidden.fillOpacity = 0;

var style_blue = OpenLayers.Util.extend({},OpenLayers.Feature.Vector.style['default'] );
  style_blue.strokeColor = "yellow";
  style_blue.fillColor = "yellow";
  style_blue.strokeWidth = 1;

  
function init(){
    /* First we initialize the zoomify pyramid (to get number of tiers) */
    var zoomify = new OpenLayers.Layer.Zoomify( 
        "Zoomify", 
        zoomify_url,
        new OpenLayers.Size( zoomify_width, zoomify_height ),
        {transitionEffect: 'resize'}
    );

    /* Map with raster coordinates (pixels) from Zoomify image */
    var options = {
        maxExtent: new OpenLayers.Bounds(0, 0, zoomify_width, zoomify_height),
        maxResolution: Math.pow(2, zoomify.numberOfTiers-1 ),
        numZoomLevels: zoomify.numberOfTiers,
        units: 'pixels'
    };

    map = new OpenLayers.Map("map", options);
    map.addLayer(zoomify);
    
    
    var vectors = new OpenLayers.Layer.Vector("vector", {isBaseLayer: false});

    var feature = new OpenLayers.Feature.Vector(
        OpenLayers.Geometry.fromWKT(
            "POLYGON((2571.78088378906 3842.92028808594,2676.16510009766 3779.70172119141,2701.89349365234 3720.89379882813,2657.78747558594 3688.54949951172,2630.58892822266 3701.78118896484,2650.4365234375 3678.25799560547,2698.953125 3706.19177246094,2743.05908203125 3667.96661376953,2777.60870361328 3592.98651123047,2498.27111816406 3401.86071777344,2480.62872314453 3434.205078125,2485.77447509766 3436.41040039063,2374.77447509766 3544.46997070313,2351.25128173828 3569.46331787109,2343.90032958984 3587.10571289063,2325.52270507813 3576.07922363281,2307.14532470703 3609.15869140625,2335.0791015625 3624.59582519531,2316.70147705078 3657.67529296875,2352.72149658203 3676.78790283203,2335.81408691406 3710.60241699219,2364.48309326172 3725.30438232422,2524.73468017578 3814.98651123047,2527.67510986328 3810.57598876953,2571.78088378906 3842.92028808594))"
        ),
        {"bname":"1"},
        style_hidden
    );
    var feature2 = new OpenLayers.Feature.Vector(
        OpenLayers.Geometry.fromWKT(
            "POLYGON ((1943.69610595703 3995.09210205078,1958.0712890625 3966.34149169922,1999.89031982422 3988.55792236328,2054.77770996094 3929.75,2125.34729003906 3814.74780273438,2112.27868652344 3809.52038574219,2185.4619140625 3729.80291748047,2169.77990722656 3721.9619140625,2198.5302734375 3677.529296875,2144.94989013672 3640.93762207031,2139.72247314453 3631.78979492188,2120.11987304688 3651.39239501953,1988.12872314453 3579.51599121094,1999.89031982422 3565.14080810547,1890.11547851563 3506.33282470703,1877.04711914063 3528.54919433594,1870.51287841797 3523.32177734375,1731.98748779297 3672.30187988281,1739.82849121094 3677.529296875,1645.73590087891 3779.46301269531,1712.38488769531 3826.50939941406,1707.15747070313 3836.96411132813,1737.21490478516 3852.64617919922,1729.37371826172 3864.40777587891,1760.73809814453 3882.70361328125,1769.88592529297 3910.14727783203,1943.69610595703 3995.09210205078))"
        ),
        {"bname":"2"},
        style_hidden
    );
    var feature3 = new OpenLayers.Feature.Vector(
        OpenLayers.Geometry.fromWKT(
            "POLYGON ((2335.81408691406 3710.60241699219,2352.72149658203 3676.78790283203,2316.70147705078 3657.67529296875,2327.45849609375 3638.31280517578,2318.68908691406 3632.29730224609,2306.92749023438 3646.99938964844,2290.75531005859 3638.91320800781,2242.23870849609 3685.22448730469,2240.03350830078 3693.31060791016,2216.51031494141 3717.56878662109,2224.59631347656 3725.65490722656,2195.92749023438 3755.05889892578,2241.50372314453 3780.05230712891,2192.25207519531 3829.30389404297,2220.18572998047 3844.00592041016,2214.30487060547 3851.35687255859,2570.828125 4043.95281982422,2598.76190185547 4010.13830566406,2598.02667236328 4024.10522460938,2640.66247558594 4046.89331054688,2669.33129882813 4019.69458007813,2708.29168701172 4031.45617675781,2725.93408203125 4009.40319824219,2750.19232177734 3957.9462890625,2667.86108398438 3904.28399658203,2656.09948730469 3914.57537841797,2643.60290527344 3907.95947265625,2650.95391845703 3891.05230712891,2623.75531005859 3876.35021972656,2625.22552490234 3871.20458984375,2571.78088378906 3842.92028808594,2527.67510986328 3810.57598876953,2524.73468017578 3814.98651123047,2335.81408691406 3710.60241699219))"
        ),
        {"bname":"3"},
        style_hidden
    );
    var feature4 = new OpenLayers.Feature.Vector(
        OpenLayers.Geometry.fromWKT(
            "POLYGON ((1435.95892333984 3891.28820800781,1506.52850341797 3811.89752197266,1527.111328125 3823.65911865234,1655.50848388672 3677.61932373047,1638.84631347656 3666.837890625,1677.07147216797 3613.91088867188,1111.53527832031 3307.12939453125,970.396118164063 3488.45379638672,1019.40289306641 3513.93731689453,954.714111328125 3598.22869873047,1138.97888183594 3688.40081787109,1116.43591308594 3712.90411376953,1152.70068359375 3728.58630371094,1143.87951660156 3740.34790039063,1203.66772460938 3768.77178955078,1198.76708984375 3777.59289550781,1435.95892333984 3891.28820800781))"
        ),
        {"bname":"4"},
        style_hidden
    );
    var feature5 = new OpenLayers.Feature.Vector(
        OpenLayers.Geometry.fromWKT(
            "POLYGON ((2469.52257430094 2671.66753889185,2326.04167752123 2519.80819558485,2343.84587639171 2496.76746763482,2224.45301337793 2440.21295357567,2143.81046555284 2477.91596294844,2123.91165505054 2507.24052579393,2100.87092710051 2516.66627813712,2084.11403404595 2504.0986083462,2070.49905843912 2523.99741884849,2070.49905843912 2533.42317119169,2055.83677701637 2525.0447246644,2039.07988396181 2547.03814679852,2044.31641304136 2561.70042822126,2026.51221417088 2573.22079219628,2013.94454437996 2561.70042822126,1994.04573387766 2582.64654453947,1998.2349571413 2595.21421433039,1979.38345245492 2607.78188412132,1963.67386521626 2595.21421433039,1952.15350124125 2611.97110738496,1947.96427797761 2616.1603306486,1905.02473952529 2607.78188412132,1874.65287086389 2639.20105859863,1879.88939994344 2663.28909236456,1880.93670575935 2682.14059705095,1866.27442433661 2692.61365521005,1850.56483709795 2681.09329123504,1830.66602659566 2705.18132500098,1833.80794404339 2719.84360642372,1819.14566262064 2727.17474713509,1805.53068701381 2708.32324244871,1744.78694969101 2787.91848445789,1917.59240931621 2918.83171144668,1915.49779768439 2929.30476960578,1938.53852563442 2934.54129868533,2033.84335488225 3006.80539998314,2053.74216538455 2999.47425927177,2073.64097588685 2971.19700224219,2079.92481078231 2975.38622550583,2096.68170383687 2968.05508479446,2106.10745618007 2948.15627429217,2110.29667944371 2951.2981917399,2188.84461563698 2927.21015797396,2202.45959124381 2904.16943002393,2237.02068316885 2893.69637186483,2244.35182388023 2873.79756136253,2277.86560998936 2864.37180901934,2288.33866814846 2841.33108106932,2322.8997600735 2832.95263454203,2330.23090078487 2815.14843567156,2356.41354618263 2808.8646007761,2367.93391015764 2784.77656701016,2399.35308463495 2776.39812048288,2477.90102082823 2683.18790286686,2469.52257430094 2671.66753889185))"
        ),
        {"bname":"5"},
        style_hidden
    );
    var feature6 = new OpenLayers.Feature.Vector(
        OpenLayers.Geometry.fromWKT(
            "POLYGON ((1524.95185606082 2759.10248986869,1402.06797366067 2911.31093511432,1372.74341081519 2897.34685756885,1294.54457656055 2978.33850733258,1284.76972227872 2974.14928406894,1244.27389739685 3023.02355547808,1349.00447898789 3084.46549667816,1353.19370225153 3081.67268116906,1368.55418755154 3091.44753545089,1364.3649642879 3095.63675871453,1727.43098047014 3298.11588312386,1731.62020373378 3291.13384435112,1739.99865026107 3298.11588312386,1739.99865026107 3306.49432965114,1836.35078532482 3356.76500881484,1899.18913427943 3289.73743659658,1899.18913427943 3282.75539782384,1907.56758080672 3271.58413578746,1929.91010487947 3286.94462108748,1945.27059017949 3256.22365048745,1973.19874527043 3261.80928150563,2031.84787096141 3161.26792317824,2034.6406864705 3138.92539910549,2010.9017546432 3120.77209829638,2020.67660892503 3099.82598197817,1938.28855140675 3059.33015709631,1921.53165835219 3070.50141913268,1913.1532118249 3064.9157881145,1914.54961957945 3062.1229726054,1742.79146577016 2974.14928406894,1788.87292167021 2880.58996451428,1681.34952457009 2819.14802331421,1667.38544702462 2840.09413963242,1645.04292295187 2827.52646984149,1640.85369968822 2820.54443106876,1524.95185606082 2759.10248986869))"
        ),
        {"bname":"6"},
        style_hidden
    );

    vectors.addFeatures([feature,feature2,feature3,feature4,feature5,feature6]);
    map.addLayers([vectors]);
    
    var highlightCtrl = new OpenLayers.Control.SelectFeature(vectors, {
        hover: true,
        highlightOnly: true,
        selectStyle: style_blue,
    });
    map.addControl(highlightCtrl);
    highlightCtrl.activate();

    selectCtrl = new OpenLayers.Control.SelectFeature(vectors, {
        selectStyle: OpenLayers.Feature.Vector.style['default'],
        onSelect:onFeatureSelect,
        onUnselect: onFeatureUnselect
    });
    map.addControl(selectCtrl);
    selectCtrl.activate();
    
    map.setBaseLayer(zoomify);
    map.zoomTo(4);
};
  
function onPopupClose(evt) {
  selectCtrl.unselect(selectedFeature);
}

function onFeatureSelect(feature) {
  selectedFeature = feature;
  //dialog = $("<div title='Feature Info'></div>").dialog();
  if (feature.attributes.bname=='4'){
    html = crooks_html;
  }
  else {if(feature.attributes.bname=='6'){
    html = cfta_html;
  }
  else {
    html = blank_html;
  };}    
  popup = new OpenLayers.Popup.Anchored("chicken", 
    feature.geometry.getBounds().getCenterLonLat(),
    new OpenLayers.Size(660,460),
    html,
    null, true, onPopupClose);
  popup.panMapIfOutOfView = true;
  popup.setBackgroundColor("transparent");
  map.addPopup(popup);
}

function onFeatureUnselect(feature) {
    map.removePopup(popup);
}    

cfta_html = '<div id ="container" style="margin:auto;height:450px;width:650px;border:2px solid black;border-radius:15px;background-color:rgba(255,255,255,0.85);">\
    <div id ="photo_frame" style = "height:350px;width:350px;float:left;text-align:center">\
        <h5 id="title">Centre for Art and Humanities</h5><h5> (30,000 sq. ft.)</h5>\
        <div>\
            <img id="photo" src="../Model/Centre_for_Art_and_Humanities/full/DSC06626 (2).JPG" style="margin:0 auto;display:block"/>\
        </div>\
    </div>\
    <div id ="text" style = "height:420px;width:270px;float:right;padding:15px;overflow-y:scroll;">\
        <h5 id="title"></h5>\
            The completion of the Centre for Arts and Humanities is the final piece in a strategic \
            ten year campus development plan. The new building includes 8 humanities classrooms located \
            within a centre for visual arts; a concept that is rooted in our educational philosophy. By \
            intent, each student interacts with the working spaces and galleries of our visual artists \
            while attending global studies courses in modern languages, history, geography, environmental \
            studies, comparative government and art history. This building speaks to all levels of the \
            power of visual image and the dialectic between artist and audience.  \
            The building incorporates connections to the waterfront and to Campbell Common, and reinforces the north-south \
            pedestrian spine on campus while preserving views from the Bunch Centre.</br></br>  \
            *2-D Studios (drawing, painting, design, printmaking).  These ocean view studios constitute 4,600 sq. feet \
            including a spray booth, matting and framing space and print making facilities.</br></br>  \
            *3-D Applied Art Studios (pottery and sculpture).  With over 5,000 sq. feet of studio space, these studios \
            combine creative space with areas for kilns, vacuums and art storage.  Both studios have ocean views.</br></br>\
            *Photography Studio. 2,300 square feet include a digital darkroom, wet dark room, advanced dark room, film \
            processing facilities, projection room and a large work area.</br></br>\
            *Digital Media Labs.  A 2,300 square foot facility for graphic design, digital film, photo and editing suite, \
            including 2 IT labs, and a CAD model room.</br></br>\
            *Galleries.  A spectacular 25\' gallery, which leads to a corridor with asymmetric walls, gives emphasis to art \
            work and can be found in the Visual Arts and Global Thinking Centre.  As well, an art gallery for display of \
            current student art is found in the entranceway of the Ross Academic building.\
        </h5>\
    </div>\
      <div id ="thumbs" style = "height:100px;width:350px;float:right;">\
        <div id ="image_bar" style = "height:60px;width:350px;margin-top:20px;text-align:center">\
            <img src = "../Model/Centre_for_Art_and_Humanities/thumbs/BCS Centre Classroom.JPG" onclick = "alert("hello kitty");"/>\
            <img src = "../Model/Centre_for_Art_and_Humanities/thumbs/Digital_Media_studio.JPG" onclick="$("#photo").attr("src","../Model/Centre_for_Art_and_Humanities/thumbs/BCS Centre Classroom.JPG"/>\
            <img src = "../Model/Centre_for_Art_and_Humanities/thumbs/hall.JPG" onclick="$("#photo").attr("src","../Model/Centre_for_Art_and_Humanities/thumbs/BCS Centre Classroom.JPG"/>\
            <img src = "../Model/Centre_for_Art_and_Humanities/thumbs/Pottery_studio.JPG" onclick="$("#photo").attr("src","../Model/Centre_for_Art_and_Humanities/thumbs/BCS Centre Classroom.JPG"/>\
            <img src = "../Model/Centre_for_Art_and_Humanities/thumbs/DSC06626 (2).JPG" onclick="$("#photo").attr("src","../Model/Centre_for_Art_and_Humanities/thumbs/BCS Centre Classroom.JPG"/>\
        </div>\
    </div>\
</div>';


crooks_html = '<div id ="container" style="margin:auto;height:450px;width:650px;border:2px solid black;border-radius:15px;background-color:rgba(255,255,255,0.85);">\
    <div id ="photo_frame" style = "height:350px;width:350px;float:left;text-align:center">\
        <h5 id="title">Crooks Hall: Dining Room and Student Services Centre</h5><h5> (30,000 sq. ft.)</h5>\
        <div>\
            <img id="photo" src="../Model/Crooks_Hall/full/4DS_2572.jpg" style="margin:0 auto;display:block"/>\
        </div>\
    </div>\
    <div id ="text" style = "height:420px;width:270px;float:right;padding:15px;overflow-y:scroll;">\
        <h5 id="title"></h5>\
            The Art and Mary Jane Crooks Hall is a one stop shop for the bulk of our student services on campus. This building is home to the Dining Hall, Campus Store, \
            Laundry services and Student Centre where students can relax and socialize with their peers. Crooks Hall was the recipient of two prestigious awards: the Judges\' \
            Choice Award for best overall entry and the Excellence Award in the Institutional category. Awaiting the final paperwork for certification as a LEEDS (Leadership in \
            Energy & Environmental Design) Gold Standard building, Crooks Hall is a state of the art green project, recognized as "one of the smartest buildings" in North America \
            featuring a geothermal system linked with the ocean, a grey water recovery system and automatic lighting controls.\
    </div>\
      <div id ="thumbs" style = "height:100px;width:350px;float:right;">\
        <div id ="image_bar" style = "height:60px;width:350px;margin-top:20px;text-align:center">\
            <img src = "../Model/Crooks_Hall/thumbs/3DS_2744.jpg" onclick = "alert("hello kitty");"/>\
            <img src = "../Model/Crooks_Hall/thumbs/3DS_2877.jpg" onclick="$("#photo").attr("src","../Model/Centre_for_Art_and_Humanities/thumbs/BCS Centre Classroom.JPG"/>\
            <img src = "../Model/Crooks_Hall/thumbs/4DS_0855.jpg" onclick="$("#photo").attr("src","../Model/Centre_for_Art_and_Humanities/thumbs/BCS Centre Classroom.JPG"/>\
            <img src = "../Model/Crooks_Hall/thumbs/4DS_2663.jpg" onclick="$("#photo").attr("src","../Model/Centre_for_Art_and_Humanities/thumbs/BCS Centre Classroom.JPG"/>\
            <img src = "../Model/Crooks_Hall/thumbs/4DS_2572.jpg" onclick="$("#photo").attr("src","../Model/Centre_for_Art_and_Humanities/thumbs/BCS Centre Classroom.JPG"/>\
        </div>\
    </div>\
</div>';

blank_html = '<div id ="container" style="margin:auto;height:450px;width:650px;border:2px solid black;border-radius:15px;background-color:rgba(255,255,255,0.85);">\
    <div id ="photo_frame" style = "height:350px;width:350px;float:left;text-align:center">\
        <h5 id="title">BLANK</h5><h5> (0 sq. ft.)</h5>\
        <div>\
            <img id="photo" src="" style="margin:0 auto;display:block"/>\
        </div>\
    </div>\
    <div id ="text" style = "height:420px;width:270px;float:right;padding:15px;overflow-y:scroll;">\
        <h5 id="title"></h5>\
    </div>\
      <div id ="thumbs" style = "height:100px;width:350px;float:right;">\
        <div id ="image_bar" style = "height:60px;width:350px;margin-top:20px;text-align:center">\
        </div>\
    </div>\
</div>';