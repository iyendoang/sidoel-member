<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Requests\Apps\RoleRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller implements HasMiddleware
{
    /**
     * Define middleware for the RoleController.
     */
    public static function middleware()
    {
        return [
            new Middleware('permission:roles-data', only: ['index']),
            new Middleware('permission:roles-create', only: ['create', 'store']),
            new Middleware('permission:roles-update', only: ['edit', 'update']),
            new Middleware('permission:roles-destroy', only: ['destroy']),
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

        // get list data role
        $roles = Role::query()
            ->select('id', 'name')
            ->with('permissions')
            ->when($request->search, fn($search) => $search->where('name', 'like', '%' . $request->search . '%'))
            ->latest()
            ->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

        // render view
        return inertia('apps/roles/index', [
            'roles' => $roles,
            'currentPage' => $currentPage,
            'perPage' => $perPage,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // get all permission data
        $permissions = Permission::query()->select('id', 'name')->get();

        // render view
        return inertia('apps/roles/create', ['permissions' => $permissions]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        // get all permission data
        $permissions = Permission::query()->select('id', 'name')->get();

        // load relationship
        $role->load('permissions');

        // render view
        return inertia('apps/roles/edit', [
            'role' => $role,
            'permissions' => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request)
    {
        // create new roles
        $role = Role::create(['name' => $request->name]);

        // assign permssion to roles
        $role->givePermissionTo($request->selectedPermissions);

        // render view
        return to_route('apps.roles.index')->with('success', 'Berhasil menambahkan role.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleRequest $request, Role $role)
    {
        // update role by id
        $role->update(['name' => $request->name]);

        // sycn permission roles
        $role->syncPermissions($request->selectedPermissions);

        // render view
        return to_route('apps.roles.index')->with('success', 'Berhasil mengubah role.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        // delete role by id
        $role->delete();

        // render view
        return back()->with('success', 'Berhasil menghapus role.');
    }
}
