<?php

namespace App\Http\Controllers\API;


use App\Http\Controllers\Controller;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense;
use Auth;
use Exception;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

require_once dirname(__DIR__, 4) . '/helper.php';

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $expenses = Expense::whereUserId(auth()->user()->id)->latest()->get();
            if (sizeof([$expenses]))
                return response(sendJson('Expenses retrieved successfully.', $expenses));
            return response(sendJson('Expenses have not been retrieved successfully.'), 404);
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
            $expense = Expense::create($request->validate([
                'user_id' => 'required',
                'name' => 'required',
                'amount' => 'required',
                'category_id' => 'required',
            ]));
            if ($expense)
                return response(sendJson('Expense has been stored successfully.', $expense));
            return response(['msg' => "New expense has been stored. $expense"], 404);
        } catch (Exception $ex) {
            return response(['msg' => "Internal server error, Error: {$ex->getMessage()} "], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function show(Expense $expense)
    {
        try {
            if ($expense)
                return response(sendJson("An expense has been retrieved successfully", $expense));
            return response(sendJson('An expense not been retrieved successfully.'), 404);
        } catch (Exception $ex) {
            return response(sendJson("Internal server error, Error: {$ex->getMessage()} "), 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Expense $expense)
    {
        $request['name'] = $request['name'] ?? $expense->name;
        $request['amount'] = $request['amount'] ?? $expense->amount;
        $request['category_id'] = $request['category_id'] ?? $expense->category_id;
        try {
            $exp =$request->validate([
                'name' => 'required',
                'amount' => 'required',
                'category_id' => 'required'
            ]);
            $expense->update($exp);
            return response(['msg' => "The expense with id: $expense->id has been updated.", 'data' => $exp]);
        } catch (Exception $ex) {
            return response(['msg' => "Internal server error, Error: {$ex->getMessage()} "], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function destroy(Expense $expense)
    {
        try {
            if ($expense->delete())
                return response(['msg' => "User with id: $expense->id has been deleted."]);
            return response(['msg' => "The expense with id: $expense->id has not been deleted."], 404);
        } catch (Exception $ex) {
            return response(['msg' => "Internal server error, Error: {$ex->getMessage()} "], 500);
        }
    }
}
