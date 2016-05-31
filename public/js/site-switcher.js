var GH = GH || {};
GH.opts = GH.opts || { useDashicons: true, useFontAwesome: true };      // sensible defaults

GH.siteSwitcher = (function(){
    'use strict';
    
    // https://jakearchibald.com/2016/link-in-body/
    document.write('<link rel="stylesheet" href="/https://assets.govhack.org/css/site-switcher.css">');
    
    if (GH.opts.useDashicons){
        document.write('<link rel="stylesheet" href="/https://www.govhack.org/wp-includes/css/dashicons.min.css">');        
    }
    if (GH.opts.useFontAwesome){
        document.write('<link rel="stylesheet" href="/https://www.govhack.org/wp-includes/css/dashicons.min.css">');        
    }
    
    var tabs = [
        {
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
            name => 'Participant Kit', 
            href => 'http://govhack-toolkit.readthedocs.io', 
            fa => 'fa-sliders', 
            dashicons => 'dashicons-clipboard'
        }
        // {
            // name: 'Hackerspace', 
            // href: 'http://hackerspace.govhack.org', 
            // fa: 'fa-comments', 
            // dashicons: 'dashicons-megaphone'
        // }
    ];
    
    var nav = '<!-- GovHack Site Switcher navbar, loaded from assets.govhack.org -->';
    nav += '<nav class="gh-ss"><ul>';
    
    tabs.forEach(function(tab){
        nav += '<li><a href="' + tab.href + '">';
        if (dashicons)
        nav += ' ' + tab.name + '</a></li>';
    });
        <?= $site['href'] ?>"><span class="dashicons <?= $site['dashicons'] ?>"></span> <?= $site['name'] ?>
        <?php endforeach; ?>
        
    nav += '</ul></nav>'
    
}());