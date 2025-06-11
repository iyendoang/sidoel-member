<?php

   namespace App\Http\Middleware;

   use Illuminate\Http\Request;
   use Illuminate\Support\Arr;
   use Inertia\Middleware;

   class HandleInertiaRequests extends Middleware
   {
      /**
       * The root template that is loaded on the first page visit.
       *
       * @var string
       */
      protected $rootView = 'app';

      /**
       * Determine the current asset version.
       */
      public function version(Request $request): ?string {
         return parent::version($request);
      }

      /**
       * Define the props that are shared by default.
       *
       * @return array<string, mixed>
       */
      public function share(Request $request): array {
         return [
            ...parent::share($request),
            'appName' => config('app.name'),
            'auth'    => [
               'user'        => $request->user(),
               'permissions' => $request->user() ? $request->user()->getUserPermissions() : [],
               'super'       => $request->user() ? $request->user()->isSuperAdmin() : false,
            ],
            'flash'   => [
               'success' => session('success'),
               'error'   => session('error'),
               'info'    => session('info'),
               'warning' => session('warning'),
            ],
            //            'ziggy'        => [
            //               ...(new Ziggy)->toArray(),
            //               'location' => $request->url(),
            //            ],
            //            'notification' => collect(Arr::only($request->session()->all(), [
            //               'success',
            //               'error',
            //               'warning',
            //               'info',
            //               'default',
            //            ]))->mapWithKeys(fn($notification, $key) => ['type' => $key, 'body' => $notification]),
         ];
      }
   }
