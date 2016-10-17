var map = NaN;
function initMap() {
    var myLatLng = { lat: -25.363, lng: 131.044 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 17
    });

    // Create a marker and set its position.
    //var marker = new google.maps.Marker({
    //    map: map,
    //    position: myLatLng,
    //    title: 'Hello World!'
    //});

    function addMarker(map, lat, lng, title) {
        var myLatLng = { lat: lat, lng: lng };
        var marker = new google.maps.Marker({
            map: map,
            position: myLatLng,
            title: title
        });
    }

    function CoordenadaXYToLonLat(utmX, utmY, utmZone) {
        var isNorthHemisphere = utmZone[utmZone.length - 1] >= 'N';

        var diflat = -0.00066286966871111111111111111111111111;
        var diflon = -0.0003868060578;

        var zone = parseInt(utmZone.substring(0, utmZone.length - 1));//
        //var zone = int.Parse(utmZone.Remove(utmZone.Length - 1));
        var c_sa = 6378137.000000;
        var c_sb = 6356752.314245;
        var e2 = Math.pow((Math.pow(c_sa, 2) - Math.pow(c_sb, 2)), 0.5) / c_sb;
        var e2cuadrada = Math.pow(e2, 2);
        var c = Math.pow(c_sa, 2) / c_sb;
        var x = utmX - 500000;
        var y = isNorthHemisphere ? utmY : utmY - 10000000;

        var s = ((zone * 6.0) - 183.0);
        var lat = y / (c_sa * 0.9996);
        var v = (c / Math.pow(1 + (e2cuadrada * Math.pow(Math.cos(lat), 2)), 0.5)) * 0.9996;
        var a = x / v;
        var a1 = Math.sin(2 * lat);
        var a2 = a1 * Math.pow((Math.cos(lat)), 2);
        var j2 = lat + (a1 / 2.0);
        var j4 = ((3 * j2) + a2) / 4.0;
        var j6 = ((5 * j4) + Math.pow(a2 * (Math.cos(lat)), 2)) / 3.0;
        var alfa = (3.0 / 4.0) * e2cuadrada;
        var beta = (5.0 / 3.0) * Math.pow(alfa, 2);
        var gama = (35.0 / 27.0) * Math.pow(alfa, 3);
        var bm = 0.9996 * c * (lat - alfa * j2 + beta * j4 - gama * j6);
        var b = (y - bm) / v;
        var epsi = ((e2cuadrada * Math.pow(a, 2)) / 2.0) * Math.pow((Math.cos(lat)), 2);
        var eps = a * (1 - (epsi / 3.0));
        var nab = (b * (1 - epsi)) + lat;
        var senoheps = (Math.exp(eps) - Math.exp(-eps)) / 2.0;
        var delt = Math.atan(senoheps / (Math.cos(nab)));
        var tao = Math.atan(Math.cos(delt) * Math.tan(nab));

        var longitude1 = ((delt * (180.0 / Math.PI)) + s) + diflon;
        var latitude1 = ((lat + (1 + e2cuadrada * Math.pow(Math.cos(lat), 2) - (3.0 / 2.0) * e2cuadrada * Math.sin(lat) * Math.cos(lat) * (tao - lat)) * (tao - lat)) * (180.0 / Math.PI)) + diflat;
        return { latitude: latitude1, longitude: longitude1 };
    }
    var obj1 = CoordenadaXYToLonLat(411778.2984000000, 2042297.1830000000, "19N")
    addMarker(map, obj1.latitude, obj1.longitude, "Uno");

    map.setCenter(new google.maps.LatLng(obj1.latitude, obj1.longitude));
    // map.center.lat = obj1.latitude;
    //map.center.lng = obj1.longitude;
    //addMarker(map, -24.363, 131.044,"Dos");
    //addMarker(map, 18.469164834110156, -69.8355740202677, "Tres");
}