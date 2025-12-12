import { ref } from 'vue';

type Appearance = 'light' | 'dark' | 'system';

/**
 * 💡 Core Function: Applies the theme class (dark) to the <html> element.
 * This is called during immediate initialization and whenever the user changes the theme.
 * @param value - The desired theme ('light', 'dark', or 'system')
 */
export function updateTheme(value: Appearance) {
    if (typeof window === 'undefined') {
        return;
    }

    if (value === 'system') {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        const systemTheme = mediaQueryList.matches ? 'dark' : 'light';

        document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
        document.documentElement.classList.toggle('dark', value === 'dark');
    }
}

/**
 * 🍪 Helper Function: Sets a cookie for persistence.
 * Useful for maintaining preference across page loads or for SSR (Server-Side Rendering).
 */
const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;

    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

/**
 * 🖥️ Helper Function: Gets the system media query listener.
 */
const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

// 🌟 دالة جديدة: يتم استدعاؤها مرة واحدة في main.ts
export function initializeThemeSetup() {
    const initialAppearance = getStoredAppearance() as Appearance | null;

    // 1. تطبيق المظهر فوراً
    updateTheme(initialAppearance || 'system');

    // 2. تهيئة مستمع لتغيير تفضيلات النظام
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);

    // إرجاع القيمة الأولية لاستخدامها في useAppearance
    return initialAppearance || 'system';
}

/**
 * 💾 Helper Function: Reads the stored appearance preference from Local Storage.
 */
const getStoredAppearance = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return localStorage.getItem('appearance') as Appearance | null;
};

/**
 * 🔄 Helper Function: Handles system theme changes (e.g., user switches OS theme).
 */
const handleSystemThemeChange = () => {
    const currentAppearance = getStoredAppearance();

    // Only update if the user is currently set to 'system' or has no saved preference
    updateTheme(currentAppearance || 'system');
};

// =================================================================
// 🚀 Anti-Flicker Solution (Module Level Initialization)
// This code runs synchronously the moment the JS file is loaded,
// before Vue mounts any components, ensuring the theme is set immediately.
// =================================================================

const initialAppearance = getStoredAppearance() as Appearance | null;

// 1. Apply the theme immediately to prevent the white flash (Flicker)
updateTheme(initialAppearance || 'system');

// 2. Initialize the system theme change listener
mediaQuery()?.addEventListener('change', handleSystemThemeChange);

// 3. Set the initial reactive value
const appearance = ref<Appearance>(initialAppearance || 'system');

// =================================================================
// 🔗 Composable Interface for Vue Components
// =================================================================

export function useAppearance() {

    function updateAppearance(value: Appearance) {
        appearance.value = value;

        // 1. Store in Local Storage
        localStorage.setItem('appearance', value);

        // 2. Store in Cookie (Useful for SSR)
        setCookie('appearance', value);

        // 3. Update the actual page theme
        updateTheme(value);
    }

    return {
        appearance,
        updateAppearance,
    };
}
