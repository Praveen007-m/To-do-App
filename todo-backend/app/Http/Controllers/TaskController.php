<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::all();
    }

    public function store(Request $request)
    {
        $task = Task::create([
            'title' => $request->title,
        ]);

        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        if ($request->has('title')) {
            $task->title = $request->input('title');
        }

        if ($request->has('completed')) {
          $task->completed = $request->input('completed');
        }

        $task->save();

        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}
