var GH = GH || {};
GH.opts = GH.opts || { useDashicons: true, useFontAwesome: false };      // sensible defaults

GH.siteSwitcher = (function(){
    'use strict';
    
    // https://jakearchibald.com/2016/link-in-body/
    document.write('<link rel="stylesheet" href="https://assets.govhack.org/css/site-switcher.css">');
    
    if (GH.opts.useDashicons){
        document.write('<link rel="stylesheet" href="https://www.govhack.org/wp-includes/css/dashicons.min.css">');        
    }
    if (GH.opts.useFontAwesome){
        document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">');        
    }
    
    var tabs = [{
        name: 'Blog', 
        href: 'http://blog.govhack.org', 
        fa: 'fa-rss-square',
        dashicons: 'dashicons-rss'
    },
    {
        name: 'Competition Portal', 
        href: 'http://portal.govhack.org', 
        fa: 'fa-bar-chart', 
        dashicons: 'dashicons-chart-bar'
    },
    {
        name: 'Participant Kit', 
        href: 'http://govhack-toolkit.readthedocs.io', 
        fa: 'fa-sliders', 
        dashicons: 'dashicons-clipboard'
    }];
        // {
            // name: 'Hackerspace', 
            // href: 'http://hackerspace.govhack.org', 
            // fa: 'fa-comments', 
            // dashicons: 'dashicons-megaphone'
        // }
    
    var navHtml = '<!-- GovHack Site Switcher navbar, loaded from assets.govhack.org -->';
    navHtml += '<nav class="gh-ss"><ul>';
    
    tabs.forEach(function(tab){
        navHtml += '<li><a href="' + tab.href + '">';
        if (GH.opts.useDashicons){
            navHtml += '<span class="dashicons ' + tab.dashicons + '"></span> ';
        }
        if (GH.opts.useFontAwesome){
            navHtml += '<span class="fa ' + tab.fa + '"></span> ';
        }
        navHtml += tab.name + '</a></li>';
    });
        
    navHtml += '</ul></nav>';
    
    if (window.addEventListener){
        window.addEventListener('load', loadNavHtml, false);      // NB **not** 'onload'
    } 
    else if (window.attachEvent){
        window.attachEvent('onload', loadNavHtml);
    }
    
    //===========
    
    function loadNavHtml(){
        document.body.insertAdjacentHTML('afterbegin', navHtml);
    }
    
}());