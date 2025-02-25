<?php
function configLua($key) {
    static $config = null;
    
    if ($config === null) {
        $luaFile = __DIR__ . '/config.lua';
        if (!file_exists($luaFile)) {
            return null;
        }
        
        $content = file_get_contents($luaFile);
        $matches = [];
        preg_match_all('/(\w+)\s*=\s*"?([^"\n]+)"?/', $content, $matches);
        
        $config = [];
        foreach ($matches[1] as $index => $name) {
            $config[$name] = trim($matches[2][$index]);
        }
    }
    
    return $config[$key] ?? null;
}

function fieldExist($field, $table) {
    global $db;
    try {
        $query = $db->query("DESCRIBE `$table`");
        $fields = $query->fetchAll(PDO::FETCH_COLUMN);
        return in_array($field, $fields);
    } catch (Exception $e) {
        return false;
    }
}

function encrypt($password) {
    error_log("Senha a ser encriptada: " . $password);
    $hashed = sha1($password);
    error_log("Senha encriptada: " . $hashed);
    return $hashed;
}

/**
 * Send error response
 * @param string $msg
 */
if (!function_exists('sendError')) {
    function sendError($msg) {
        die(json_encode([
            'errorCode' => 3,
            'errorMessage' => $msg
        ]));
    }
}

/**
 * Get vocations list
 * @return array
 */
function getVocations() {
    return [
        0 => 'None',
        1 => 'Sorcerer',
        2 => 'Druid',
        3 => 'Paladin',
        4 => 'Knight'
    ];
}

/**
 * Format character data for client
 * @param array $char
 * @return array
 */
function formatCharacter($char) {
    $vocations = getVocations();
    
    return [
        'worldid' => 0,
        'name' => $char['name'],
        'level' => (int)$char['level'],
        'vocation' => [
            'id' => (int)$char['vocation'],
            'name' => $vocations[$char['vocation']] ?? 'Unknown'
        ],
        'outfit' => [
            'looktype' => (int)$char['looktype'],   
            'lookhead' => (int)$char['lookhead'],    
            'lookbody' => (int)$char['lookbody'], 
            'looklegs' => (int)$char['looklegs'],     
            'lookfeet' => (int)$char['lookfeet'],     
            'lookaddons' => (int)$char['lookaddons']  
        ],
        'lastLogin' => (int)$char['lastlogin'],
        'ismale' => (bool)$char['sex'],
        'tutorial' => false,
        'isMain' => false,
        'world' => 'Seu Mundo'
    ];
}

/**
 * Get world configuration
 * @param array $luaConfig
 * @return array
 */
function getWorldConfig($luaConfig) {
    return [
        'id' => 0,
        'name' => $luaConfig['serverName'] ?? 'Seu Mundo',
        'externaladdress' => $luaConfig['ip'],
        'externaladdressprotected' => $luaConfig['ip'],
        'externaladdressunprotected' => $luaConfig['ip'],
        'externalport' => $luaConfig['gameProtocolPort'],
        'externalportprotected' => $luaConfig['gameProtocolPort'],
        'externalportunprotected' => $luaConfig['gameProtocolPort'],
        'previewstate' => 0,
        'location' => 'BRA',
        'anticheatprotection' => false,
        'pvptype' => array_search($luaConfig['worldType'] ?? 'pvp', ['pvp', 'no-pvp', 'pvp-enforced']) ?? 0,
        'istournamentworld' => false,
        'restrictedstore' => false,
        'currenttournamentphase' => 2
    ];
}

/**
 * Get session data
 * @param array $account
 * @param object $result
 * @return array
 */
function getSessionData($account, $result) {
    return [
        'sessionkey' => "{$result->email}\n{$result->password}",
        'lastlogintime' => 0,
        'ispremium' => $account['premdays'] > 0,
        'premiumuntil' => time() + ($account['premdays'] * 86400),
        'status' => 'active',
        'returnernotification' => false,
        'showrewardnews' => false,
        'isreturner' => true,
        'fpstracking' => false,
        'optiontracking' => false,
        'tournamentticketpurchasestate' => 0,
        'emailcoderequest' => false
    ];
}