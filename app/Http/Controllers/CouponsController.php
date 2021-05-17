<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CouponsController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $coupon = Coupon::where('code',$request->coupon_code)->first();
        $coupon = Coupon::where('code',$request->coupon_code)->first();
        $cart = Session::get('cart');
        session()->put('coupon',[
            'name'=>$coupon->code,
            'discount' => $coupon->discount($cart->TotalPrice),
        ]);
    }
    public function destroy(Request $request)
    {
        $request->session()->forget('coupon');
    }
}
