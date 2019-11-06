<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Order extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);

        return [
            'id' => $this->id,
            'order_name' => $this->order_name,
            'order_price' => $this->order_price,
            'order_status' => $this->order_status,
            'order_date' => $this->order_date
        ];
    }
}
