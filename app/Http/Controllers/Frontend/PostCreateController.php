<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostCreateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate(rules:[
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);
        $data['slug'] = Str::slug($data['title']);
        auth()->user()->posts()->create($data);
        return response()->json( [
            'status' => 'success',
            'message' => 'Post created successfully',
        ],201);
    }

}
