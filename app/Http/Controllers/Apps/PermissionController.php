<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Requests\Apps\PermissionRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller implements HasMiddleware
{
    /**
     * Define middleware for the PermissionController.
     */
    public static function middleware()
    {
        return [
            new Middleware('permission:permissions-data', only: ['index']),
            new Middleware('permission:permissions-create', only: ['store']),
            new Middleware('permission:permissions-update', only: ['update']),
            new Middleware('permission:permissions-destroy', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // request page data
        $currentPage = $request->input('page', 1);
        $perPage = $request->input('per_page', 10);

        // get list data permssions
        $permissions = Permission::query()
            ->select('id', 'name')
            ->when($request->search, fn($search) => $search->where('name', 'like', '%' . $request->search . '%'))
            ->latest()
            ->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

        // render view
        return inertia('apps/permissions/index', [
            'permissions' => $permissions,
            'currentPage' => $currentPage,
            'perPage' => $perPage,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PermissionRequest $request)
    {
        // create new permissions
        Permission::create(['name' => $request->name]);

        // render view
        return to_route('apps.permissions.index')->with('success', 'Berhasil menambahkan permission.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PermissionRequest $request, Permission $permission)
    {
        // update permission by id
        $permission->update(['name' => $request->name]);

        // render view
        return to_route('apps.permissions.index')->with('success', 'Berhasil mengubah permission.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        // delete permission by id
        $permission->delete();

        // render view
        return to_route('apps.permissions.index')->with('success', 'Berhasil menghapus permission.');
    }
}
