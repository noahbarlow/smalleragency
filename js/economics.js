(function () {
  'use strict';

  var agencies = [
    {
      rank: 1,
      name: 'Klick',
      kind: 'Health + commercialization',
      ownership: 'Independent',
      people: [700, 1200],
      office: [63000, 138000],
      rate: [149, 218],
      evidence: 34,
      coverage: [10, 12, 4, 8, 0],
      companySignal: '1,001–5,000 global; ~2,005 associated profiles',
      address: '175 Bloor St E',
      delivery: '66–72% assumed',
      costs: '$130k–$150k loaded / employee',
      hours: '1,325–1,450 / delivery employee',
      ops: '16–21% of people cost',
      price: 'No public price evidence located',
      sources: [
        {type: 'Observed', claim: 'Global company band, associated-profile count and Toronto HQ address.', label: 'LinkedIn company profile', url: 'https://uk.linkedin.com/company/klick-health'}
      ]
    },
    {
      rank: 2,
      name: 'Cossette',
      kind: 'Integrated creative',
      ownership: 'Plus Company',
      people: [300, 520],
      office: [27000, 59800],
      rate: [130, 198],
      evidence: 53,
      coverage: [10, 10, 4, 7, 22],
      companySignal: 'Enterprise network; Toronto office leadership reported',
      address: 'Toronto, ON M6K',
      delivery: '68–74% assumed',
      costs: '$120k–$145k loaded / employee',
      hours: '1,350–1,475 / delivery employee',
      ops: '14–19% of people cost',
      price: '$179/hr blended · original 2017 City contract · stale',
      sources: [
        {type: 'Observed', claim: 'Toronto presence and Plus Company affiliation.', label: 'LinkedIn company profile', url: 'https://www.linkedin.com/company/cossette/'},
        {type: 'Reported', claim: 'Dedicated Toronto office leadership in 2026.', label: 'Cossette leadership announcement', url: 'https://www.cossette.com/en/blog/cossette-appoints-bryden-mcdonald-as-senior-vice-president-and-general-manager-of-its-toronto-office'},
        {type: 'Reported', claim: '$179 blended hourly rate in the original 2017 contract; not current commercial pricing.', label: 'City of Toronto contract record', url: 'https://www.toronto.ca/legdocs/mmis/2019/gl/bgrd/backgroundfile-131762.pdf'}
      ]
    },
    {
      rank: 3,
      name: 'Sid Lee',
      kind: 'Creative + design',
      ownership: 'Plus Company',
      people: [160, 300],
      office: [14400, 34500],
      rate: [128, 192],
      evidence: 31,
      coverage: [10, 8, 4, 9, 0],
      companySignal: 'Global network with a reported Toronto office',
      address: 'Toronto, ON M6J',
      delivery: '69–75% assumed',
      costs: '$120k–$142k loaded / employee',
      hours: '1,350–1,475 / delivery employee',
      ops: '14–19% of people cost',
      price: 'No public price evidence located',
      sources: [
        {type: 'Observed', claim: 'Global company profile and Toronto presence.', label: 'LinkedIn company profile', url: 'https://www.linkedin.com/company/sid-lee'},
        {type: 'Reported', claim: 'Toronto is listed among the agency offices.', label: 'Sid Lee offices', url: 'https://sidlee.com/en/meet-us'}
      ]
    },
    {
      rank: 4,
      name: 'Rethink',
      kind: 'Independent creative',
      ownership: 'Independent',
      people: [100, 190],
      office: [9000, 21850],
      rate: [115, 166],
      evidence: 41,
      coverage: [10, 11, 5, 9, 6],
      companySignal: '201–500 global; four-office structure',
      address: '720 King St W, Suite 700',
      delivery: '72–78% assumed',
      costs: '$115k–$135k loaded / employee',
      hours: '1,400–1,500 / delivery employee',
      ops: '12–17% of people cost',
      price: '$25–$49/hr · Clutch directory · low reliability',
      sources: [
        {type: 'Observed', claim: 'Global company band, four-office structure and Toronto address.', label: 'LinkedIn company profile', url: 'https://www.linkedin.com/company/rethink'},
        {type: 'Observed', claim: '$25–$49 directory rate; inconsistent with visible scale and not decision-grade.', label: 'Clutch listing', url: 'https://clutch.co/profile/rethink'}
      ]
    },
    {
      rank: 5,
      name: 'No Fixed Address',
      kind: 'Integrated creative',
      ownership: 'Independent collective',
      people: [85, 150],
      office: [7650, 17250],
      rate: [117, 177],
      evidence: 39,
      coverage: [10, 13, 5, 11, 0],
      companySignal: '51–200 public company band',
      address: '50 Carroll St',
      delivery: '71–77% assumed',
      costs: '$115k–$138k loaded / employee',
      hours: '1,375–1,500 / delivery employee',
      ops: '13–18% of people cost',
      price: 'No public price evidence located',
      sources: [
        {type: 'Observed', claim: 'Company band, Toronto headquarters, address and founding year.', label: 'LinkedIn company profile', url: 'https://www.linkedin.com/company/no-fixed-address'}
      ]
    },
    {
      rank: 6,
      name: 'LG2',
      kind: 'Creative + design',
      ownership: 'Independent',
      people: [75, 135],
      office: [6750, 15525],
      rate: [115, 167],
      evidence: 44,
      coverage: [10, 11, 12, 11, 0],
      companySignal: '201–500; 450+ people globally',
      address: '161 Liberty St E, Suite 300',
      delivery: '72–78% assumed',
      costs: '$115k–$136k loaded / employee',
      hours: '1,400–1,500 / delivery employee',
      ops: '12–17% of people cost',
      price: 'No public price evidence located',
      sources: [
        {type: 'Observed', claim: 'Company band, global people claim and Toronto suite address.', label: 'LinkedIn company profile', url: 'https://ca.linkedin.com/company/lg2'},
        {type: 'Reported', claim: 'Building totals 33,395 sq. ft.; LG2 leased area is not disclosed.', label: 'Adgar building page', url: 'https://adgarcanada.com/161-liberty-street/'}
      ]
    },
    {
      rank: 7,
      name: 'Zulu Alpha Kilo',
      kind: 'Independent creative',
      ownership: 'Independent',
      people: [65, 115],
      office: [5850, 13225],
      rate: [113, 164],
      evidence: 33,
      coverage: [10, 10, 5, 8, 0],
      companySignal: 'Toronto office; public band unavailable',
      address: 'Toronto, ON M4M',
      delivery: '73–79% assumed',
      costs: '$115k–$135k loaded / employee',
      hours: '1,400–1,500 / delivery employee',
      ops: '12–17% of people cost',
      price: 'No public price evidence located',
      sources: [
        {type: 'Observed', claim: 'Public company profile and Toronto location.', label: 'LinkedIn company profile', url: 'https://www.linkedin.com/company/zulu-alpha-kilo-inc.'},
        {type: 'Reported', claim: 'Toronto office presence.', label: 'Official Toronto page', url: 'https://www.zulualphakilo.com/about/toronto/'}
      ]
    },
    {
      rank: 8,
      name: 'Diamond',
      kind: 'Integrated + experiential',
      ownership: 'Independent',
      people: [75, 135],
      office: [6750, 15525],
      rate: [117, 177],
      evidence: 35,
      coverage: [10, 12, 5, 8, 0],
      companySignal: '51–200 public company band',
      address: '477 Richmond St W, Suite 1000',
      delivery: '71–77% assumed',
      costs: '$115k–$138k loaded / employee',
      hours: '1,375–1,500 / delivery employee',
      ops: '13–18% of people cost',
      price: 'No public price evidence located',
      sources: [
        {type: 'Observed', claim: 'Company band and Toronto headquarters address; associated-profile count appears noisy.', label: 'LinkedIn company profile', url: 'https://ca.linkedin.com/company/diamond-marketing-group'}
      ]
    },
    {
      rank: 9,
      name: 'Broken Heart Love Affair',
      kind: 'Independent creative',
      ownership: 'Independent',
      people: [50, 95],
      office: [4500, 10925],
      rate: [110, 160],
      evidence: 37,
      coverage: [10, 13, 5, 9, 0],
      companySignal: '51–200 public company band',
      address: '25 Brant St',
      delivery: '73–79% assumed',
      costs: '$112k–$132k loaded / employee',
      hours: '1,400–1,500 / delivery employee',
      ops: '12–17% of people cost',
      price: 'No public price evidence located',
      sources: [
        {type: 'Observed', claim: 'Company band, Toronto headquarters, address and founding year.', label: 'LinkedIn company profile', url: 'https://ca.linkedin.com/company/broken-heart-love-affair'}
      ]
    },
    {
      rank: 10,
      name: 'Juniper Park\\TBWA',
      kind: 'Network creative',
      ownership: 'Omnicom / TBWA',
      people: [30, 65],
      office: [2700, 7475],
      rate: [122, 186],
      evidence: 48,
      coverage: [10, 18, 8, 12, 0],
      companySignal: '51–200; ~31 associated profiles',
      address: '33 Bloor St E, 14th floor',
      delivery: '69–76% assumed',
      costs: '$115k–$138k loaded / employee',
      hours: '1,350–1,475 / delivery employee',
      ops: '14–19% of people cost',
      price: 'No public price evidence located',
      sources: [
        {type: 'Observed', claim: 'Company band, associated-profile count and Toronto address.', label: 'LinkedIn company profile', url: 'https://ca.linkedin.com/company/juniper-park-tbwa'}
      ]
    }
  ];

  var format = new Intl.NumberFormat('en-CA');
  var money = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD', maximumFractionDigits: 0});

  function range(values, formatter) {
    return formatter(values[0]) + '–' + formatter(values[1]);
  }

  function shortNumber(value) {
    if (value < 1000) return format.format(value);
    var rounded = Math.round(value / 100) / 10;
    return String(rounded).replace('.0', '') + 'k';
  }

  function midpoint(values) {
    return (values[0] + values[1]) / 2;
  }

  var list = document.getElementById('agency-list');
  var drawer = document.getElementById('agency-drawer');

  function render(sort) {
    if (!list) return;
    var ordered = agencies.slice().sort(function (a, b) {
      if (sort === 'evidence') return b.evidence - a.evidence;
      return midpoint(b[sort]) - midpoint(a[sort]);
    });
    list.innerHTML = ordered.map(function (a) {
      return '<button class="economics-row" data-agency="' + a.rank + '">' +
        '<span class="agency"><i class="rank">' + String(a.rank).padStart(2, '0') + '</i><strong>' + a.name + '</strong><small>' + a.kind + '</small></span>' +
        '<span class="value people"><i class="bar" style="--bar:' + Math.max(9, Math.min(100, midpoint(a.people) / 9.5)) + '%"></i>' + range(a.people, format.format) + '<small>modelled range</small></span>' +
        '<span class="value office">' + range(a.office, shortNumber) + '<small>sq. ft. need · modelled</small></span>' +
        '<span class="value rate">' + range(a.rate, money.format) + '<small>per delivery hr · modelled</small></span>' +
        '<span class="value evidence"><i class="evidence-bar"><b style="width:' + a.evidence + '%"></b></i>' + a.evidence + '%<small>public coverage</small></span>' +
        '<span class="plus">＋</span></button>';
    }).join('');
  }

  function openAgency(rank) {
    if (!drawer) return;
    var a = agencies.find(function (agency) { return agency.rank === rank; });
    if (!a) return;
    document.getElementById('drawer-title').textContent = a.name;
    document.getElementById('drawer-kind').textContent = a.kind + ' · ' + a.ownership;
    document.getElementById('drawer-confidence').textContent = a.evidence + '%';
    var coverageLabels = ['Identity', 'Toronto staff', 'Exact footprint', 'Role mix', 'Pricing'];
    var coverageMax = [10, 25, 20, 20, 25];
    document.getElementById('drawer-coverage').innerHTML = a.coverage.map(function (value, index) {
      return '<div><span>' + coverageLabels[index] + '</span><i><b style="width:' + (value / coverageMax[index] * 100) + '%"></b></i><small>' + value + '/' + coverageMax[index] + '</small></div>';
    }).join('');
    document.getElementById('drawer-grid').innerHTML = [
      ['Public company signal', a.companySignal],
      ['Toronto people', range(a.people, format.format) + ' · modelled'],
      ['Office signal', a.address + ' · observed'],
      ['Space need', range(a.office, format.format) + ' sq. ft. · modelled'],
      ['Delivery share', a.delivery],
      ['Loaded people cost', a.costs + ' · assumed'],
      ['Collected hours', a.hours + ' · assumed'],
      ['Other operations', a.ops + ' · assumed'],
      ['Operating floor', range(a.rate, money.format) + ' / hr · modelled'],
      ['Public price signal', a.price],
      ['Exact leased area', 'Not located in the public record']
    ].map(function (item) {
      return '<div><small>' + item[0] + '</small><b>' + item[1] + '</b></div>';
    }).join('');
    document.getElementById('drawer-sources').innerHTML = a.sources.map(function (source) {
      return '<a href="' + source.url + '" target="_blank" rel="noreferrer"><i class="' + source.type.toLowerCase() + '">' + source.type + '</i><b>' + source.label + ' ↗</b><span>' + source.claim + '</span></a>';
    }).join('');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    drawer.querySelector('.economics-close').focus();
    if (window.smallerTrack) window.smallerTrack('agency_profile_opened', {agency: a.name, evidence_coverage: a.evidence});
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (list && drawer) {
    document.querySelectorAll('.economics-controls button').forEach(function (button) {
      button.addEventListener('click', function () {
        document.querySelectorAll('.economics-controls button').forEach(function (item) { item.classList.remove('active'); });
        button.classList.add('active');
        render(button.dataset.sort);
      });
    });
    list.addEventListener('click', function (event) {
      var row = event.target.closest('[data-agency]');
      if (row) openAgency(Number(row.dataset.agency));
    });
    drawer.querySelectorAll('[data-close]').forEach(function (button) { button.addEventListener('click', closeDrawer); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });
    render('people');
  }

  var calculator = document.getElementById('calc-pay');
  if (!calculator) return;

  var inputIds = ['pay', 'delivery', 'hours', 'density', 'rent', 'ops', 'margin'];
  var inputs = {};
  inputIds.forEach(function (id) { inputs[id] = document.getElementById('calc-' + id); });

  function cents(value) {
    return Math.round(value * 100) + '¢';
  }

  function updateCalculator() {
    var pay = Number(inputs.pay.value) * 1000;
    var delivery = Number(inputs.delivery.value) / 100;
    var hours = Number(inputs.hours.value);
    var density = Number(inputs.density.value);
    var rent = Number(inputs.rent.value);
    var opsRate = Number(inputs.ops.value) / 100;
    var margin = Number(inputs.margin.value) / 100;
    var space = density * rent;
    var operations = pay * opsRate;
    var total = pay + space + operations;
    var deliveryHours = delivery * hours;
    var floor = total / deliveryHours;
    var sell = floor / (1 - margin);
    var shares = {
      delivery: pay * delivery / total,
      support: pay * (1 - delivery) / total,
      space: space / total,
      ops: operations / total
    };

    document.getElementById('calc-pay-value').textContent = '$' + inputs.pay.value + 'k';
    document.getElementById('calc-delivery-value').textContent = inputs.delivery.value + '%';
    document.getElementById('calc-hours-value').textContent = format.format(hours);
    document.getElementById('calc-density-value').textContent = inputs.density.value + ' sq. ft.';
    document.getElementById('calc-rent-value').textContent = '$' + inputs.rent.value;
    document.getElementById('calc-ops-value').textContent = inputs.ops.value + '%';
    document.getElementById('calc-margin-value').textContent = inputs.margin.value + '%';
    document.getElementById('calc-margin-label').textContent = inputs.margin.value + '%';
    document.getElementById('calc-floor').textContent = money.format(floor);
    document.getElementById('calc-sell').textContent = money.format(sell);
    document.getElementById('cost-delivery').textContent = cents(shares.delivery);
    document.getElementById('cost-support').textContent = cents(shares.support);
    document.getElementById('cost-space').textContent = cents(shares.space);
    document.getElementById('cost-ops').textContent = cents(shares.ops);
    document.getElementById('bar-delivery').style.width = shares.delivery * 100 + '%';
    document.getElementById('bar-support').style.width = shares.support * 100 + '%';
    document.getElementById('bar-space').style.width = shares.space * 100 + '%';
    document.getElementById('bar-ops').style.width = shares.ops * 100 + '%';
    document.getElementById('calc-hours-impact').textContent = '+' + ((hours / Math.max(1, hours - 100) - 1) * 100).toFixed(1) + '%';
    document.getElementById('calc-rent-impact').textContent = '+$' + (density * 20 / deliveryHours).toFixed(2);
  }

  inputIds.forEach(function (id) { inputs[id].addEventListener('input', updateCalculator); });
  updateCalculator();
})();
