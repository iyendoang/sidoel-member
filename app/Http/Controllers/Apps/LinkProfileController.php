<?php

   namespace App\Http\Controllers\Apps;

   use App\Http\Controllers\Controller;
   use App\Http\Requests\Apps\LinkProfileRequest;
   use App\Http\Resources\Apps\LinkProfileResource;
   use App\Http\Resources\Apps\LinkResource;
   use App\Models\Lembaga;
   use App\Models\Link;
   use App\Models\LinkProfile;
   use Illuminate\Http\Request;
   use Illuminate\Support\Facades\Auth;
   use Illuminate\Support\Facades\DB;

   class LinkProfileController extends Controller
   {
      public function index(Request $request) {
         $user        = Auth::user()->load('userLembaga');
         $perPage     = $request->input('per_page', 10);
         $currentPage = $request->input('page', 1);
         $query       = LinkProfile::with('lembaga');
         if($user->hasRole('super-admin')){
            if($request->filled('search')){
               $search = $request->search;
               $query->where(function($q) use ($search) {
                  $q
                     ->where('link_profile_npsn', 'like', "%$search%")
                     ->orWhere('display_name', 'like', "%$search%")
                     ->orWhere('bio', 'like', "%$search%");
               });
            }
         }
         else if($user->hasRole('member')){
            $userLembaga = $user->userLembaga;
            if($userLembaga && $userLembaga->user_npsn){
               $npsn = $userLembaga->user_npsn;
               $query->where('link_profile_npsn', $npsn);
               if($request->filled('search')){
                  $search = $request->search;
                  $query->where(function($q) use ($search) {
                     $q
                        ->where('display_name', 'like', "%$search%")->orWhere('bio', 'like', "%$search%");
                  });
               }
            }
            else {
               $query->whereRaw('0=1');
            }
         }
         else {
            $query->whereRaw('0=1');
         }
         $linkProfiles = $query
            ->latest()->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();
         $lembagas     = Lembaga::select('npsn', 'name')->orderBy('name')->get();

         return inertia('apps/link-profiles/index', [
            'linkProfiles' => LinkProfileResource::collection($linkProfiles)->response()->getData(true),
            'lembagas'     => $lembagas,
            'currentPage'  => $currentPage,
            'perPage'      => $perPage,
         ]);
      }

      public function store(LinkProfileRequest $request) {
         $user = auth()->user();
         $data = $request->validated();
         // Jika member, paksa ambil NPSN dari relasi user
         if($user && $user->hasRole('member')){
            $userLembaga = $user->userLembaga;
            if(!$userLembaga || !$userLembaga->user_npsn){
               return back()->with('error', 'Lembaga pengguna tidak ditemukan atau tidak memiliki NPSN.');
            }
            // Override agar member tidak bisa input NPSN sembarangan
            $data['link_profile_npsn'] = $userLembaga->user_npsn;
         }
         // Cek jika sudah ada profile untuk NPSN tersebut
         $exists = LinkProfile::where('link_profile_npsn', $data['link_profile_npsn'])->exists();
         if($exists){
            return back()->with('error', 'Link profile untuk NPSN tersebut sudah ada.');
         }
         // Upload avatar jika ada
         if($request->hasFile('avatar') && $request->file('avatar')->isValid()){
            $avatarFile = $request->file('avatar');
            // Buat nama file unik, misal: timestamp + nama asli
            $filename = time() . '_' . $avatarFile->getClientOriginalName();
            // Pindahkan file ke folder public/images/link-profiles/
            $avatarFile->move(public_path('images/link-profiles'), $filename);
            // Simpan path relatif avatar ke data, misal 'images/link-profiles/namafile.jpg'
            $data['avatar'] = 'images/link-profiles/' . $filename;
         }
         DB::beginTransaction();
         try {
            LinkProfile::create($data);
            DB::commit();

            return to_route('apps.link-profiles.index')->with('success', 'Link profile berhasil ditambahkan.');
         } catch(\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Terjadi kesalahan saat menyimpan link profile.');
         }
      }

      public function update(LinkProfileRequest $request, LinkProfile $linkProfile) {
         $user = auth()->user();
         $data = $request->validated();
         // Jika member, paksa ambil NPSN dari relasi user
         if($user && $user->hasRole('member')){
            $userLembaga = $user->userLembaga;
            if(!$userLembaga || !$userLembaga->user_npsn){
               return back()->with('error', 'Lembaga pengguna tidak ditemukan atau tidak memiliki NPSN.');
            }
            // Override agar member tidak bisa update NPSN sembarangan
            $data['link_profile_npsn'] = $userLembaga->user_npsn;
         }
         // Cek jika ada link_profile_npsn lain selain yang sedang diupdate
         $exists = LinkProfile::where('link_profile_npsn', $data['link_profile_npsn'])
                              ->where('id', '!=', $linkProfile->id)
                              ->exists();
         if($exists){
            return back()->with('error', 'Link profile untuk NPSN tersebut sudah ada.');
         }
         // Upload avatar jika ada file baru
         if($request->hasFile('avatar') && $request->file('avatar')->isValid()){
            $avatarFile = $request->file('avatar');
            $filename   = time() . '_' . $avatarFile->getClientOriginalName();
            $avatarFile->move(public_path('images/link-profiles'), $filename);
            // Hapus file avatar lama jika ada dan berbeda dari default
            if($linkProfile->avatar && file_exists(public_path($linkProfile->avatar))){
               @unlink(public_path($linkProfile->avatar));
            }
            $data['avatar'] = 'images/link-profiles/' . $filename;
         }
         DB::beginTransaction();
         try {
            $linkProfile->update($data);
            DB::commit();

            return to_route('apps.link-profiles.index')->with('success', 'Link profile berhasil diperbarui.');
         } catch(\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Terjadi kesalahan saat memperbarui link profile.');
         }
      }

      public function destroy(LinkProfile $linkProfile) {
         DB::beginTransaction();
         try {
            // Hapus file avatar jika ada dan bukan default
            if($linkProfile->avatar && file_exists(public_path($linkProfile->avatar))){
               @unlink(public_path($linkProfile->avatar));
            }
            $linkProfile->delete();
            DB::commit();

            return to_route('apps.link-profiles.index')->with('success', 'Link profile berhasil dihapus.');
         } catch(\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Terjadi kesalahan saat menghapus link profile.');
         }
      }
   }
