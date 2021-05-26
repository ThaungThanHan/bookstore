<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BooksController extends Controller
{
    public function index(){
        $books = Book::all();
        return response()->json($books);
    }
    public function create(Request $request){
        $books = new Book;
        $books->title = $request->title;
        $books->edition = $request->edition;
        $books->author = $request->author;
        $books->genre = $request->genre;
        $books->genre2 = $request->genre2;
        $books->genre3 = $request->genre3;
        $books->price = $request->price;
        $books->description = $request->description;
        $books->rating = $request->rating;
        $books->printlength = $request->printlength;
        $books->language = $request->language;
        $books->publisher = $request->publisher;
        $books->dimensions = $request->dimensions;
        $books->isbn10 = $request->isbn10;
        $books->isbn13 = $request->isbn13;
        $books->save();
    }
}
