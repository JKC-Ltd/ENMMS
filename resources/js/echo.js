/**
 * echo.js — Laravel Echo configuration (ENMMS v2)
 *
 * Sets window.Echo globally so the static dashboard JS files
 * (public/assets/js/dashboardCharts.js, dashboardNonCharts.js, etc.)
 * can use it without going through the Vite build pipeline.
 *
 * Loaded via @vite(['resources/js/echo.js']) in the app layout head.
 */

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    scheme: import.meta.env.VITE_REVERB_SCHEME ?? 'http',
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'http') === 'https',
    enabledTransports: ['ws', 'wss'],
    disableStats: true,
});
