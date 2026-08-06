(function () {
  'use strict';
  var agencies = [
    {rank:1,name:'Klick',kind:'Health + commercialization',ownership:'Independent',people:900,band:'1,001–5,000 global',address:'175 Bloor St E',office:81000,support:31,rate:245,confidence:'Medium',source:'https://uk.linkedin.com/company/klick-health'},
    {rank:2,name:'Cossette',kind:'Integrated creative',ownership:'Plus Company',people:420,band:'Enterprise network',address:'Liberty Village',office:42000,support:29,rate:224,confidence:'Low',source:'https://www.linkedin.com/company/cossette/'},
    {rank:3,name:'Sid Lee',kind:'Creative + design',ownership:'Plus Company',people:230,band:'Global network',address:'Toronto, ON M6J',office:24000,support:27,rate:216,confidence:'Low',source:'https://www.linkedin.com/company/sid-lee'},
    {rank:4,name:'Rethink',kind:'Independent creative',ownership:'Independent',people:145,band:'201–500 global',address:'Toronto office',office:14500,support:24,rate:196,confidence:'Medium',source:'https://www.linkedin.com/company/rethink'},
    {rank:5,name:'No Fixed Address',kind:'Integrated creative',ownership:'Independent collective',people:125,band:'51–200',address:'50 Carroll St',office:13200,support:26,rate:204,confidence:'Medium',source:'https://www.linkedin.com/company/no-fixed-address'},
    {rank:6,name:'LG2',kind:'Creative + design',ownership:'Independent',people:105,band:'450+ global',address:'161 Liberty St E',office:11000,support:25,rate:194,confidence:'Medium',source:'https://ca.linkedin.com/company/lg2'},
    {rank:7,name:'Zulu Alpha Kilo',kind:'Independent creative',ownership:'Independent',people:90,band:'Public band unavailable',address:'Toronto, ON M4M',office:9800,support:23,rate:193,confidence:'Low',source:'https://www.linkedin.com/company/zulu-alpha-kilo-inc.'},
    {rank:8,name:'Diamond',kind:'Integrated + experiential',ownership:'Independent',people:105,band:'51–200',address:'477 Richmond St W',office:10800,support:26,rate:198,confidence:'Medium',source:'https://ca.linkedin.com/company/diamond-marketing-group'},
    {rank:9,name:'Broken Heart Love Affair',kind:'Independent creative',ownership:'Independent',people:72,band:'51–200',address:'25 Brant St',office:7600,support:24,rate:191,confidence:'Medium',source:'https://ca.linkedin.com/company/broken-heart-love-affair'},
    {rank:10,name:'Juniper Park\\TBWA',kind:'Network creative',ownership:'Omnicom / TBWA',people:58,band:'51–200',address:'33 Bloor St E',office:6500,support:29,rate:207,confidence:'High',source:'https://ca.linkedin.com/company/juniper-park-tbwa'}
  ];
  var list = document.getElementById('agency-list');
  var drawer = document.getElementById('agency-drawer');
  if (!list || !drawer) return;
  var format = new Intl.NumberFormat('en-CA');
  var money = new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0});
  function render(sort) {
    var ordered = agencies.slice().sort(function(a,b){ return b[sort]-a[sort]; });
    list.innerHTML = ordered.map(function(a){return '<button class="economics-row" data-agency="'+a.rank+'"><span class="agency"><i class="rank">'+String(a.rank).padStart(2,'0')+'</i><strong>'+a.name+'</strong><small>'+a.kind+'</small></span><span class="value people"><i class="bar" style="--bar:'+Math.max(8,a.people/9)+'%"></i>'+format.format(a.people)+'<small>estimated</small></span><span class="value office">'+format.format(a.office)+'<small>sq. ft. estimated</small></span><span class="value rate">'+money.format(a.rate)+'<small>modelled</small></span><span class="plus">＋</span></button>'}).join('');
  }
  function openAgency(rank) {
    var a = agencies.find(function(x){return x.rank===rank}); if(!a)return;
    document.getElementById('drawer-title').textContent=a.name;
    document.getElementById('drawer-kind').textContent=a.kind+' · '+a.ownership;
    document.getElementById('drawer-confidence').textContent=a.confidence;
    document.getElementById('drawer-grid').innerHTML=[['Public company band',a.band],['Toronto staff',format.format(a.people)+' estimated'],['Office signal',a.address],['Modelled footprint',format.format(a.office)+' sq. ft.'],['Support share',a.support+'% assumed'],['Break-even rate',money.format(a.rate)+' / hour']].map(function(x){return '<div><small>'+x[0]+'</small><b>'+x[1]+'</b></div>'}).join('');
    document.getElementById('drawer-source').href=a.source;
    drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
    drawer.querySelector('.economics-close').focus();
    if(window.smallerTrack) window.smallerTrack('agency_profile_opened',{agency:a.name});
  }
  function close(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  document.querySelectorAll('.economics-controls button').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.economics-controls button').forEach(function(b){b.classList.remove('active')});btn.classList.add('active');render(btn.dataset.sort)})});
  list.addEventListener('click',function(e){var row=e.target.closest('[data-agency]');if(row)openAgency(Number(row.dataset.agency))});
  drawer.querySelectorAll('[data-close]').forEach(function(btn){btn.addEventListener('click',close)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&drawer.classList.contains('open'))close()});
  render('people');
})();
