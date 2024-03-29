// TimeLine variable for the storage of each timeline
var tlLoading, tlDisplay;
// Terminals variable for the focus
/* var mainT; */


// Init function called at the end of the loading of each components
function init() {

  // Background managment with the plugin backstretch
  // Get 1 images from the var.js array of images for the background

  $("body").backstretch("images/"+images[Math.round(Math.random()*(images.length-1))],{fade: 300});

  // Scroll managment for each pannel (smarter screen and after insert of multiple cff informations)
  // Use the plugin mCustomScrollbar.jquery.min.js
  $(".left-pannel, .mid-pannel, .right-pannel").mCustomScrollbar({
    scrollInertia: 300
  });

  // Call of all the function init of each components and size adapter
  initGreetings();
  initTimeLines();
  initTerminal();
  initSearch();
  initFavorites();
  initSize();

  // Play the loading animation
  tlLoading.play();

  // If all the images are loaded, pause the animation of the loading and call the display timeline
  $("img").on('load',function() {
    tlLoading.pause();
    tlDisplay.play();
  })
  // Old code for the display of the loading animation
  // setTimeout(function() {
  //
  // }, 1210);
}

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */

/* tsParticles.loadJSON('particles-js', 'css/particles.json').then(function() {
  canvas = document.getElementById('large-header');
  console.log('callback - particles.js config loaded');
}); */

// Terminal initialisation
function initTerminal() {
  // Init the terminal with each function available
  mainT = $('.terminal-term.main #main').terminal({
    // Favorite function: f <arg> to open in new tab the favorite
    "f": function(arg1) {
      for(var i = 0; i < favorites.length; i++) {
        for(var j = 0; j < favorites[i][1].length; j++) {
          if(arg1 == favorites[i][1][j][2]) {
            var win = window.open(favorites[i][1][j][1], '_blank');
            /* win.focus(); */
          }
        }
      }
    },
    // Help for the terminal
    "help": function() {
      this.echo("\n");
      this.error("f <shortcut>"); this.echo("open the favorites in a new tab"); this.echo("\n");
      this.error("main"); this.echo("goto main terminal"); this.echo("\n");
      this.echo("\n");
    }
  }, {
    greetings: 'Welcome ' + username,
    name: 'main',
    height: 0,
    prompt: username + '@homepage:~$ '
  });
//  mainT.focus();
}

// Set the username and call the clock function for the greetings
function initGreetings() {
  $(".greetings-helloworld .greetings-name").html(kanji+'<br>'+username);

  initClock();
}

// Animations initialization
function initTimeLines() {
  tlLoading = gsap.timeline({
      repeat: -1
    })
    .from($(".s1"), .4, {
      rotation: "-=180"
    }, "#1")
    .from($(".s2"), .5, {
      rotation: "-=180"
    }, "#1")
    .from($(".s3"), .6, {
      rotation: "-=180"
    }, "#1")
    .from($(".s4"), .7, {
      rotation: "-=180"
    }, "#1")
    .pause();

  tlDisplay = gsap.timeline()
    .to($(".squares"), .2, {
      autoAlpha: 0
    })
    .to($(".squares"), .05, {
      height: 0
    }, "#1")
    .from($(".image"), .2, {
      height: 0
    }, "#1")
    .from($(".image"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .to($(".image"), 0, {
      height: "auto"
    })
    .from($("#greetings-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .from($("#weather-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .from($("#search-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .from($("#favorites-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .from($("#terminal-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    }, "#2")
    .from($("#tabs"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    }, "#2")
    .timeScale(1.2)
    .pause();
}

// Clock display
function initClock() {
  var today = new Date();
  var h = today.getHours();
  var tfh = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10)
    dd = '0' + dd;
  if (mm < 10)
    mm = '0' + mm;
  if (h < 10)
    h = '0' + h;
  if (h > 12)
    h = '0' + h - 12; //stupid clock making me do math to get 12h format.
  if (h == '00')
    h = '12';
  if (m < 10)
    m = '0' + m;
  if (s < 10)
    s = '0' + s;
  if (tfh < 10)
    tfh = '0' + tfh;

  $(".time-hours").html(h);
  $(".24h").html(tfh);
  $(".time-minutes").html(m);
  $(".time-seconds").html(s);
  $(".date-day").html(dd);
  $(".date-month").html(mm);
  $(".date-year").html(yyyy);

  if (tfh < 12) {
    $(".greetings-title").html("<center>" + "おはよう" + "<br>" + "Good Morning" + "</center>");
  } else if (tfh >= 12 && tfh < 19) {
    $(".greetings-title").html("<center>" + "今日は" + "<br>" + "Good Afternoon" + "</center>");
  } else {
    $(".greetings-title").html("<center>" + "こんばんは" + "<br>" + "Good Evening" + "</center>");
  }

  var t = setTimeout(initClock, 500);
}

// Size update of the app
function initSize() {

  $(".mid-pannel, .left-pannel, .right-pannel").height(document.body.clientHeight-20);


  var mxHeight = 0;
  $("#favorites-board .favorite").each(function(index, elem){
    if(mxHeight <= $(elem).height())
        mxHeight = $(elem).height();
  });
  $("#favorites-board .favorite").height(mxHeight);
}

// On ready magueule
$(document).ready(function() {
  init();
  setTimeout(function() {
    initSize();
  }, 2500);
});

// For each resize
$(window).resize(function() {
  initSize();
})

// Bypass user tracking confirmation and gather info based on location (im still pretty proud of myself for this one)
/* $.ajax({
  url: 'https://api.ipdata.co/?api-key=c875f714f864e2287195db120068285e7ed845f48a3eec34d85c0da2', 
  dataType: 'jsonp',
  success: function(dataFunc) {
    $(".data-ip").html(dataFunc.ip);
    $(".data-city").html(dataFunc.city);
    $(".data-region").html(dataFunc.region);
    $(".data-postal").html(dataFunc.postal);
  }}),*/
$.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?id=4982753&APPID=be7e1695d105aa34ce4df0beaf64aca2&units=imperial',
    dataType: 'jsonp',
    success: function(weather){
      $(".weather-current").html(weather.main.temp);
      $(".weather-max").html(weather.main.temp_max);
      $(".weather-min").html(weather.main.temp_min);
      }
    });