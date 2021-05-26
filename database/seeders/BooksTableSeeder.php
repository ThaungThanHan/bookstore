<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class BooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Book::create([
            'title' => 'Naruto The Great Hokage',
            'author' => 'Jiraiya',
            'edition' => '1st edition',
            'genre' => 'Adventure',
            'price' => 12.22,
            'description' => 'bla bla',
            'rating' => 4,
            'printlength' => '230',
            'language' => 'English',
            'publisher' => 'Konoha Pencil',
            'dimensions' => '23',
            'isbn10' => '42423223',
            'isbn13' => '42423223',
            'frontimage' => 'ninjafront.jpg',
            'backimage' => 'ninjaback.jpg'
        ]);

        Book::create([
            'title' => 'Sausuke The Great Hokage',
            'author' => 'Orochimaru',
            'edition' => '2nd edition',
            'genre' => 'Adventure',
            'price' => 12.22,
            'description' => 'bla bla',
            'rating' => 4,
            'printlength' => '230',
            'language' => 'English',
            'publisher' => 'Konoha Pencil',
            'dimensions' => '23',
            'isbn10' => '42423223',
            'isbn13' => '42423223',
            'frontimage' => 'ninjafront.jpg',
            'backimage' => 'ninjaback.jpg'
        ]);

        Book::create([
            'title' => 'Rock lee The Great Hokage',
            'author' => 'Guy',
            'edition' => '2nd edition',
            'genre' => 'Adventure',
            'price' => 12.22,
            'description' => 'bla bla',
            'rating' => 4,
            'printlength' => '230',
            'language' => 'English',
            'publisher' => 'Konoha Pencil',
            'dimensions' => '23',
            'isbn10' => '42423223',
            'isbn13' => '42423223',
            'frontimage' => 'ninjafront.jpg',
            'backimage' => 'ninjaback.jpg'
        ]);

        Book::create([
            'title' => 'Sakura The Great Hokage',
            'author' => 'Tsunade',
            'edition' => '2nd edition',
            'genre' => 'Adventure',
            'price' => 12.22,
            'description' => 'bla bla',
            'rating' => 4,
            'printlength' => '230',
            'language' => 'English',
            'publisher' => 'Konoha Pencil',
            'dimensions' => '23',
            'isbn10' => '42423223',
            'isbn13' => '42423223',
            'frontimage' => 'ninjafront.jpg',
            'backimage' => 'ninjaback.jpg'
        ]);
    }
}
