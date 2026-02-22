document.addEventListener('DOMContentLoaded', () => {
  const payBtn = document.getElementById('payBtn');
  const modal  = document.getElementById('payModal');
  const modalAmount = document.getElementById('modalAmount');

  if (!payBtn || !modal || !modalAmount) {
    console.warn('[PAY] Missing elements:', { payBtn, modal, modalAmount });
    return;
  }

  let autoCloseTimer = null;

  function parseMoney(text) {
    if (!text) return 0;
    const n = Number(String(text).replace(/[^\d]/g, ''));
    return Number.isFinite(n) ? n : 0;
  }

  function getSelectedDepositAmount() {
    const selected =
      document.querySelector('.amt.selected') ||
      document.querySelector('.amt.is-selected') ||
      document.querySelector('.amt[data-selected="1"]');

    const first = document.querySelector('.amt');

    const el = selected || first;
    if (!el) {
      const listText = document.getElementById('depositList')?.textContent || '';
      return parseMoney(listText);
    }

    const dv = el.dataset?.value || el.dataset?.amount;
    if (dv && Number(dv) > 0) return Number(dv);

    const topText = el.querySelector('.amtTop')?.textContent || '';
    const amountFromTop = parseMoney(topText);
    if (amountFromTop > 0) return amountFromTop;

    const amountFromBlock = parseMoney(el.textContent);
    if (amountFromBlock > 0) return amountFromBlock;

    return 0;
  }

  function openModal() {
    const amount = getSelectedDepositAmount();
    modalAmount.textContent = `$${amount}`;

    modal.classList.add('isOpen');
    modal.setAttribute('aria-hidden', 'false');

    clearTimeout(autoCloseTimer);
    autoCloseTimer = setTimeout(closeModal, 10000);
  }

  function closeModal() {
    clearTimeout(autoCloseTimer);
    modal.classList.remove('isOpen');
    modal.setAttribute('aria-hidden', 'true');
  }

  payBtn.addEventListener('click', openModal);

  modal.addEventListener('click', (e) => {
    if (e.target && e.target.closest('[data-close="1"]')) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('isOpen')) closeModal();
  });
});