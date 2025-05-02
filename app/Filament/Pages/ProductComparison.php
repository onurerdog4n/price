<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;

class ProductComparison extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static string $view = 'filament.pages.product-comparison';
    protected static ?string $title = 'Ürün Karşılaştırma';
    protected static ?int $navigationSort = 1;
    
    public function mount(): void
    {
        // You can add initialization logic here if needed
    }
}
