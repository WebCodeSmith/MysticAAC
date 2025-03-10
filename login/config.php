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

function getLuaConfig($configPath = 'path to config.lua') {
    if (!file_exists($configPath)) {
        error_log("Config file not found: " . $configPath);
        return false;
    }

    $content = file_get_contents($configPath);
    $config = [];
    
    // Parse basic Lua configurations
    preg_match('/serverName\s*=\s*"([^"]+)"/', $content, $matches);
    if (!isset($matches[1])) {
        throw new Exception('Unable to read serverName from config.lua');
    }
    $config['serverName'] = $matches[1];
    
    preg_match('/ip\s*=\s*"([^"]+)"/', $content, $matches);
    if (!isset($matches[1])) {
        throw new Exception('Unable to read IP from config.lua');
    }
    $config['ip'] = $matches[1];
    
    preg_match('/gameProtocolPort\s*=\s*(\d+)/', $content, $matches);
    if (!isset($matches[1])) {
        throw new Exception('Unable to read gameProtocolPort from config.lua');
    }
    $config['gameProtocolPort'] = intval($matches[1]);
    
    preg_match('/worldType\s*=\s*"([^"]+)"/', $content, $matches);
    $config['worldType'] = $matches[1] ?? 'pvp';

    return $config;
}