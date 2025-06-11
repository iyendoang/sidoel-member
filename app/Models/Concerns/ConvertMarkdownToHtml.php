<?php

namespace App\Models\Concerns;

trait ConvertMarkdownToHtml
{
    protected static function bootConvertMarkdownToHtml()
    {
        static::saving(function (self $model) {
            $markdownData = collect(static::getMarkDownToHtmlMap())
                ->flip()
                ->map(fn ($bodyColumn) => str($model->$bodyColumn)->markdown([
                    'html_input' => 'strip',
                    'allow_unsafe_links' => true,
                    'allow_unsafe_protocols' => false,
                    'max_nesting_level' => 5,
                ]));

            return $model->fill($markdownData->all());
        });
    }

    protected static function getMarkDownToHtmlMap(): array
    {
        return [
            'body' => 'html',
        ];
    }
}
