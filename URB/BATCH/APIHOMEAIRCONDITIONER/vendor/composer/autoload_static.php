<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit5ca98f70263f62b2f73d8916a9f68c4a
{
    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'WebSocket\\' => 10,
        ),
        'P' => 
        array (
            'Psr\\Log\\' => 8,
            'Psr\\Http\\Message\\' => 17,
            'Phrity\\Util\\' => 12,
            'Phrity\\Net\\' => 11,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'WebSocket\\' => 
        array (
            0 => __DIR__ . '/..' . '/textalk/websocket/lib',
        ),
        'Psr\\Log\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/log/Psr/Log',
        ),
        'Psr\\Http\\Message\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/http-factory/src',
            1 => __DIR__ . '/..' . '/psr/http-message/src',
        ),
        'Phrity\\Util\\' => 
        array (
            0 => __DIR__ . '/..' . '/phrity/util-errorhandler/src',
        ),
        'Phrity\\Net\\' => 
        array (
            0 => __DIR__ . '/..' . '/phrity/net-uri/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit5ca98f70263f62b2f73d8916a9f68c4a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit5ca98f70263f62b2f73d8916a9f68c4a::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
