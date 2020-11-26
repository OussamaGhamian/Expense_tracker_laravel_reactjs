<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

require_once dirname(__DIR__, 4) . '/helper.php';

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            // return only specific user categories
            $categories = Category::whereUserId(auth()->user()->id)->latest()->get();
            if (sizeof($categories))
                return response(sendJson('Categories retrieved successfully.', $categories));
            return response(sendJson('Categories have not been retrieved successfully.'), 404);
        } catch (Exception $ex) {
            return response(sendJson("Internal server error, Error: {$ex->getMessage()} "), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $request['user_id'] = auth()->id();
            $category = Category::create($request->validate([
                "title" => 'required',
                "user_id" => 'required',
            ]));
            if ($category)
                return response(sendJson('Category has been stored successfully.', $category));
            return response(sendJson('Categories has not been stored successfully.'), 404);
        } catch (Exception $ex) {
            return response(sendJson("Internal server error, Error: {$ex->getMessage()} "), 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Controller  $controller
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        try {
            if ($category)
                return response(sendJson("An category has been retrieved successfully", $category));
            return response(sendJson('An category not been retrieved successfully.'), 404);
        } catch (Exception $ex) {
            return response(sendJson("Internal server error, Error: {$ex->getMessage()} "), 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Controller  $controller
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $request['title'] = $request['title'] ?? $category->title;

        try {
            $cat = $request->validate([
                "title" => 'required',
            ]);
            $category = $category->update($cat);
            if ($category)
                return response(["msg" => 'Category has been updated successfully.', "data" => $cat]);
            return response(sendJson('Categories has not been updated successfully.'), 404);
        } catch (Exception $ex) {
            return response(sendJson("Internal server error, Error: {$ex->getMessage()}"), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Controller  $controller
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        try {
            if ($category->delete())
                return response(['msg' => "category with id: $category->id has been deleted."]);
            return response(['msg' => "The category with id: $category->id has not been deleted."], 404);
        } catch (Exception $ex) {
            return response(['msg' => "Internal server error, Error: {$ex->getMessage()} "], 500);
        }
    }
}
