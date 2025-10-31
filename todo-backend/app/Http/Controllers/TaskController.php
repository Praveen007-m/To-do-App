<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Return tasks belonging to authenticated user
    public function index(Request $request)
    {
        $user = $request->user();
        return response()->json($user->tasks()->orderBy('id', 'desc')->get());
    }

    public function store(Request $request)
    {
        $request->validate(['title' => 'required|string|max:255']);

        $task = Task::create([
            'title' => $request->title,
            'completed' => $request->filled('completed') ? (bool)$request->completed : false,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $task = Task::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();

        if ($request->has('title')) {
            $task->title = $request->title;
        }

        if ($request->has('completed')) {
            $task->completed = (bool)$request->completed;
        }

        $task->save();

        return response()->json($task);
    }

    public function destroy(Request $request, $id)
    {
        $task = Task::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $task->delete();

        return response()->json(null, 204);
    }
}
