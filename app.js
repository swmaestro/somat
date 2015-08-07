"use strict";

// Catution:
// please change DEBUG to false before commit 

var DEBUG = true;

// live : ./somalife.json
// local : http://swmaestro.github.io/somat/somalife.json

var dataJsonUrl = "./somalife.json";
var swCenterPos = {x: 127.044958, y: 37.503553};

if(DEBUG)
    dataJsonUrl = "http://luavis.github.io/somat/somalife.json";

// keyword meta data table
var keyword_meta_data = {
    'food-korean' : '한식',
    'food-chinese' : '중식',
    'food-japanese' : '일식',
    'food-eng' : '양식',
    'food-fastfood' : '패스트푸드',
    'food-snack' : '분식',
    'food-etc' : '기타',
    'data-somalife' : 'somalife',
    'data-somat' : 'somat',
    'data-baedong' : '배동여지도',
    'price-high' : '비싼',
    'price-normal' : '보통',
    'price-cheap' : '싼',
    'taste-spicy' : '매운',
    'etc-mentoring' : '멘토링추천',
    'etc-boolbaek' : '불백',
    'etc-soup' : '국물',
    'etc-foodcourt' : '푸드코트',
    'etc-24hr' : '24시간',
    'culture-movie' : '영화관',
    'culture-sing' : '노래방',
    'culture-park' : '공원',
    'life-hospital' : '병원',
    'life-pharmacy' : '약국'
};

var isLoaded = false;
var queryParam = new Array();
var markers = new Array();
var infowindows = new Array();

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
$("#init-param").click(function(e) {
    e.preventDefault();
    clearParam();
});

for(var key in keyword_meta_data) {

    // add attribute for find it later
    $("#" + key).attr('data-meta-data-key', key)
    // set click event
    $("#" + key).click(function(e, elem) {
        
        var $target = $(e.target);

        e.preventDefault();

        $target.toggleClass("selected");
        editParam("#" + keyword_meta_data[$target.attr('data-meta-data-key')]);
    });
}

function clearParam(){
    if(isLoaded){
        queryParam = new Array();
        editParam();
    }
}

function editParam(k){
    if(isLoaded){
        if(k!=null){
            var idx = queryParam.indexOf(k);
            if(idx==-1){
                queryParam.push(k);
            }else{
                queryParam.splice(idx,1);
            }
        }
        var s = document.getElementById("current-filter");
        var txt = "";
        for(var i=0;i<queryParam.length;i++){
            txt += (queryParam[i]+" ");
        }
        s.innerHTML = txt;
        updateResult();
    }
}

function detectmob() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){ return true; }
    else { return false; }
}

function urlSpaceReplace(s){
    return(s.split(' ').join('%20'));
}

function degToRad(deg) {
    return deg * Math.PI / 180; 
}

function radTodeg(rad) {
    return rad * 180 / Math.PI;
}

var isMobile = detectmob();
var isLoaded = false;
var resultDiv = document.getElementById("query_result");
var container = document.getElementById('map');
var options = {
    center: new daum.maps.LatLng(37.503682, 127.044851),
    level: 5
};
var map = new daum.maps.Map(container, options);
var mapTypeControl = new daum.maps.MapTypeControl();
map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
var zoomControl = new daum.maps.ZoomControl();
map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
var jo, filtered; // json data를 저장할 변수

$.getJSON(dataJsonUrl, function(data) {
    jo = data;
    isLoaded = true;
    updateResult();
});

function clearResult(){
    for (var i = 0; i < markers.length; i++){
        markers[i].setMap(null);
    }
    resultDiv.innerHTML = '';
    markers = new Array();
}

function updateResult(){
    clearResult();
    var dat = new Array();
    for(var k in jo.data) {
        var count = 0;
        var passed = false;
        if(queryParam.length==0){
            passed = true;
        }else{
            for(var i=0;i<queryParam.length;i++){
                if(jo.data[k].tag.indexOf(queryParam[i]) != -1){
                    count++;
                }
            }
        }
        if(passed || count == queryParam.length){
            var r = new Object();
            r.title = jo.data[k].name;
            r.latlng = new daum.maps.LatLng(jo.data[k].y,jo.data[k].x);
            r.tag = jo.data[k].tag;
            r.content = jo.data[k].content;
            r.y = jo.data[k].y;
            r.x = jo.data[k].x;
            dat.push(r);
        }
    }
    if(dat.length==0){
        var nDiv = document.createElement('div');
        nDiv.style.cssText = 'text-align: center;position: relative;top: 50%;transform: translateY(-50%);';
        nDiv.innerHTML = '<h2>표시할 데이터가 없어요 ㅠㅠ</h2>';
        query_result.appendChild(nDiv);
    }

    var markers = new Array();

    for (var i=0;i<dat.length;i++) {
        var marker = new daum.maps.Marker({
            position: dat[i].latlng
        });

        marker.setMap(map);
        markers.push(marker);

        var open_event_name = 'mouseover';
        var infoWindowOptions = {};

        if(isMobile) {
            infoWindowOptions['content'] = '<p class="map-info"><span class="title">'
            + dat[i].title + '</span><br>' + '<a href="#result-' + i + '">바로가기</a></p>';

            infoWindowOptions['removable'] = true;
            open_event_name = 'click';
        }
        else {
            infoWindowOptions['content'] = '<p class="map-info"><span class="title">'
            + dat[i].title + '</span><br>' + '<span class="tags">' + dat[i].tag
            + '</span></p>';
        }

        marker.infoWindow = new daum.maps.InfoWindow(infoWindowOptions);
        marker.datIndex = i

        // open event
        daum.maps.event.addListener(marker, open_event_name, (function(marker) {
            return function() {
                for(var i in markers) {
                    markers[i].infoWindow.close();
                }

                marker.infoWindow.open(map, marker);
            }
        })(marker));

        // add close event in desktop view & click event to show info
        if(!isMobile){
            daum.maps.event.addListener(marker, 'mouseout', (function(marker) {
                return function() {
                    marker.infoWindow.close();
                }
            })(marker));

            daum.maps.event.addListener(marker, 'click', (function(marker) {
                return function() {
                    window.location.hash = '#result-' + marker.datIndex;
                }
            })(marker));
        }

        var tDiv = document.createElement('div');

        tDiv.setAttribute('id', 'result-' + i);
        var link = 'http://map.daum.net/link/to/'+urlSpaceReplace(dat[i].title)+','+dat[i].y+','+dat[i].x;

        tDiv.className += "result"
        var theta = swCenterPos.x - dat[i].x;
        marker.dist = Math.sin(degToRad(swCenterPos.y)) * Math.sin(degToRad(dat[i].y)) + Math.cos(degToRad(swCenterPos.y))   
          * Math.cos(degToRad(dat[i].y)) * Math.cos(degToRad(theta));
        marker.dist = Math.acos(marker.dist);
        marker.dist = radTodeg(marker.dist);
        marker.dist = marker.dist * 60 * 1.1515;   
        marker.dist = marker.dist * 1.609344;
        marker.dist = marker.dist * 1000.0;

        if(dat[i].except == undefined) {
            tDiv.innerHTML = '<div class="line"></div><h3 class="title">'+dat[i].title+'</h3>' +
                    '<p class="content">'+dat[i].content+'</p>' + 
                    '<div class="link"><a href="' + link +'" target="_blank">길찾기</a> | <a href="#" class="marker-window-link" data-marker-index="' + i +
                    '">장소보기</a> | ' + parseInt(marker.dist) + 'm | '+dat[i].tag+'</div>';

            query_result.appendChild(tDiv);
        }

        markers.push(marker);  // push marker in array
    }

    $('.marker-window-link').click(function() {
        var marker_index = $(this).attr('data-marker-index');
        var marker = markers[marker_index];

        map.panTo(marker.getPosition());
        map.setLevel(3);
        for(var i in markers) {
            markers[i].infoWindow.close();
        }

        marker.infoWindow.open(map, marker);        
    })

    var pDiv = document.createElement('div');
    pDiv.style.height="2em";
    query_result.appendChild(pDiv);
}
