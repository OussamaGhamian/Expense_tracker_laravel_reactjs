<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:55',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed',
        ]);
        $validatedData['password'] = bcrypt($request->password);
        if ($request->image) {
            $imageName = time() . '.' . $request->image->extension();
            // $request->image->siz
            $request->image->move(public_path('images'), $imageName);
            $validatedData['image'] = "images/$imageName";
        }else{
            $validatedData['image'] = "images/avatar.png";
        }
        $user = User::create($validatedData);
        $accessToken = $user->createToken('authToken')->accessToken;
        return ['user' => $user, 'access_token' => $accessToken];
    }

    public function login(Request $request)
    {
        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required',
        ]);
        if (!auth()->attempt($loginData)) {
            return response(['msg' => 'Invalid credentials, sorry!']);
        }
        $accessToken = auth()->user()->createToken('authToken')->accessToken;
        return response(['user' => auth()->user(), 'access_token' => $accessToken]);
    }
}
