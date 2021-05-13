<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Cart;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Session;



class ShopBooksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $books = Book::all();
        return response()->json($books);   
    }

    public function show($id)
    {
        $books = Book::where('id',$id)->get();
        return response()->json($books);   
    }
    public function getAddToCart(Request $request, $id){
        $book = Book::find($id);
        $oldCart = Session::has('cart') ? Session::get('cart') : null;
        $cart = new Cart($oldCart);
        $cart->add($book, $book->id);
        $request->session()->put('cart',$cart);
    }
    public function getRemoveFromCart(Request $request, $id){
        $book = Book::find($id);
        $oldCart = Session::has('cart') ? Session::get('cart') : null;
        $cart = new Cart($oldCart);
        $cart->remove($book, $book->id);
        $request->session()->put('cart',$cart);
    }
    public function getCart(){
        if(!Session::has('cart')){
            $books = [];
            return response()->json($books);
        }
        $oldCart = Session::get('cart');
        $cart = new Cart($oldCart);
        $books = $cart->items;
        $TotalPrice = $cart->TotalPrice;
        return response()->json([$books,$TotalPrice]);   
    }
    public function removeAllItems(Request $request, $id){
        $cart = $request->session()->pull('cart',[]);
        $request->session()->forget($cart);
    }
    public function removeItem($id){
        $cart = Session::get('cart');
        unset($cart->items[$id]);
        Session::put('cart',$cart);
    }
}
