<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\LocationsRepositoryInterface;
use App\Repository\LocationsReposiotry;
class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(LocationsRepositoryInterface::class,LocationsReposiotry::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}