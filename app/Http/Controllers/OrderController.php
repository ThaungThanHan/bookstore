<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class OrderController extends Controller
{
    public function submitorder(Request $request){
        $order = new Order;
        $cart = Session::get('cart');
        $coupon = Session::get('coupon');
        if($coupon){
        $coupondiscount = $coupon['discount'];
        $grandtotal = $cart->TotalPrice - $coupondiscount;
        $order->grand_total = $grandtotal;
        }else{
            $order->grand_total = $cart->TotalPrice;
        }
        $fields =$request->validate([
            'full_name' => 'required',
            'email' => 'required',
            'address' => 'required',
            'city' => 'required',
            'phone' => 'required',
            'state' => 'required',
        ]);
        $order->full_name = $fields['full_name'];
        $order->email = $fields['email'];
        $order->address = $fields['address'];
        $order->city = $fields['city'];
        $order->state = $fields['state'];
        $order->phone = $fields['phone'];
        $order->order = json_encode($cart->items);  // jsonify session 'cart'
        $order->save();
        $request->session()->forget('cart');
        $request->session()->forget('coupon');
    }
}
