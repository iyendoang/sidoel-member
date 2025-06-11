<?php

   namespace App\Http\Controllers\Apps;

   use App\Http\Controllers\Controller;
   use App\Http\Requests\Apps\LembagaRequest;
   use App\Models\Lembaga;
   use App\Models\UserLembaga;
   use Illuminate\Http\Request;
   use Illuminate\Routing\Controllers\Middleware;
   use Illuminate\Support\Facades\Auth;
   use Illuminate\Support\Facades\DB;

   class LembagaController extends Controller
   {
      public static function middleware() {
         return [
            new Middleware('lembaga:lembagas-data', only:['index']),
            new Middleware('lembaga:lembagas-create', only:['store']),
            new Middleware('lembaga:lembagas-update', only:['update']),
            new Middleware('lembaga:lembagas-destroy', only:['destroy']),
         ];
      }

      /**
       * Display a listing of the resource.
       */
      public function index(Request $request) {
         $user        = Auth::user()->load('userLembagas');
         $currentPage = $request->input('page', 1);
         $perPage     = $request->input('per_page', 10);
         $query       = Lembaga::query();
         if($user->hasRole('super-admin')){
            if($request->filled('search')){
               $query->where('name', 'like', '%' . $request->search . '%');
            }
         }
         else if($user->hasRole('member')){
            $npsnList = $user->userLembagas->pluck('user_npsn')->filter()->unique()->toArray();
            if(!empty($npsnList)){
               $query->whereIn('npsn', $npsnList);
            }
            else {
               $query->whereRaw('0=1');
            }
         }
         else {
            // Role lain tidak punya akses
            $query->whereRaw('0=1');
         }
         $lembagas        = $query
            ->latest()->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();
         $lembaga_options = Lembaga::select('npsn', 'name')->orderBy('name')->get();

         return inertia('apps/lembagas/index', [
            'lembagas'        => $lembagas,
            'lembaga_options' => $lembaga_options,
            'currentPage'     => $currentPage,
            'perPage'         => $perPage,
         ]);
      }

      public function store(LembagaRequest $request) {
         $user = Auth::user();
         // Jika user member, validasi bahwa hanya bisa punya 1 lembaga
         if($user->hasRole('member')){
            $existing = UserLembaga::where('user_id', $user->id)->exists();
            if($existing){
               return back()->with('error', 'Anda hanya bisa menambahkan satu lembaga.');
            }
         }
         DB::beginTransaction();
         try {
            // Simpan data lembaga
            $lembaga = Lembaga::create($request->validated());
            // Jika user member, buat relasi ke user_lembagas
            if($user->hasRole('member')){
               UserLembaga::create([
                  'user_id'   => $user->id,
                  'user_npsn' => $lembaga->npsn,
               ]);
            }
            DB::commit();

            return to_route('apps.lembagas.index')->with('success', 'Lembaga berhasil ditambahkan.');
         } catch(\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Terjadi kesalahan saat menyimpan data.');
         }
      }

      public function update(LembagaRequest $request, Lembaga $lembaga) {
         // Update data lembaga dengan data yang tervalidasi
         $lembaga->update($request->validated());

         // Redirect ke halaman index
         return to_route('apps.lembagas.index')->with('success', 'Lembaga berhasil diperbarui.');
      }

      public function destroy(Lembaga $lembaga) {
         // Hapus lembaga dari database
         $lembaga->delete();

         // Redirect ke halaman index
         return to_route('apps.lembagas.index')->with('success', 'Lembaga berhasil dihapus.');
      }

      public function forceAddNpsn(Request $request) {
         $user = Auth::user();
         // Hanya user dengan role 'member' yang diizinkan
         if(!$user->hasRole('member')){
            return back()->with('error', 'Anda tidak diizinkan untuk menambahkan lembaga.');
         }
         // Cek apakah user sudah memiliki lembaga
         $existing = UserLembaga::where('user_id', $user->id)->exists();
         if($existing){
            return back()->with('error', 'Anda hanya bisa menambahkan satu lembaga.');
         }
         DB::beginTransaction();
         try {
            // Cari data lembaga berdasarkan NPSN
            $lembaga = Lembaga::where('npsn', $request->npsn)->first();
            // Validasi jika lembaga tidak ditemukan
            if(!$lembaga){
               return back()->with('error', 'NPSN tidak ditemukan di database.');
            }
            // Buat relasi user <-> lembaga
            UserLembaga::create([
               'user_id'   => $user->id,
               'user_npsn' => $lembaga->npsn,
            ]);
            DB::commit();

            return to_route('apps.lembagas.index')->with('success', 'Lembaga berhasil ditambahkan.');
         } catch(\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Terjadi kesalahan saat menyimpan data.');
         }
      }
      public function updateNpsn(Request $request)
      {
         $user = Auth::user();

         // Hanya user dengan role 'member' yang diizinkan
         if (!$user->hasRole('member')) {
            return back()->with('error', 'Anda tidak diizinkan untuk mengubah lembaga.');
         }

         DB::beginTransaction();
         try {
            // Cek apakah NPSN yang diberikan valid
            $lembaga = Lembaga::where('npsn', $request->npsn)->first();
            if (!$lembaga) {
               return back()->with('error', 'NPSN tidak ditemukan di database.');
            }

            // Cek apakah user sudah punya relasi user_lembagas
            $userLembaga = UserLembaga::where('user_id', $user->id)->first();

            if ($userLembaga) {
               // Update relasi lama dengan NPSN baru
               $userLembaga->update([
                  'user_npsn' => $lembaga->npsn,
               ]);
            } else {
               // Jika belum ada, buat relasi baru
               UserLembaga::create([
                  'user_id'   => $user->id,
                  'user_npsn' => $lembaga->npsn,
               ]);
            }

            DB::commit();

            return to_route('apps.lembagas.index')->with('success', 'Lembaga berhasil diperbarui.');
         } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Terjadi kesalahan saat memperbarui data.');
         }
      }

   }
