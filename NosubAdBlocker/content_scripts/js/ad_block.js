!function () {
  var DELAY_INTERVAL = 50;
  
  function hide (elem) {
    elem.style.display = "none";
  }
  
  // channel ad
  // 動画一覧の途中に広告がある場合に、位置を調整する
  function channelAd () {
    function isLeft (index) {
      return index % 2 == 0;
    }
    
    function isRight (index) {
      return !isLeft(index);
    }
    
    function toLeft (elem) {
      elem.id = "";
      elem.style.marginRight
    }
    
    function toRight (elem) {
      elem.id = "right";
      elem.style.marginRight = "0";
    }
    
    // 白黒模様を調整
    function setOdd (index, elem, afterAd) {
      if (afterAd) --index;
      
      if (Math.floor((index + 1) / 2) % 2 == 0) {
        if (elem.className.indexOf("odd") < 0) {
          elem.className += " odd";
        }
      }
      
      else {
        if (elem.className.indexOf("odd") > -1) {
          elem.className = elem.className.replace(/odd/, "");
        }
      }
    }
    
    var list = document.querySelector('.margin_bottom ul');
    if (!list) return;
    
    var items = list.querySelectorAll('li');
    var afterAd = false; // 広告の後ろか
    
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      
      if (afterAd) {
        if (isLeft(i))  toRight(item);
        if (isRight(i)) toLeft(item);
      }
      
      if (item.className.indexOf('catsubAd') > -1) {
        afterAd = true;
        hide(item);
      }
      
      else {
        setOdd(i, item, afterAd);
      }
    }
  };
  
  function canStart () {
    return !!document.querySelector(".footer");
  }
  
  function entryPoint () {
    if (!canStart()) {
      setTimeout(entryPoint, DELAY_INTERVAL);
      return;
    }
    
    channelAd();
  }
  
  entryPoint();
}();