InstantClick.init(50);
$(document).ready(function(){
  $('#sidebar nav ul').mobileMenu({'topOptionText': 'Menu', 'prependTo': '#sidebar nav'});
});

var _paq = _paq || [];
//_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);
(function() {
    var u=(("https:" == document.location.protocol) ? "https" : "http") + "://analytics.finn.io/";
    _paq.push(["setTrackerUrl", u+"piwik.php"]);
    _paq.push(["setSiteId", "15"]);
    var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
    g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
})();

InstantClick.on('change', function() {
  _paq.push(['trackPageView', location.pathname + location.search]);
});
