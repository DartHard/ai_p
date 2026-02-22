  const packages = [
    {
      price: 250,
      label: '$250 trading deposit',
      perks: [
        'Personal manager',
        'Basic trading signals',
        '24/7 support'
      ]
    },
    {
      price: 275,
      label: '$275 trading deposit',
      perks: [
        'Personal manager',
        'Signals + analytics',
        'Priority support'
      ]
    },
    {
      price: 295,
      label: '$295 trading deposit',
      perks: [
        'Senior manager',
        'Premium signals',
        '1 strategy call per week'
      ]
    },
    {
      price: 345,
      label: '$345 trading deposit',
      perks: [
        'Senior manager',
        'Premium signals + alerts',
        '2 strategy calls per week',
        'Faster withdrawals'
      ]
    },
    {
      price: 490,
      label: '$490 trading deposit',
      perks: [
        'VIP manager',
        'VIP signals + portfolio review',
        'Daily strategy call',
        'Fast withdrawals',
        'Private chat support'
      ]
    }
  ];

  const list = document.getElementById('depositList');
  let opened = null;

  function renderPackages(){
    list.innerHTML = '';

    packages.forEach(pkg => {
      const item = document.createElement('div');
      item.className = 'amt';
      item.dataset.price = pkg.price;

      const perksHtml = pkg.perks.map(p => `<li>${p}</li>`).join('');

      item.innerHTML = `
        <div class="amtTop">$${pkg.price}</div>
        <div class="amtBot">
          <span class="check">
            <svg viewBox="0 0 24 24" width="12" height="12">
              <path fill="rgba(234,243,255,.92)"
              d="M9.2 16.6 4.9 12.3a1 1 0 1 1 1.4-1.4l2.9 2.9 8.5-8.5a1 1 0 0 1 1.4 1.4l-9.9 9.9a1 1 0 0 1-1.4 0z"/>
            </svg>
          </span>
          ${pkg.label}
        </div>

        <div class="perks">
          <ul class="perksList">
            ${perksHtml}
          </ul>
        </div>
      `;

      item.addEventListener('click', () => {

        if (opened && opened !== item) {
          opened.classList.remove('selected');
        }
        item.classList.toggle('selected');
        opened = item.classList.contains('selected') ? item : null;
      });

      list.appendChild(item);
    });
  }

  renderPackages();

  renderPackages(packages[0].price);

    document.getElementById('btnWhats').addEventListener('click', ()=> alert('WhatsApp action (demo)'));
    document.getElementById('btnCall').addEventListener('click', ()=> alert('Call action (demo)'));
    document.getElementById('btnAdd').addEventListener('click', ()=> alert('Add Contact action (demo)'));