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
        $decodedrequest = json_decode($request->admininput);    // jsonify string formdata back.
        $requestall = $request->all();
        $books = new Book;
        $books->title = $decodedrequest->title;
        $books->edition = $decodedrequest->edition;
        $books->author = $decodedrequest->author;
        $books->category_id = $decodedrequest->genre;
        $books->price = $decodedrequest->price;
        $books->description = $decodedrequest->description;
        $books->rating = $decodedrequest->rating;
        $books->printlength = $decodedrequest->printlength;
        $books->language = $decodedrequest->language;
        $books->publisher = $decodedrequest->publisher;
        $books->dimensions = $decodedrequest->dimensions;
        $books->isbn10 = $decodedrequest->isbn10;
        $books->isbn13 = $decodedrequest->isbn13;

        $imageNameFront = date('YmdHis')."front".".".request()->frontimage->getClientOriginalExtension();   // get image name from file
        request()->frontimage->move(public_path('images'),$imageNameFront);    // move the file
        $books->frontimage = $imageNameFront;   // save the image name into database

        $imageNameBack = date('YmdHis')."back".".".request()->backimage->getClientOriginalExtension();   // get image name from file
        request()->backimage->move(public_path('images'),$imageNameBack);    // move the file
        $books->backimage = $imageNameBack;   // save the image name into database

        $books->save();
        return response()->json($requestall);
    }
}
