/* =========================================================
   共通スクリプト
   ・スマホのメニュー開閉
   ・config.js の設定を、ページ内のリンクへ反映
   通常この中を編集する必要はありません。
   ========================================================= */

(function () {
  "use strict";

  /* ---------- スマホメニューの開閉 ---------- */
  function initNav() {
    var btn = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (!btn || !nav) return;

    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // メニュー内のリンクを押したら閉じる
    var links = nav.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function () {
        nav.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      });
    }
  }

  /* ---------- 応募先・連絡先の反映 ---------- */
  function applyConfig() {
    var cfg = window.SITE_CONFIG || {};
    var mailSubject = encodeURIComponent("学生キャリア開発事業部について");
    var mailto = cfg.email ? "mailto:" + cfg.email + "?subject=" + mailSubject : "#";

    // 応募ボタン（data-apply）
    var applyHref = cfg.applyUrl ? cfg.applyUrl : mailto;
    var applyEls = document.querySelectorAll("[data-apply]");
    for (var i = 0; i < applyEls.length; i++) {
      applyEls[i].setAttribute("href", applyHref);
      if (cfg.applyUrl) {
        applyEls[i].setAttribute("target", "_blank");
        applyEls[i].setAttribute("rel", "noopener");
      }
    }

    // 大学向け問い合わせボタン（data-university）
    var uniHref = cfg.universityUrl ? cfg.universityUrl : applyHref;
    var uniEls = document.querySelectorAll("[data-university]");
    for (var j = 0; j < uniEls.length; j++) {
      uniEls[j].setAttribute("href", uniHref);
      if (cfg.universityUrl || cfg.applyUrl) {
        uniEls[j].setAttribute("target", "_blank");
        uniEls[j].setAttribute("rel", "noopener");
      }
    }

    // 電話番号（data-tel）
    var telEls = document.querySelectorAll("[data-tel]");
    for (var k = 0; k < telEls.length; k++) {
      if (cfg.tel) {
        telEls[k].textContent = cfg.tel;
        if (telEls[k].tagName === "A") {
          telEls[k].setAttribute("href", "tel:" + cfg.tel.replace(/-/g, ""));
        }
      }
    }

    // メールアドレス（data-email）
    var mailEls = document.querySelectorAll("[data-email]");
    for (var m = 0; m < mailEls.length; m++) {
      if (cfg.email) {
        mailEls[m].textContent = cfg.email;
        if (mailEls[m].tagName === "A") {
          mailEls[m].setAttribute("href", mailto);
        }
      }
    }
  }

  /* ---------- 現在のページをナビで強調 ---------- */
  function markCurrent() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".nav a[href]");
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href");
      if (href === path && !links[i].classList.contains("btn-apply")) {
        links[i].classList.add("is-current");
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initNav(); applyConfig(); markCurrent();
    });
  } else {
    initNav(); applyConfig(); markCurrent();
  }
})();
