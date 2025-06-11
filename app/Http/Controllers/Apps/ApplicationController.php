<?php

   namespace App\Http\Controllers\Apps;

   use App\Http\Controllers\Controller;
   use App\Http\Requests\Apps\ApplicationRequest;
   use App\Models\Application;
   use Illuminate\Http\Request;
   use Illuminate\Routing\Controllers\Middleware;

   class ApplicationController extends Controller
   {
      public static function middleware(): array {
         return [
            new Middleware('application:applications-data', only:['index']),
            new Middleware('application:applications-create', only:['store']),
            new Middleware('application:applications-update', only:['update']),
            new Middleware('application:applications-destroy', only:['destroy']),
         ];
      }

      /**
       * Display a listing of the resource.
       */
      public function index(Request $request) {
         // request page data
         $currentPage = $request->input('page', 1);
         $perPage     = $request->input('per_page', 10);
         // get list data permssions
         $applications = Application::query()
                                    ->select('*')
                                    ->when($request->search, fn($search) => $search->where('name', 'like', '%' . $request->search . '%'))
                                    ->latest()
                                    ->paginate($perPage, ['*'], 'page', $currentPage)
                                    ->withQueryString();

         // render view
         return inertia('apps/applications/index', [
            'applications' => $applications,
            'currentPage'  => $currentPage,
            'perPage'      => $perPage,
         ]);
      }

      public function store(ApplicationRequest $request) {
         // Simpan data application berdasarkan validasi
         Application::create($request->validated());

         // Redirect ke halaman index
         return to_route('apps.applications.index')->with('success', 'Berhasil menambahkan Aplikasi.');
      }

      public function update(ApplicationRequest $request, Application $application) {
         // Update data application dengan data yang tervalidasi
         $application->update($request->validated());

         // Redirect ke halaman index
         return to_route('apps.applications.index')->with('success', 'Berhasil mengubah aplikasi.');
      }

      public function destroy(Application $application) {
         // Hapus application dari database
         $application->delete();

         // Redirect ke halaman index
         return to_route('apps.applications.index')->with('success', 'Berhasil menghapus aplikasi.');
      }
   }
