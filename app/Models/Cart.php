<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    public $items;
    public $TotalQty = 0;
    public $TotalPrice = 0;

    public function __construct($oldCart){
        if($oldCart){
            $this->items = $oldCart->items;
            $this->TotalQty = $oldCart->TotalQty;
            $this->TotalPrice = $oldCart->TotalPrice;
        }
    }

    public function add($item, $id){
        $StoredItem = ['qty'=> 0,'price'=>$item->price,'item'=>$item];
        if($this->items){
            if(array_key_exists($id, $this->items)){
                $StoredItem = $this->items[$id];
            }
        }
        $StoredItem['qty']++;
        $StoredItem['price'] = $item->price * $StoredItem['qty']; 
        $this->items[$id] = $StoredItem;
        $this->TotalQty++;
        $this->TotalPrice += $item->price;
    }
    public function remove($item,$id){
        $StoredItem = ['qty'=> $item->qty,'price'=>$item->price,'item'=>$item];
        if($this->items){
            if(array_key_exists($id, $this->items)){
                $StoredItem = $this->items[$id];
            }
        }
        $StoredItem['qty']--;
        $StoredItem['price'] = $item->price * $StoredItem['qty']; 
        $this->items[$id] = $StoredItem;
        $this->TotalQty--;
        $this->TotalPrice -= $item->price;
    }
}
