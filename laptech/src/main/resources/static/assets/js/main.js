const backtotop_btn = document.getElementById("backtotop-btn");

window.onscroll = function () {
  if (
    document.documentElement.scrollTop > 300 ||
    document.body.scrollTop > 300
  ) {
    backtotop_btn.setAttribute("class", "slide-in-bottom");
    backtotop_btn.style.visibility = "visible";
  } else {
    backtotop_btn.setAttribute("class", "slide-out-top");
    backtotop_btn.style.visibility = "hidden";
  }
};
backtotop_btn.onclick = function () {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

$(function () {
  var siteSticky = function () {
    $(".js-sticky-header").sticky({ topSpacing: 0 });
  };
  siteSticky();

  var siteMenuClone = function () {
    $(".js-clone-nav").each(function () {
      var $this = $(this);
      $this
        .clone()
        .attr("class", "site-nav-wrap")
        .appendTo(".site-mobile-menu-body");
    });

    setTimeout(function () {
      var counter = 0;
      $(".site-mobile-menu .has-children ").each(function () {
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find(".arrow-collapse").attr({
          "data-toggle": "collapse",
          "data-target": "#collapseItem" + counter,
        });

        $this.find("> ul").attr({
          class: "collapse",
          id: "collapseItem" + counter,
        });

        counter++;
      });
    }, 1000);

    $("body").on("click", ".arrow-collapse", function (e) {
      var $this = $(this);
      if ($this.closest("li").find(".collapse").hasClass("show")) {
        $this.removeClass("active");
      } else {
        $this.addClass("active");
      }
      e.preventDefault();
    });

    $(window).resize(function () {
      var $this = $(this),
        w = $this.width();

      if (w > 768) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });

    $("body").on("click", ".js-menu-toggle", function (e) {
      var $this = $(this);
      e.preventDefault();

      if ($("body").hasClass("offcanvas-menu")) {
        $("body").removeClass("offcanvas-menu");
        $this.removeClass("active");
      } else {
        $("body").addClass("offcanvas-menu");
        $this.addClass("active");
      }
    });

    // click outisde offcanvas
    $(document).mouseup(function (e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });
  };
  siteMenuClone();
});

// hover
$(function () {
  $(".card")
    .on("mouseenter", function () {
      $(this).find(".card-overlay").fadeIn();
    })
    .on("mouseleave", function () {
      $(this).find(".card-overlay").fadeOut();
    });
});

//   tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

//   carousel
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    autoPlay: 3000,
    items: 5,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [979, 3],
    center: true,
    nav: true,
    loop: true,
    responsive: {
      600: {
        items: 4,
      },
    },
  });
});

//
/*!
 * imagesLoaded PACKAGED v4.1.3
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!(function (e, t) {
  "function" == typeof define && define.amd
    ? define("ev-emitter/ev-emitter", t)
    : "object" == typeof module && module.exports
    ? (module.exports = t())
    : (e.EvEmitter = t());
})("undefined" != typeof window ? window : this, function () {
  function e() {}
  var t = e.prototype;
  return (
    (t.on = function (e, t) {
      if (e && t) {
        var i = (this._events = this._events || {}),
          n = (i[e] = i[e] || []);
        return -1 == n.indexOf(t) && n.push(t), this;
      }
    }),
    (t.once = function (e, t) {
      if (e && t) {
        this.on(e, t);
        var i = (this._onceEvents = this._onceEvents || {}),
          n = (i[e] = i[e] || {});
        return (n[t] = !0), this;
      }
    }),
    (t.off = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        var n = i.indexOf(t);
        return -1 != n && i.splice(n, 1), this;
      }
    }),
    (t.emitEvent = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        var n = 0,
          o = i[n];
        t = t || [];
        for (var r = this._onceEvents && this._onceEvents[e]; o; ) {
          var s = r && r[o];
          s && (this.off(e, o), delete r[o]),
            o.apply(this, t),
            (n += s ? 0 : 1),
            (o = i[n]);
        }
        return this;
      }
    }),
    (t.allOff = t.removeAllListeners =
      function () {
        delete this._events, delete this._onceEvents;
      }),
    e
  );
}),
  (function (e, t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (i) {
          return t(e, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = t(e, require("ev-emitter")))
      : (e.imagesLoaded = t(e, e.EvEmitter));
  })("undefined" != typeof window ? window : this, function (e, t) {
    function i(e, t) {
      for (var i in t) e[i] = t[i];
      return e;
    }
    function n(e) {
      var t = [];
      if (Array.isArray(e)) t = e;
      else if ("number" == typeof e.length)
        for (var i = 0; i < e.length; i++) t.push(e[i]);
      else t.push(e);
      return t;
    }
    function o(e, t, r) {
      return this instanceof o
        ? ("string" == typeof e && (e = document.querySelectorAll(e)),
          (this.elements = n(e)),
          (this.options = i({}, this.options)),
          "function" == typeof t ? (r = t) : i(this.options, t),
          r && this.on("always", r),
          this.getImages(),
          h && (this.jqDeferred = new h.Deferred()),
          void setTimeout(
            function () {
              this.check();
            }.bind(this)
          ))
        : new o(e, t, r);
    }
    function r(e) {
      this.img = e;
    }
    function s(e, t) {
      (this.url = e), (this.element = t), (this.img = new Image());
    }
    var h = e.jQuery,
      a = e.console;
    (o.prototype = Object.create(t.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e),
          this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && d[t]) {
          for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ("string" == typeof this.options.background) {
            var r = e.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s);
            }
          }
        }
      });
    var d = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage);
            null !== n;

          ) {
            var o = n && n[2];
            o && this.addBackground(o, e), (n = i.exec(t.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (e) {
        var t = new r(e);
        this.images.push(t);
      }),
      (o.prototype.addBackground = function (e, t) {
        var i = new s(e, t);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function e(e, i, n) {
          setTimeout(function () {
            t.progress(e, i, n);
          });
        }
        var t = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (t) {
                t.once("progress", e), t.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (e, t, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
          this.emitEvent("progress", [this, e, t]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, e),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, e, t);
      }),
      (o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(e, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var t = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[t](this);
        }
      }),
      (r.prototype = Object.create(t.prototype)),
      (r.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (r.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth;
      }),
      (r.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
      }),
      (r.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype = Object.create(r.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url);
        var e = this.getIsImageComplete();
        e &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype.confirm = function (e, t) {
        (this.isLoaded = e),
          this.emitEvent("progress", [this, this.element, t]);
      }),
      (o.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery),
          t &&
            ((h = t),
            (h.fn.imagesLoaded = function (e, t) {
              var i = new o(this, e, t);
              return i.jqDeferred.promise(h(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });

//

/*!
 * baguetteBox.js
 * @author  feimosi
 * @version 1.10.0
 * @url https://github.com/feimosi/baguetteBox.js
 */
!(function (e, t) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(t)
    : "object" == typeof exports
    ? (module.exports = t())
    : (e.baguetteBox = t());
})(this, function () {
  "use strict";
  var e,
    t,
    n,
    o,
    i,
    a =
      '',
    s =
      '',
    l =
      '',
    r = {},
    u = {
      captions: !0,
     
    },
    c = {},
    d = [],
    f = 0,
    g = !1,
    p = {},
    b = !1,
    m = "",
    v = {},
    h = [],
    y = null,
    w = function (e) {
      -1 !== e.target.id.indexOf("") && I();
    },
    k = function (e) {
      e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0), q();
    },
    x = function (e) {
      e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0), j();
    },
    C = function (e) {
      e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0), I();
    },
    E = function (e) {
      p.count++,
        p.count > 1 && (p.multitouch = !0),
        (p.startX = e.changedTouches[0].pageX),
        (p.startY = e.changedTouches[0].pageY);
    },
    B = function (e) {
      if (!b && !p.multitouch) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
        var t = e.touches[0] || e.changedTouches[0];
        t.pageX - p.startX > 40
          ? ((b = !0), q())
          : t.pageX - p.startX < -40
          ? ((b = !0), j())
          : p.startY - t.pageY > 100 && I();
      }
    },
    T = function () {
      p.count--, p.count <= 0 && (p.multitouch = !1), (b = !1);
    },
    N = function () {
      T();
    },
    L = function (t) {
      "block" === e.style.display &&
        e.contains &&
        !e.contains(t.target) &&
        (t.stopPropagation(), H());
    };
  function A(e) {
    if (v.hasOwnProperty(e)) {
      var t = v[e].galleries;
      [].forEach.call(t, function (e) {
        [].forEach.call(e, function (e) {
          V(e.imageElement, "click", e.eventHandler);
        }),
          d === e && (d = []);
      }),
        delete v[e];
    }
  }
  function P(e) {
    switch (e.keyCode) {
      case 37:
        q();
        break;
      case 39:
        j();
        break;
      case 27:
        I();
    }
  }
  function S(i, a) {
    if (d !== i) {
      for (
        d = i,
          (function (i) {
            i || (i = {});
            for (var a in u)
              (r[a] = u[a]), "undefined" != typeof i[a] && (r[a] = i[a]);
            (t.style.transition = t.style.webkitTransition =
              "fadeIn" === r.animation
                ? "opacity .4s ease"
                : "slideIn" === r.animation
                ? ""
                : "none"),
              "auto" === r.buttons &&
                (("ontouchstart" in window) || 1 === d.length) &&
                (r.buttons = !1);
            n.style.display = o.style.display = r.buttons ? "" : "none";
            try {
              e.style.backgroundColor = r.overlayBackgroundColor;
            } catch (s) {}
          })(a);
        t.firstChild;

      )
        t.removeChild(t.firstChild);
      h.length = 0;
      
    }
  }
  function F(t) {
    r.noScrollbars &&
      ((document.documentElement.style.overflowY = "hidden"),
      (document.body.style.overflowY = "scroll")),
      "block" !== e.style.display &&
        (D(document, "keydown", P),
        (p = { count: 0, startX: null, startY: null }),
        Y((f = t), function () {
          R(f), z(f);
        }),
        O(),
        (e.style.display = "block"),
        r.fullScreen &&
          (e.requestFullscreen
            ? e.requestFullscreen()
            : e.webkitRequestFullscreen
            ? e.webkitRequestFullscreen()
            : e.mozRequestFullScreen && e.mozRequestFullScreen()),
        setTimeout(function () {
          (e.className = "visible"),
            r.bodyClass &&
              document.body.classList &&
              document.body.classList.add(r.bodyClass),
            r.afterShow && r.afterShow();
        }, 50),
        r.onChange && r.onChange(f, h.length),
        (y = document.activeElement),
        H(),
        (g = !0));
  }
  function H() {
    r.buttons ? n.focus() : i.focus();
  }
  function I() {
    r.noScrollbars &&
      ((document.documentElement.style.overflowY = "auto"),
      (document.body.style.overflowY = "auto")),
      "none" !== e.style.display &&
        (V(document, "keydown", P),
        (e.className = ""),
        setTimeout(function () {
          (e.style.display = "none"),
            document.exitFullscreen
              ? document.exitFullscreen()
              : document.mozCancelFullScreen
              ? document.mozCancelFullScreen()
              : document.webkitExitFullscreen &&
                document.webkitExitFullscreen(),
            r.bodyClass &&
              document.body.classList &&
              document.body.classList.remove(r.bodyClass),
            r.afterHide && r.afterHide(),
            y && y.focus(),
            (g = !1);
        }, 500));
  }
  function Y(e, t) {
    var n = h[e],
      o = d[e];
    if (void 0 !== n && void 0 !== o)
      if (n.getElementsByTagName("img")[0]) t && t();
      else {
        var i = o.imageElement,
          a = i.getElementsByTagName("img")[0],
          s =
            "function" == typeof r.captions
              ? r.captions.call(d, i)
              : i.getAttribute("") || i.title,
          l = (function (e) {
            var t = e.href;
            if (e.dataset) {
              var n = [];
              for (var o in e.dataset)
                "at-" !== o.substring(0, 3) ||
                  isNaN(o.substring(3)) ||
                  (n[o.replace("at-", "")] = e.dataset[o]);
              for (
                var i = Object.keys(n).sort(function (e, t) {
                    return parseInt(e, 10) < parseInt(t, 10) ? -1 : 1;
                  }),
                  a = window.innerWidth * window.devicePixelRatio,
                  s = 0;
                s < i.length - 1 && i[s] < a;

              )
                s++;
              t = n[i[s]] || t;
            }
            return t;
          })(i),
          u = W("");
        if (
          ((u.id = "" + e),
          (u.innerHTML =
            ''),
          r.captions && s)
        ) {
          var c = W("");
          (c.id = "" + e),
            (c.innerHTML = s),
            u.appendChild(c);
        }
        n.appendChild(u);
        var f = W("");
        (f.onload = function () {
          var n = document.querySelector(
            "" + e + " "
          );
          u.removeChild(n), !r.async && t && t();
        }),
          f.setAttribute("src", l),
          (f.alt = (a && a.alt) || ""),
          r.titleTag && s && (f.title = s),
          u.appendChild(f),
          r.async && t && t();
      }
  }
  function j() {
    return X(f + 1);
  }
  function q() {
    return X(f - 1);
  }
  function X(e, t) {
    return !g && e >= 0 && e < t.length
      ? (S(t, r), F(e), !0)
      : e < 0
      ? (r.animation && M(""), !1)
      : e >= h.length
      ? (r.animation && M(""), !1)
      : (Y((f = e), function () {
          R(f), z(f);
        }),
        O(),
        r.onChange && r.onChange(f, h.length),
        !0);
  }
  function M(e) {
    (t.className = "" + e),
      setTimeout(function () {
        t.className = "";
      }, 400);
  }

  function R(e) {
    e - f >= r.preload ||
      Y(e + 1, function () {
        R(e + 1);
      });
  }
  function z(e) {
    f - e >= r.preload ||
      Y(e - 1, function () {
        z(e - 1);
      });
  }
  function D(e, t, n, o) {
    e.addEventListener
      ? e.addEventListener(t, n, o)
      : e.attachEvent("on" + t, function (e) {
          ((e = e || window.event).target = e.target || e.srcElement), n(e);
        });
  }
  
  function U(e) {
    return document.getElementById(e);
  }
  function W(e) {
    return document.createElement(e);
  }
  return (
    [].forEach ||
      (Array.prototype.forEach = function (e, t) {
        for (var n = 0; n < this.length; n++) e.call(t, this[n], n, this);
      }),
    [].filter ||
      (Array.prototype.filter = function (e, t, n, o, i) {
        for (n = this, o = [], i = 0; i < n.length; i++)
          e.call(t, n[i], i, n) && o.push(n[i]);
        return o;
      }),
    {
      run: function (r, u) {
        var d, f, g, p, b, h;
        return (
          A(r),
          (g = r),
          (p = u),
          (b = document.querySelectorAll(g)),
          (h = { galleries: [], nodeList: b }),
          (v[g] = h),
          [].forEach.call(b, function (e) {
            p && p.filter && (m = p.filter);
            var t = [];
            if (
              ((t = "A" === e.tagName ? [e] : e.getElementsByTagName("a")),
              0 !==
                (t = [].filter.call(t, function (e) {
                  if (-1 === e.className.indexOf(p && p.ignoreClass))
                    return m.test(e.href);
                })).length)
            ) {
              var n = [];
              [].forEach.call(t, function (e, t) {
                var o = function (e) {
                    e.preventDefault
                      ? e.preventDefault()
                      : (e.returnValue = !1),
                      S(n, p),
                      F(t);
                  },
                  i = { eventHandler: o, imageElement: e };
                D(e, "click", o), n.push(i);
              }),
                h.galleries.push(n);
            }
          }),
          h.galleries
        );
      },
      show: X,
      showNext: j,
      showPrevious: q,
      hide: I,
      destroy: function () {
        var a;
        (a = c.passiveEvents ? { passive: !0 } : null),
          V(e, "click", w),
          V(n, "click", k),
          V(o, "click", x),
          V(i, "click", C),
          V(t, "contextmenu", N),
          V(e, "touchstart", E, a),
          V(e, "touchmove", B, a),
          V(e, "touchend", T),
          V(document, "focus", L, !0),
          (function () {
            for (var e in v) v.hasOwnProperty(e) && A(e);
          })(),
          V(document, "keydown", P),
          document
            .getElementsByTagName("body")[0]
            .removeChild(document.getElementById("")),
          (v = {}),
          (d = []),
          (f = 0);
      },
    }
  );
});

//Plugin name        : inewsticker - jQuery news ticker
//Version            : 0.1.0
//Author             : mahdi khaksar
//Author website     : progpars.com
//Url	 			 : http://www.ijquery.ir/effect/inewsticker/
(function (e) {
  e.fn.inewsticker = function (t) {
    var n = {
      speed: 200,
      effect: "fade",
      dir: "ltr",
      font_size: null,
      color: null,
      font_family: null,
      delay_after: 3e3,
    };
    e.extend(n, t);
    var r = e(this);
    var i = r.children();
    i.not(":first").hide();
    r.css("direction", t.dir);
    r.css("font-size", t.font_size);
    r.css("color", t.color);
    r.css("font-family", t.font_family);
    setInterval(function () {
      var e = r.children();
      e.not(":first").hide();
      var n = e.eq(0);
      var i = e.eq(1);
      if (t.effect == "slide") {
        n.slideUp();
        i.slideDown(function () {
          n.remove().appendTo(r);
        });
      }
      if (t.effect == "fade") {
        n.fadeOut(function () {
          i.fadeIn();
          n.remove().appendTo(r);
        });
      }
    }, t.speed);
    if (t.effect == "typing") {
      var s = 0;
      var o = 0;
      var u = t.delay_after / t.speed;
      var a = new Array(1 + u).join(" ");
      var f = new Array();
      i.each(function () {
        f.push(e(this).text() + a);
      });
      count = f.length;
      setInterval(function () {
        result = f[o].substring(0, s);
        e(r).html(result);
        s++;
        if (s == f[o].length) {
          s = 0;
          r.appendTo(r).hide().fadeIn("slow");
          o++;
          if (count == o) {
            o = 0;
          }
        }
      }, t.speed);
    }
  };
})(jQuery)(
  

  (function ($) {
    "use strict";

    var bootsnav = {
      initialize: function () {
        this.event();
        this.hoverDropdown();
        this.navbarSticky();
        this.navbarScrollspy();
      },
      event: function () {
        // ------------------------------------------------------------------------------ //
        // Variable
        // ------------------------------------------------------------------------------ //
        var getNav = $("nav.navbar.bootsnav");

        // ------------------------------------------------------------------------------ //
        // Navbar Sticky
        // ------------------------------------------------------------------------------ //
        var navSticky = getNav.hasClass("navbar-sticky");
        if (navSticky) {
          // Wraped navigation
          getNav.wrap("<div class='wrap-sticky'></div>");
        }

        // ------------------------------------------------------------------------------ //
        // Navbar Center
        // ------------------------------------------------------------------------------ //
        if (getNav.hasClass("brand-center")) {
          var postsArr = new Array(),
            index = $("nav.brand-center"),
            $postsList = index.find("ul.navbar-nav");

          index.prepend(
            "<span class='storage-name' style='display:none;'></span>"
          );

          //Create array of all posts in lists
          index.find("ul.navbar-nav > li").each(function () {
            if ($(this).hasClass("active")) {
              var getElement = $("a", this).eq(0).text();
              $(".storage-name").html(getElement);
            }
            postsArr.push($(this).html());
          });

          //Split the array at this point. The original array is altered.
          var firstList = postsArr.splice(0, Math.round(postsArr.length / 2)),
            secondList = postsArr,
            ListHTML = "";

          var createHTML = function (list) {
            ListHTML = "";
            for (var i = 0; i < list.length; i++) {
              ListHTML += "<li>" + list[i] + "</li>";
            }
          };

          //Generate HTML for first list
          createHTML(firstList);
          $postsList.html(ListHTML);
          index.find("ul.nav").first().addClass("navbar-left");

          //Generate HTML for second list
          createHTML(secondList);
          //Create new list after original one
          $postsList
            .after('<ul class="nav navbar-nav"></ul>')
            .next()
            .html(ListHTML);
          index.find("ul.nav").last().addClass("navbar-right");

          //Wrap navigation menu
          index
            .find("ul.nav.navbar-left")
            .wrap("<div class='col-half left'></div>");
          index
            .find("ul.nav.navbar-right")
            .wrap("<div class='col-half right'></div>");

          //Selection Class
          index.find("ul.navbar-nav > li").each(function () {
            var dropDown = $("ul.dropdown-menu", this),
              megaMenu = $("ul.megamenu-content", this);
            dropDown.closest("li").addClass("dropdown");
            megaMenu.closest("li").addClass("megamenu-fw");
          });

          var getName = $(".storage-name").html();
          if (!getName == "") {
            $("ul.navbar-nav > li:contains('" + getName + "')").addClass(
              "active"
            );
          }
        }

        // ------------------------------------------------------------------------------ //
        // Navbar Sidebar
        // ------------------------------------------------------------------------------ //
        if (getNav.hasClass("navbar-sidebar")) {
          // Add Class to body
          $("body").addClass("wrap-nav-sidebar");
          getNav.wrapInner("<div class='scroller'></div>");
        } else {
          $(".bootsnav").addClass("on");
        }

        // ------------------------------------------------------------------------------ //
        // Menu Center
        // ------------------------------------------------------------------------------ //
        if (getNav.find("ul.nav").hasClass("navbar-center")) {
          getNav.addClass("menu-center");
        }

        // ------------------------------------------------------------------------------ //
        // Navbar Full
        // ------------------------------------------------------------------------------ //
        if (getNav.hasClass("navbar-full")) {
          // Add Class to body
          $("nav.navbar.bootsnav")
            .find("ul.nav")
            .wrap("<div class='wrap-full-menu'></div>");
          $(".wrap-full-menu").wrap("<div class='nav-full'></div>");
          $("ul.nav.navbar-nav").prepend(
            "<li class='close-full-menu'><a href='#'><i class='fa fa-times'></i></a></li>"
          );
        } else if (getNav.hasClass("navbar-mobile")) {
          getNav.removeClass("no-full");
        } else {
          getNav.addClass("no-full");
        }

        // ------------------------------------------------------------------------------ //
        // Navbar Mobile
        // ------------------------------------------------------------------------------ //
        if (getNav.hasClass("navbar-mobile")) {
          // Add Class to body
          $(".navbar-collapse").on("shown.bs.collapse", function () {
            $("body").addClass("side-right");
          });
          $(".navbar-collapse").on("hide.bs.collapse", function () {
            $("body").removeClass("side-right");
          });

          $(window).on("resize", function () {
            $("body").removeClass("side-right");
          });
        }

        // ------------------------------------------------------------------------------ //
        // Navbar Fixed
        // ------------------------------------------------------------------------------ //
        if (getNav.hasClass("no-background")) {
          $(window).on("scroll", function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > 34) {
              $(".navbar-fixed").removeClass("no-background");
            } else {
              $(".navbar-fixed").addClass("no-background");
            }
          });
        }

        // ------------------------------------------------------------------------------ //
        // Navbar Fixed
        // ------------------------------------------------------------------------------ //
        if (getNav.hasClass("navbar-transparent")) {
          $(window).on("scroll", function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > 34) {
              $(".navbar-fixed").removeClass("navbar-transparent");
            } else {
              $(".navbar-fixed").addClass("navbar-transparent");
            }
          });
        }

        // ------------------------------------------------------------------------------ //
        // Button Cart
        // ------------------------------------------------------------------------------ //
        $(".btn-cart").on("click", function (e) {
          e.stopPropagation();
        });

        // ------------------------------------------------------------------------------ //
        // Toggle Search
        // ------------------------------------------------------------------------------ //
        $("nav.navbar.bootsnav .attr-nav").each(function () {
          $("li.search > a", this).on("click", function (e) {
            e.preventDefault();
            $(".top-search").slideToggle();
          });
        });
        $(".input-group-addon.close-search").on("click", function () {
          $(".top-search").slideUp();
        });

        // ------------------------------------------------------------------------------ //
        // Toggle Side Menu
        // ------------------------------------------------------------------------------ //
        $("nav.navbar.bootsnav .attr-nav").each(function () {
          $("li.side-menu > a", this).on("click", function (e) {
            e.preventDefault();
            $("nav.navbar.bootsnav > .side").toggleClass("on");
            $("body").toggleClass("on-side");
          });
        });
        $(".side .close-side").on("click", function (e) {
          e.preventDefault();
          $("nav.navbar.bootsnav > .side").removeClass("on");
          $("body").removeClass("on-side");
        });

        // ------------------------------------------------------------------------------ //
        // Wrapper
        // ------------------------------------------------------------------------------ //
        $("body").wrapInner("<div class='wrapper'></div>");
      },

      // ------------------------------------------------------------------------------ //
      // Change dropdown to hover on dekstop
      // ------------------------------------------------------------------------------ //
      hoverDropdown: function () {
        var getNav = $("nav.navbar.bootsnav"),
          getWindow = $(window).width(),
          getHeight = $(window).height(),
          getIn = getNav.find("ul.nav").data("in"),
          getOut = getNav.find("ul.nav").data("out");

        if (getWindow < 991) {
          // Height of scroll navigation sidebar
          $(".scroller").css("height", "auto");

          // Disable mouseenter event
          $("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseenter");
          $("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseleave");
          $("nav.navbar.bootsnav ul.nav").find(".title").off("mouseenter");
          $("nav.navbar.bootsnav ul.nav").off("mouseleave");
          $(".navbar-collapse").removeClass("animated");

          // Enable click event
          $("nav.navbar.bootsnav ul.nav").each(function () {
            $(".dropdown-menu", this).addClass("animated");
            $(".dropdown-menu", this).removeClass(getOut);

            // Dropdown Fade Toggle
            $("a.dropdown-toggle", this).off("click");
            $("a.dropdown-toggle", this).on("click", function (e) {
              e.stopPropagation();
              $(this)
                .closest("li.dropdown")
                .find(".dropdown-menu")
                .first()
                .stop()
                .fadeToggle()
                .toggleClass(getIn);
              $(this).closest("li.dropdown").first().toggleClass("on");
              return false;
            });

            // Hidden dropdown action
            $("li.dropdown", this).each(function () {
              $(this).find(".dropdown-menu").stop().fadeOut();
              $(this).on("hidden.bs.dropdown", function () {
                $(this).find(".dropdown-menu").stop().fadeOut();
              });
              return false;
            });

            // Megamenu style
            $(".megamenu-fw", this).each(function () {
              $(".col-menu", this).each(function () {
                $(".content", this).addClass("animated");
                $(".content", this).stop().fadeOut();
                $(".title", this).off("click");
                $(".title", this).on("click", function () {
                  $(this)
                    .closest(".col-menu")
                    .find(".content")
                    .stop()
                    .fadeToggle()
                    .addClass(getIn);
                  $(this).closest(".col-menu").toggleClass("on");
                  return false;
                });

                $(".content", this).on("click", function (e) {
                  e.stopPropagation();
                });
              });
            });
          });

          // Hidden dropdown
          var cleanOpen = function () {
            $("li.dropdown", this).removeClass("on");
            $(".dropdown-menu", this).stop().fadeOut();
            $(".dropdown-menu", this).removeClass(getIn);
            $(".col-menu", this).removeClass("on");
            $(".col-menu .content", this).stop().fadeOut();
            $(".col-menu .content", this).removeClass(getIn);
          };

          // Hidden om mouse leave
          $("nav.navbar.bootsnav").on("mouseleave", function () {
            cleanOpen();
          });

          // Enable click atribute navigation
          $("nav.navbar.bootsnav .attr-nav").each(function () {
            $(".dropdown-menu", this).removeClass("animated");
            $("li.dropdown", this).off("mouseenter");
            $("li.dropdown", this).off("mouseleave");
            $("a.dropdown-toggle", this).off("click");
            $("a.dropdown-toggle", this).on("click", function (e) {
              e.stopPropagation();
              $(this)
                .closest("li.dropdown")
                .find(".dropdown-menu")
                .first()
                .stop()
                .fadeToggle();
              $(".navbar-toggle").each(function () {
                $(".fa", this).removeClass("fa-times");
                $(".fa", this).addClass("fa-bars");
                $(".navbar-collapse").removeClass("in");
                $(".navbar-collapse").removeClass("on");
              });
            });

            $(this).on("mouseleave", function () {
              $(".dropdown-menu", this).stop().fadeOut();
              $("li.dropdown", this).removeClass("on");
              return false;
            });
          });

          // Toggle Bars
          $(".navbar-toggle").each(function () {
            $(this).off("click");
            $(this).on("click", function () {
              $(".fa", this).toggleClass("fa-bars");
              $(".fa", this).toggleClass("fa-times");
              cleanOpen();
            });
          });
        } else if (getWindow > 991) {
          // Height of scroll navigation sidebar
          $(".scroller").css("height", getHeight + "px");

          // Navbar Sidebar
          if (getNav.hasClass("navbar-sidebar")) {
            // Hover effect Sidebar Menu
            $("nav.navbar.bootsnav ul.nav").each(function () {
              $("a.dropdown-toggle", this).off("click");
              $("a.dropdown-toggle", this).on("click", function (e) {
                e.stopPropagation();
              });

              $(".dropdown-menu", this).addClass("animated");
              $("li.dropdown", this).on("mouseenter", function () {
                $(".dropdown-menu", this).eq(0).removeClass(getOut);
                $(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
                $(this).addClass("on");
                return false;
              });

              $(".col-menu").each(function () {
                $(".content", this).addClass("animated");
                $(".title", this).on("mouseenter", function () {
                  $(this)
                    .closest(".col-menu")
                    .find(".content")
                    .stop()
                    .fadeIn()
                    .addClass(getIn);
                  $(this).closest(".col-menu").addClass("on");
                  return false;
                });
              });

              $(this).on("mouseleave", function () {
                $(".dropdown-menu", this).stop().removeClass(getIn);
                $(".dropdown-menu", this).stop().addClass(getOut).fadeOut();
                $(".col-menu", this)
                  .find(".content")
                  .stop()
                  .fadeOut()
                  .removeClass(getIn);
                $(".col-menu", this).removeClass("on");
                $("li.dropdown", this).removeClass("on");
                return false;
              });
            });
          } else {
            // Hover effect Default Menu
            $("nav.navbar.bootsnav ul.nav").each(function () {
              $("a.dropdown-toggle", this).off("click");
              $("a.dropdown-toggle", this).on("click", function (e) {
                e.stopPropagation();
              });

              $(".megamenu-fw", this).each(function () {
                $(".title", this).off("click");
                $("a.dropdown-toggle", this).off("click");
                $(".content").removeClass("animated");
              });

              $(".dropdown-menu", this).addClass("animated");
              $("li.dropdown", this).on("mouseenter", function () {
                $(".dropdown-menu", this).eq(0).removeClass(getOut);
                $(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
                $(this).addClass("on");
                return false;
              });

              $("li.dropdown", this).on("mouseleave", function () {
                $(".dropdown-menu", this).eq(0).removeClass(getIn);
                $(".dropdown-menu", this)
                  .eq(0)
                  .stop()
                  .fadeOut()
                  .addClass(getOut);
                $(this).removeClass("on");
              });

              $(this).on("mouseleave", function () {
                $(".dropdown-menu", this).removeClass(getIn);
                $(".dropdown-menu", this)
                  .eq(0)
                  .stop()
                  .fadeOut()
                  .addClass(getOut);
                $("li.dropdown", this).removeClass("on");
                return false;
              });
            });
          }

          // ------------------------------------------------------------------------------ //
          // Hover effect Atribute Navigation
          // ------------------------------------------------------------------------------ //
          $("nav.navbar.bootsnav .attr-nav").each(function () {
            $("a.dropdown-toggle", this).off("click");
            $("a.dropdown-toggle", this).on("click", function (e) {
              e.stopPropagation();
            });

            $(".dropdown-menu", this).addClass("animated");
            $("li.dropdown", this).on("mouseenter", function () {
              $(".dropdown-menu", this).eq(0).removeClass(getOut);
              $(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
              $(this).addClass("on");
              return false;
            });

            $("li.dropdown", this).on("mouseleave", function () {
              $(".dropdown-menu", this).eq(0).removeClass(getIn);
              $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
              $(this).removeClass("on");
            });

            $(this).on("mouseleave", function () {
              $(".dropdown-menu", this).removeClass(getIn);
              $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
              $("li.dropdown", this).removeClass("on");
              return false;
            });
          });
        }

        // ------------------------------------------------------------------------------ //
        // Menu Fullscreen
        // ------------------------------------------------------------------------------ //
        if (getNav.hasClass("navbar-full")) {
          var windowHeight = $(window).height(),
            windowWidth = $(window).width();

          $(".nav-full").css("height", windowHeight + "px");
          $(".wrap-full-menu").css("height", windowHeight + "px");
          $(".wrap-full-menu").css("width", windowWidth + "px");

          $(".navbar-collapse").addClass("animated");
          $(".navbar-toggle").each(function () {
            var getId = $(this).data("target");
            $(this).off("click");
            $(this).on("click", function (e) {
              e.preventDefault();
              $(getId).removeClass(getOut);
              $(getId).addClass("in");
              $(getId).addClass(getIn);
              return false;
            });

            $("li.close-full-menu").on("click", function (e) {
              e.preventDefault();
              $(getId).addClass(getOut);
              setTimeout(function () {
                $(getId).removeClass("in");
                $(getId).removeClass(getIn);
              }, 500);
              return false;
            });
          });
        }
      },

      // ------------------------------------------------------------------------------ //
      // Navbar Sticky
      // ------------------------------------------------------------------------------ //
      navbarSticky: function () {
        var getNav = $("nav.navbar.bootsnav"),
          navSticky = getNav.hasClass("navbar-sticky");

        if (navSticky) {
          // Set Height Navigation
          var getHeight = getNav.height();
          $(".wrap-sticky").height(getHeight);

          // Windown on scroll
          var getOffset = $(".wrap-sticky").offset().top;
          $(window).on("scroll", function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > getOffset) {
              getNav.addClass("sticked");
            } else {
              getNav.removeClass("sticked");
            }
          });
        }
      },

      // ------------------------------------------------------------------------------ //
      // Navbar Scrollspy
      // ------------------------------------------------------------------------------ //
      navbarScrollspy: function () {
        var navScrollSpy = $(".navbar-scrollspy"),
          $body = $("body"),
          getNav = $("nav.navbar.bootsnav"),
          offset = getNav.outerHeight();

        if (navScrollSpy.length) {
          $body.scrollspy({ target: ".navbar", offset: offset });

          // Animation Scrollspy
          $(".scroll").on("click", function (event) {
            event.preventDefault();

            // Active link
            $(".scroll").removeClass("active");
            $(this).addClass("active");

            // Remove navbar collapse
            $(".navbar-collapse").removeClass("in");

            // Toggle Bars
            $(".navbar-toggle").each(function () {
              $(".fa", this).removeClass("fa-times");
              $(".fa", this).addClass("fa-bars");
            });

            // Scroll
            var scrollTop = $(window).scrollTop(),
              $anchor = $(this).find("a"),
              $section = $($anchor.attr("href")).offset().top,
              $window = $(window).width(),
              $minusDesktop = getNav.data("minus-value-desktop"),
              $minusMobile = getNav.data("minus-value-mobile"),
              $speed = getNav.data("speed");

            if ($window > 992) {
              var $position = $section - $minusDesktop;
            } else {
              var $position = $section - $minusMobile;
            }

            $("html, body").stop().animate(
              {
                scrollTop: $position,
              },
              $speed
            );
          });

          // Activate Navigation
          var fixSpy = function () {
            var data = $body.data("bs.scrollspy");
            if (data) {
              offset = getNav.outerHeight();
              data.options.offset = offset;
              $body.data("bs.scrollspy", data);
              $body.scrollspy("refresh");
            }
          };

          // Activate Navigation on resize
          var resizeTimer;
          $(window).on("resize", function () {
            clearTimeout(resizeTimer);
            var resizeTimer = setTimeout(fixSpy, 200);
          });
        }
      },
    };

    // Initialize
    $(document).ready(function () {
      bootsnav.initialize();
    });

    // Reset on resize
    $(window).on("resize", function () {
      bootsnav.hoverDropdown();
      setTimeout(function () {
        bootsnav.navbarSticky();
      }, 500);

      // Toggle Bars
      $(".navbar-toggle").each(function () {
        $(".fa", this).removeClass("fa-times");
        $(".fa", this).addClass("fa-bars");
        $(this).removeClass("fixed");
      });
      $(".navbar-collapse").removeClass("in");
      $(".navbar-collapse").removeClass("on");
      $(".navbar-collapse").removeClass("bounceIn");
    });
  })(jQuery)
);

//

//
//
//
// scroll to top



