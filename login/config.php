<?php
$config = [];

$db = getDB();

$config['vocations'] = [
    0 => 'None',
    1 => 'Sorcerer',
    2 => 'Druid',
    3 => 'Paladin',
    4 => 'Knight'
];

function getDB() {
    global $db;
    if (!isset($db)) {
        try {
            $db = new PDO('mysql:host=localhost;dbname=DATABASE_NAME', 'root', 'PASSWORD');
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            die('Erro de conexão: ' . $e->getMessage());
        }
    }
    return $db;
}

function getLuaConfig($configPath = 'CAMINHO_PRO_SEU_CONFIG.LUA') {
    if (!file_exists($configPath)) {
        error_log("Config file not found: " . $configPath);
        return false;
    }

    $content = file_get_contents($configPath);
    $config = [];
    
    // Parse basic Lua configurations
    preg_match('/serverName\s*=\s*"([^"]+)"/', $content, $matches);
    $config['serverName'] = $matches[1] ?? 'Seu Mundo';
    
    preg_match('/ip\s*=\s*"([^"]+)"/', $content, $matches);
    $config['ip'] = $matches[1] ?? '127.0.0.1';
    
    preg_match('/gameProtocolPort\s*=\s*(\d+)/', $content, $matches);
    $config['gameProtocolPort'] = intval($matches[1] ?? 7172);
    
    preg_match('/worldType\s*=\s*"([^"]+)"/', $content, $matches);
    $config['worldType'] = $matches[1] ?? 'pvp';

    return $config;
}