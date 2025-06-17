<?php

   namespace App\Http\Controllers\Apps;

   use App\Http\Controllers\Controller;
   use App\Http\Requests\Apps\LinkRequest;
   use App\Http\Resources\Apps\LinkResource;
   use App\Models\Lembaga;
   use App\Models\Link;
   use App\Models\LinkProfile;
   use Illuminate\Database\Eloquent\ModelNotFoundException;
   use Illuminate\Http\Request;
   use Illuminate\Support\Facades\Auth;

   class LinkController extends Controller
   {
      public function index() {}

      public function store(LinkRequest $request) {
         $validated = $request->validated();
         try {
            // Cari LinkProfile berdasarkan ID
            $link_profile = LinkProfile::findOrFail($validated['link_profile_id']);
            // Pastikan Lembaga yang sesuai dengan link_profile
            $lembaga = Lembaga::where('npsn', $link_profile->link_profile_npsn)->firstOrFail();
         } catch(ModelNotFoundException $e) {
            return redirect()
               ->back()->withErrors(['data' => 'Data Link Profile atau Lembaga tidak ditemukan'])->withInput();
         }
         $lembaga->links()->create([
            'link_npsn'       => $link_profile->link_profile_npsn, // ← isi otomatis dari model
            'link_profile_id' => $link_profile->id,
            'title'           => $validated['title'],
            'url'             => $validated['url'],
            'icon'            => $validated['icon'] ?? NULL,
            'is_active'       => $validated['is_active'],
            'is_safemode'     => $validated['is_safemode'],
            'order'           => $validated['order'] ?? 0,
            'bg_color'        => $validated['bg_color'] ?? NULL,
         ]);

         return to_route('apps.links.show-by-id', ['id' => $link_profile->id])->with('success', 'Link berhasil ditambahkan.');
      }

      public function update(LinkRequest $request, $id) {
         $validated = $request->validated();
         try {
            $link         = Link::findOrFail($id);
            $link_profile = LinkProfile::findOrFail($validated['link_profile_id']);
            $lembaga      = Lembaga::where('npsn', $link_profile->link_profile_npsn)->firstOrFail();
         } catch(ModelNotFoundException $e) {
            return redirect()
               ->back()->withErrors(['data' => 'Data Link, Link Profile, atau Lembaga tidak ditemukan'])->withInput();
         }
         $link->update([
            'link_npsn'       => $link_profile->link_profile_npsn, // isi dari relasi, bukan input
            'link_profile_id' => $link_profile->id,
            'title'           => $validated['title'],
            'url'             => $validated['url'],
            'icon'            => $validated['icon'] ?? NULL,
            'is_active'       => $validated['is_active'],
            'is_safemode'     => $validated['is_safemode'],
            'order'           => $validated['order'] ?? 0,
            'bg_color'        => $validated['bg_color'] ?? NULL,
         ]);

         return to_route('apps.links.show-by-id', ['id' => $link_profile->id])->with('success', 'Link berhasil diperbarui.');
      }

      public function destroy(Request $request, $id) {
         try {
            $link            = Link::findOrFail($id);
            $link_profile_id = $link->link_profile_id;
            if(!$link){
               return redirect()->back()->with('error', 'Link berhasil dihapus.');
            }
            $link->delete();

            return to_route('apps.links.show-by-id', ['id' => $link_profile_id])->with('success', 'Link berhasil dihapus.');
         } catch(ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Link berhasil dihapus.');
         }
      }

      public function showById(Request $request, $id) {
         $user        = Auth::user()->load('userLembaga');
         $linkProfile = LinkProfile::with('lembaga')->findOrFail($id);
         $perPage     = $request->input('per_page', 10);
         $currentPage = $request->input('page', 1);
         // Ganti query, ambil link berdasarkan link_profile_id langsung
         $query = Link::with('lembaga')->where('link_profile_id', $linkProfile->id);
         if($user->hasRole('super-admin')){
            if($request->filled('search')){
               $search = $request->search;
               $query->where(function($q) use ($search) {
                  $q
                     ->where('title', 'like', "%$search%")->orWhere('url', 'like', "%$search%");
               });
            }
         }
         else if($user->hasRole('member')){
            $userLembaga = $user->userLembaga;
            if($userLembaga && $userLembaga->user_npsn === $linkProfile->link_profile_npsn){
               if($request->filled('search')){
                  $search = $request->search;
                  $query->where(function($q) use ($search) {
                     $q
                        ->where('title', 'like', "%$search%")->orWhere('url', 'like', "%$search%");
                  });
               }
            }
            else {
               // Jika user member tapi bukan milik linkProfile ini, kunci hasil
               $query->whereRaw('0=1');
            }
         }
         else {
            $query->whereRaw('0=1');
         }
         $links = $query->latest()->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();
         // Ambil lembaga berdasarkan link_profile_id, langsung lewat relasi kalau ada
         $lembagas = $linkProfile->lembaga()->get();

         return inertia('apps/links/index', [
            'linkProfile' => $linkProfile,
            'links'       => LinkResource::collection($links)->response()->getData(true),
            'lembagas'    => $lembagas,
            'currentPage' => $currentPage,
            'perPage'     => $perPage,
         ]);
      }
   }
