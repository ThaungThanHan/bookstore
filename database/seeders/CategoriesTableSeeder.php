<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'name' => 'Fantasy'
        ]);
        Category::create([
            'name' => 'Adventure'
        ]);
        Category::create([
            'name' => 'Romance'
        ]);
        Category::create([
            'name' => 'Mystery'
        ]);
        Category::create([
            'name' => 'Horror'
        ]);
        Category::create([
            'name' => 'Romance'
        ]);
        Category::create([
            'name' => 'Science Fiction'
        ]);
        Category::create([
            'name' => 'Self Help'
        ]);
    }
}
