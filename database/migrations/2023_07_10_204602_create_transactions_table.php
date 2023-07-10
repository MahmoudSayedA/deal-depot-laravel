<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seller_id')->nullable()->constrained('users', 'id')->nullOnDelete();
            $table->foreignId('buyer_id')->nullable()->constrained('users', 'id')->nullOnDelete();
            $table->foreignId('deal_id')->nullable()->constrained('deals', 'id')->nullOnDelete();
            $table->string('payment_method');
            $table->date('purchasing_date');
            $table->time('purchasing_time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
