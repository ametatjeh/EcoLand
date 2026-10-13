<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppSetting extends Model
{
    protected $table = 'app_settings';
    protected $primaryKey = 'key';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'key',
        'value',
        'group',
        'label',
        'type',
    ];

    public static function getVal(string $key, $default = null)
    {
        $setting = static::find($key);
        return $setting ? $setting->value : $default;
    }

    public static function setVal(string $key, $value, string $group = 'general', ?string $label = null, string $type = 'text')
    {
        return static::updateOrCreate(
            ['key' => $key],
            [
                'value' => (string) $value,
                'group' => $group,
                'label' => $label ?? $key,
                'type' => $type,
            ]
        );
    }
}
