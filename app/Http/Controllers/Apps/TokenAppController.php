<?php

   namespace App\Http\Controllers\Apps;

   use App\Http\Controllers\Controller;
   use App\Http\Requests\Apps\TokenAppRequest;
   use App\Http\Resources\Apps\TokenAppResource;
   use App\Models\Application;
   use App\Models\Lembaga;
   use App\Models\TokenApp;
   use Illuminate\Http\Request;
   use Illuminate\Support\Facades\Auth;
   use Illuminate\Support\Facades\DB;

   class TokenAppController extends Controller
   {
      public function index(Request $request) {
         $user        = Auth::user()->load('userLembaga');
         $perPage     = $request->input('per_page', 10);
         $currentPage = $request->input('page', 1);
         $query       = TokenApp::with(['application', 'lembaga']);
         if($user->hasRole('super-admin')){
            if($request->filled('search')){
               $search = $request->search;
               $query->where(function($q) use ($search) {
                  $q
                     ->where('token', 'like', "%$search%")->orWhere('description', 'like', "%$search%");
               });
            }
         }
         else if($user->hasRole('member')){
            $userLembaga = $user->userLembaga;
            if($userLembaga && $userLembaga->user_npsn){
               $npsn = $userLembaga->user_npsn;
               $query->where('token_npsn', $npsn);
               if($request->filled('search')){
                  $search = $request->search;
                  $query->where(function($q) use ($search) {
                     $q
                        ->where('token', 'like', "%$search%")->orWhere('description', 'like', "%$search%");
                  });
               }
            }
            else {
               $query->whereRaw('0=1'); // kosongkan
            }
         }
         else {
            $query->whereRaw('0=1'); // role tidak valid
         }
         // Ambil hasil paginasi
         $tokenApps = $query
            ->latest()->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();
         // Select2 modal
         $applications = Application::select('id', 'name')->orderBy('name')->get();
         $lembagas     = Lembaga::select('npsn', 'name')->orderBy('name')->get();

         // Return ke Inertia, dengan struktur lengkap pagination
         return inertia('apps/token-apps/index', [
            'tokenApps'    => TokenAppResource::collection($tokenApps)->response()->getData(true),
            //            'tokenApps'    => $tokenApps,
            'currentPage'  => $currentPage,
            'applications' => $applications,
            'lembagas'     => $lembagas,
            'perPage'      => $perPage,
         ]);
      }

      public function store(TokenAppRequest $request) {
         $user = auth()->user();
         $data = $request->validated();
         if($user && $user->hasRole('member')){
            $userLembaga = $user->userLembaga; // pastikan relasi sudah benar
            if(!$userLembaga || !$userLembaga->user_npsn){
               return back()->with('error', 'Lembaga pengguna tidak ditemukan atau tidak memiliki NPSN.');
            }
            // Override token_npsn dari relasi, agar user member tidak bisa input sembarangan
            $data['token_npsn'] = $userLembaga->user_npsn;
         }
         // Cek apakah kombinasi application_id + token_npsn sudah ada
         $exists = TokenApp::where('application_id', $data['application_id'])
                           ->where('token_npsn', $data['token_npsn'])
                           ->exists();
         if($exists){
            return back()->with('error', 'Anda hanya bisa menambahkan satu lembaga dengan 1 token untuk 1 aplikasi.');
         }
         DB::beginTransaction();
         try {
            TokenApp::create($data);
            DB::commit();

            return to_route('apps.token-apps.index')->with('success', 'Token berhasil ditambahkan.');
         } catch(\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Terjadi kesalahan saat menyimpan data.');
         }
      }

      public function update(TokenAppRequest $request, $id) {
         $user = auth()->user();
         $data = $request->validated();
         if($user && $user->hasRole('member')){
            $userLembaga = $user->userLembaga; // pastikan relasi sudah benar
            if(!$userLembaga || !$userLembaga->user_npsn){
               return back()->with('error', 'Lembaga pengguna tidak ditemukan atau tidak memiliki NPSN.');
            }
            // Override token_npsn dari relasi, agar user member tidak bisa input sembarangan
            $data['token_npsn'] = $userLembaga->user_npsn;
         }
         // Cari TokenApp berdasarkan ID yang akan diupdate
         $tokenApp = TokenApp::find($id);
         if(!$tokenApp){
            return back()->with('error', 'Token aplikasi tidak ditemukan.');
         }
         // Cek apakah kombinasi application_id + token_npsn sudah ada di data lain (exclude ID ini)
         $exists = TokenApp::where('application_id', $data['application_id'])
                           ->where('token_npsn', $data['token_npsn'])
                           ->where('id', '<>', $id)
                           ->exists();
         if($exists){
            return back()->with('error', 'Anda hanya bisa menambahkan satu lembaga dengan 1 token untuk 1 aplikasi.');
         }
         DB::beginTransaction();
         try {
            $tokenApp->update($data);
            DB::commit();

            return to_route('apps.token-apps.index')->with('success', 'Token berhasil diperbarui.');
         } catch(\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Terjadi kesalahan saat memperbarui data.');
         }
      }

      public function destroy($id) {
         $token = TokenApp::findOrFail($id);
         $token->delete(); // Soft delete

         return to_route('apps.token-apps.index')->with('success', 'Token aplikasi berhasil dihapus (soft delete).');
      }

      // Restore dari soft delete
      public function restore($id) {
         $token = TokenApp::onlyTrashed()->findOrFail($id);
         $token->restore();

         return to_route('apps.token-apps.index')->with('success', 'Token aplikasi berhasil dipulihkan.');
      }

      // Hapus permanen (force delete)
      public function forceDelete($id) {
         $token = TokenApp::onlyTrashed()->findOrFail($id);
         $token->forceDelete();

         return to_route('apps.token-apps.index')->with('success', 'Token aplikasi dihapus permanen dari database.');
      }
   }
