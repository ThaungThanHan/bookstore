<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();   
            $table->string('title')->unique();
            $table->string('author');
            $table->string('edition');
            $table->string('category');
            $table->integer('price');
            $table->longtext('description');
            $table->tinyInteger('rating');
            $table->integer('printlength');
            $table->string('language');
            $table->string('publisher');
            $table->string('dimensions');
            $table->string('isbn10');
            $table->string('isbn13');
            $table->string('frontimage');
            $table->string('backimage');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
