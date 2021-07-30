<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\CategoriesTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(BooksTableSeeder::class);
        $this->call(CouponsTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
    }
}
