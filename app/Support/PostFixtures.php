<?php

   namespace App\Support;

   use Illuminate\Support\Collection;
   use Illuminate\Support\Facades\File;
   use Symfony\Component\Finder\SplFileInfo;

   class PostFixtures
   {
      private static Collection $fixtures;

      public static function getFixtures(): Collection {
         return once(fn()
            => collect(File::files(database_path('factories/fixtures/posts')))
            ->map(fn(SplFileInfo $fileInfo) => $fileInfo->getContents())
            ->map(fn(string $contents) => str($contents)->explode("\n", 2))
            ->map(fn(Collection $parts)
               => [
               'title' => str($parts->first())->trim()->after('# '),
               'body'  => str($parts->last())->trim(),
            ]));
      }
   }
