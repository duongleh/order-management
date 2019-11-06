<?php

use Faker\Generator as Faker;

$factory->define(App\Order::class, function (Faker $faker) {
    return [
        'order_name' => $faker->text(40),
        'order_price' => $faker->numberBetween(40000,50000),
        'order_status' => $faker->text(15),
        'order_date' => $faker->dateTime()
    ];
});
