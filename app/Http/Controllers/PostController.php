<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = auth()->user()->posts()->orderBy('created_at', 'desc')
        ->paginate(5);

        return PostResource::collection($posts);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate(rules:[
           'title' => 'required|string|max:255',
           'body' => 'required|string',
        ]);
        $data['slug'] = Str::slug($data['title']);
        auth()->user()->posts()->create(attributes: $request->all());
        return response()->json([
               'status' => 'success',
               'message' => 'Post created successfully',
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug): PostResource
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $slug): PostResource
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        $data = $request->validate([
              'title' => 'required|string|max:255|min:1',
              'body' => 'required|string|min:1',
        ]);
        $data['slug'] = Str::slug($data['title']);
        $post->update($data);
        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($slug): \Illuminate\Http\JsonResponse
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        $post->delete();
        return response()->json(null, 204);
    }
}
