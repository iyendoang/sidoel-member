<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Requests\Apps\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Spatie\Permission\Models\Role;

class UserController extends Controller implements HasMiddleware
{
        /**
     * Define middleware for the RoleController.
     */
    public static function middleware()
    {
        return [
            new Middleware('permission:users-data', only: ['index']),
            new Middleware('permission:users-create', only: ['create', 'store']),
            new Middleware('permission:users-update', only: ['edit', 'update']),
            new Middleware('permission:users-destroy', only: ['destroy']),
            new Middleware('permission:users-show', only: ['show']),
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

        // get list data user
        $users = User::query()
            ->select('id', 'name', 'username', 'email', 'is_active')
            ->with('roles')
            ->when($request->search, fn($search) => $search->whereAny(['name', 'username', 'email'], 'like', '%' . $request->search . '%'))
            ->latest()
            ->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

        // render view
        return inertia('apps/users/index', [
            'users' => $users,
            'currentPage' => $currentPage,
            'perPage' => $perPage,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // get all roles data
        $roles = Role::with('permissions')->where('name', '!=', 'super-admin')->orderBy('name')->get();

        // render view
        return inertia('apps/users/create', [
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        // create new user data
        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'is_active' => true,
            'password' => bcrypt($request->password),
        ]);

        // assign role to user
        $user->assignRole($request->selectedRoles);

        // render view
        return to_route('apps.users.index')->with('success', 'Berhasil menambahkan user.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // load relation
        $user->load('roles', 'roles.permissions');

        // render view
        return inertia('apps/users/show', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        // get all role data
        $roles = Role::query()
            ->with('permissions')
            ->select('id', 'name')
            ->where('name', '!=', 'super-admin')
            ->get();

        // load relationship
        $user->load(['roles' => fn($query) => $query->select('id', 'name'), 'roles.permissions' => fn($query) => $query->select('id', 'name')]);

        // render view
        return inertia('apps/users/edit', [
            'roles' => $roles,
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        // check if user send request password
        if($request->password)
            // update user data password
            $user->update([
                'password' => bcrypt($request->password),
            ]);

        // update user data name
        $user->update([
            'username' => $request->username,
            'email' => $request->email,
            'name' => $request->name,
        ]);

        // assign role to user
        $user->syncRoles($request->selectedRoles);

        // render view
        return to_route('apps.users.index')->with('success', 'Berhasil mengubah pengguna.');
    }

    public function status(User $user)
    {
        // check status user
        $user->is_active == 1
            ? $user->update(['is_active' => 0])
            : $user->update(['is_active' => 1]);

        // render view
        return back()->with('success', 'Berhasil mengubah status pengguna.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // delete user by id
        $user->delete();

        // render view
        return back()->with('success', 'Berhasil menghapus pengguna.');
    }

}
