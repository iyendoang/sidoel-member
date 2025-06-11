// resources/js/types/global.d.ts

import { PageProps as AppPageProps } from './'; // dari index.d.ts
import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;
}

// Extend module Inertia
declare module '@inertiajs/core' {
    interface PageProps extends AppPageProps {}
}
