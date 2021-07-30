<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Cart;
use App\Http\Requests;
use App\Models\Category;
use Illuminate\Http\Request;
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
        $maincate = Category::all();
        // $genres = Category::find(2)->books()->where('category_id',2)->get();
        return response()->json([$books,$maincate]);   
    }

    public function categorize($cateid)
    {
        $categorized = Book::where('category_id',$cateid)->get();
        return response()->json($categorized);
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
        if(Session::has('coupon')){
            $coupon = Session::get('coupon');
        }else{
            $coupon = null;
        }
        return response()->json([$books,$TotalPrice,$coupon]);   
    }
    public function removeAllItems(Request $request){
        $request->session()->flush();
    }
    public function removeItem(Request $request, $id){
        $book = Book::find($id);
        $oldCart = Session::has('cart') ? Session::get('cart') : null;
        $cart = new Cart($oldCart);
        $cart->decrementTotalPrice($book,$book->id);
        $request->session()->put('cart',$cart); // has to put after a function action.

        $cartsession = Session::get('cart');    // this is another session function for unsetting session item.
        unset($cartsession->items[$id]);
    }
}
