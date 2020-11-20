<?php

namespace App\Http\Controllers\API;

require_once dirname(__DIR__) . 'helper.php';

use App\Http\Controllers\Controller;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense;
use Auth;
use Exception;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

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
            $expenses = Expense::all();
            if (!isEmpty($expenses) && isset($expenses))
                return response(sendJson('Expenses retrieved successfully.', $expenses));
            return response(sendJson('Expenses has not been retrieved successfully.'), 404);
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
            $request['user_id'] = Auth()->id();
            $expense = Expense::create($request->validate([
                'name' => 'required',
                'amount' => 'required',
                'user_id' => 'required',
            ]));
            return response(['msg' => "New expense has been added. $expense"], 404);
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
        try {
            $expense['user_id'] = auth()->id();
            $expense->update($request->validate([
                'name' => 'required',
                'amount' => 'required',
                'user_id' => 'required',
            ]));
            return response(['msg' => "The expense with id: $expense->id has been updated."], 404);
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
