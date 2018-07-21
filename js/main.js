
function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var currentQuote = '', currentAuthor = '';
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}
function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(r) {
      if (typeof r === 'string') {
       r = JSON.parse(r);
      }
      if (Array.isArray(r)) {
       r = r[0];
      }
      currentQuote = r.quote;
      currentAuthor = r.author;
      if(inIframe())
      {
        $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
      }
      $(".quote-text").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $(".fa_quote").addClass("fa fa-quote-left")
          $('#text').text(r.quote);
        });

      $(".quote-author").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#author').html(r.author);
        });
      $(".quote-box").animate({
        opacity:1
        // marginTop:"20%"
      },500);
      $(".footer").animate({
          opacity: 1
       }, 500);
      var color = Math.floor(Math.random() * colors.length);
      $("html body").animate({
        backgroundColor: colors[color],
        color: colors[color]
      }, 1000);
      $(".button").animate({
        backgroundColor: colors[color]
      }, 1000);
    }
  });
}
var buffer_index = "";
$(document).ready(function() {
  $(".quote-box").css("opacity","0");
  $(".footer").css("opacity","0");
  showEncourage(Phrase_arr);
  $('#new-quote').on('click', function() {
    var random_value = Math.random();
    if (random_value >= 0.5) {
      showEncourage(Phrase_arr);
    }
    else {
      showEncourage(Phrase_arr);
      // getQuote1()
    }
  });

  // $('#tweet-quote').on('click', function() {
  //   if(!inIframe()) {
  //     openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
  //   }
  // });
  // $('#tumblr-quote').on('click', function() {
  //   if(!inIframe()) {
  //     openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
  //   }
  // });

});
function getQuote1() {
  $.ajax({
    type: 'post',
    url: 'https://route.showapi.com/1211-1',
    dataType: 'json',
    data: {
      "showapi_timestamp": formatterDateTime(),
      "showapi_appid": '70182', //这里需要改成自己的appid
      "showapi_sign": 'da57807f0978406fa1e26c411c06de55',  //这里需要改成自己的应用的密钥secret
      "count":"1"

    },

    error: function(XmlHttpRequest, textStatus, errorThrown) {
        alert("操作失败!");
    },
    success: function(result) {
        console.log(result) //console变量在ie低版本下不能用
        showquote(result.showapi_res_body.data)
    }
  });
}
function showquote(txt) {
  var chinese = txt[0].chinese;
  var english = txt[0].english;

  $(".quote-text").animate({
      opacity: 0
    }, 500,
    function() {
      $(this).animate({
        opacity: 1
      }, 500);
      $(".fa_quote").addClass("fa fa-quote-left")
      $('#text').text(english);
    });

  $(".quote-chinese").animate({
      opacity: 0
    }, 500,
    function() {
      $(this).animate({
        opacity: 1
      }, 500);
      $('#chinese').text(chinese);
      $(".quote-box").animate({
        opacity:1,
        marginTop:"20%"
      },500);
      $(".footer").animate({
          opacity: 1
        }, 500);
    });


  var color = Math.floor(Math.random() * colors.length);
  $("html body").animate({
    backgroundColor: colors[color],
    color: colors[color]
  }, 1000);
  $(".button").animate({
    backgroundColor: colors[color]
  }, 1000);

}


function formatterDateTime() {
  var date=new Date()
  var month=date.getMonth() + 1
  var datetime = date.getFullYear()
  + ""// "年"
  + (month >= 10 ? month : "0"+ month)
  + ""// "月"
  + (date.getDate() < 10 ? "0" + date.getDate() : date
          .getDate())
  + ""
  + (date.getHours() < 10 ? "0" + date.getHours() : date
          .getHours())
  + ""
  + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
          .getMinutes())
  + ""
  + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
  .getSeconds());
  return datetime;
}
var Phrase_arr =
[
"少一点功利主义的追求,多一点不为什么的坚持。",
"你的对手都六点起了，那你呢？",
"未来的你一定会感激现在不断努力进步的自己",
"为梦想灼伤了自己，也不愿平庸的喘息",
"只有经历地狱般的磨难，才能炼出创造天堂的力量；只有流过血的手指，才能弹奏出世间的绝唱。—— 泰戈尔",
"当你拼尽全力全力也战胜不了躁动的内心时，告诉自己再坚持一分钟",
"保持健康，保持自信，保持微笑",
"今晚学到两点，如果你愿意的话",
 "每天自信一点，每天进步一点"

]

function showEncourage (phrase) {
  var encourageWords = phrase;
  var len = encourageWords.length;
  var i = len * Math.random();
  if (buffer_index == Math.floor(i)) {
    //注意return 迭代不return 还会执行之前的外层调用的
    return showEncourage(Phrase_arr);

  } else {
    $(".quote-text").animate({
        opacity: 0
      }, 500,
      function() {
        $(this).animate({
          opacity: 1
        }, 500);
        $(".fa_quote").addClass("fa fa-quote-left")
        $('#text').text(encourageWords[Math.floor(i)]);
      });

    $(".quote-chinese").animate({
        opacity: 0
      }, 500,
      function() {
        $(this).animate({
          opacity: 1
        }, 500);
        $('#chinese').text("献给还在奋斗的你");
        $(".quote-box").animate({
          opacity:1,
          marginTop:"20%"
        },500);
        $(".footer").animate({
            opacity: 1
          }, 500);
      });


    var color = Math.floor(Math.random() * colors.length);
    $("html body").animate({
      backgroundColor: colors[color],
      color: colors[color]
    }, 1000);
    $(".button").animate({
      backgroundColor: colors[color]
    }, 1000);
  }
  buffer_index = Math.floor(i) ;
}
