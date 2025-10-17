(() => {
  // ---- Config discovery (non-visual) ----
  // Priority: ?api=<url> → localStorage.ready72_api → ENV placeholder (no-op)
  const qp = new URLSearchParams(location.search);
  const fromQuery = qp.get('api');
  const fromStorage = (typeof localStorage !== 'undefined' && localStorage.getItem('ready72_api')) || null;

  // NOTE: leave the default as a harmless placeholder to avoid noisy calls if not configured
  const DEFAULT_API = 'https://example.invalid';

  const API_BASE = (fromQuery && fromQuery.trim()) || fromStorage || DEFAULT_API;

  // Persist if provided via query param so you don't have to keep typing it
  if (fromQuery && typeof localStorage !== 'undefined') {
    localStorage.setItem('ready72_api', API_BASE);
  }

  // Expose for debugging in DevTools without touching the DOM
  window.__READY72_BOOT__ = { API_BASE };

  // ---- Non-intrusive health check ----
  // Try GET {API_BASE}/api/status (common pattern). Time out quickly; no visual effects.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);

  const safeFetch = async () => {
    if (!/^https?:\/\//i.test(API_BASE) || /example\.invalid/.test(API_BASE)) {
      console.log('[ready72] Engine bootloader: no API configured. Set via ?api=https://your-engine.example or localStorage.ready72_api');
      return;
    }
    try {
      const url = API_BASE.replace(/\/+$/, '') + '/api/status';
      const res = await fetch(url, { signal: controller.signal, credentials: 'include' });
      clearTimeout(timeout);
      const ok = res.ok;
      const ct = res.headers.get('content-type') || '';
      let body = null;
      if (ct.includes('application/json')) {
        body = await res.json();
      } else {
        body = await res.text();
      }
      console.log('[ready72] Engine status:', { url, ok, status: res.status, body });
    } catch (err) {
      console.log('[ready72] Engine status check failed:', String(err));
    }
  };

  safeFetch();
})();
